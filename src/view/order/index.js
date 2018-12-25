import React, { Component } from 'react'
import { Form, Select, Card, Button, Table, message, Modal} from 'antd';
import { DatePicker} from 'antd';
import "./index.less"
import axios from "../../utils/index"
const {RangePicker} = DatePicker;
const FormItem = Form.Item;

const Option = Select.Option;
class Order extends Component {
    cityOptions = [
        {
            label:"北京",
            index:"001"
        },
        {
            label: "上海",
            index: "002"
        },
        {
            label: "商丘",
            index: "003"
        },
    ]
    orderStatus = [{
            label: "进行中",
            id: "01"
        },
        {
            label: "已完成",
            id: "02"
        },
        {
            label: "结束行程",
            id: "03"
        },
    ]
    //获取表单数据
    handleSearch= ()=> {
        console.log(this.props.form.getFieldsValue())
        const status = this.props.form.getFieldsValue()
        Modal.info({
            title: '查询城市订单详情',
            content: (
            <div>
                <p>城市{status.city}</p>
                {/* <p>{status.times}</p> */}
                <p>订单状态：{status.status}</p>
            </div>
            ),
            onOk() {},
    });
    }
    //清空表单数据
    resetData =()=>{
        this.props.form.resetFields()
    }
    state = {
        dataSource: [],
        pageSize:"",
        total:"",
        endItem:{},
        isShowModal:false,
        loading: {
            spinning: true,
            tip: '数据正在拼命加载中',
            size: 'large'
        },
    }
    params = {
        pn:1
    }
    //获取表格数据
    getData=()=>{
        this.setState({
            loading: {
                ...this.state.loading,
                spinning: true
            }
        })
        axios.get('/order/list',this.params).then(res=>{
        if (res.code === "0") {
            this.setState({
                dataSource: res.result.item_list.map((item,index)=>{
                    item.key=index
                    return item
                }),
                total: res.result.total_count,
                loading: {
                    ...this.state.loading,
                    spinning: false
                }
            })
        }
    })
        
    }
    //订单详情
    handleDone =()=>{
        let selectedItem = this.state.selectedItem
        // console.log(selectedItem)       
        if (selectedItem){
            axios.get("/order/ebike_info", { id: selectedItem[0].id}).then(res=>{
                // console.log(res)
                this.setState({
                    isShowModal:true,
                    endItem : res.result,
                })
            })
        }else{
            message.info("请选择一项订单进行操作")
        }
    }
    //用户点结束订单并点击确定时
    handleEnd = () => {      
        let id = this.state.selectedItem[0].id
        axios.get('/order/finish_order',{id}).then(res=>{
            if (res.code === "0") {
                this.getData()
                message.success("删除订单成功")
                this.setState({
                    isShowModal:false
                })
            }
        })
    }
    //订单详情跳转
    handleDetail=()=>{
        let item = this.state.selectedItem
        if (item) {
            window.open(`/#/admin/order/detail/${item[0].id}`, '_blank')
        }else{
            message.info("请选择一件订单进行查看")
        }
    }
    componentWillMount() {
        this.getData()
    }
    render () {
        const { getFieldDecorator} = this.props.form;
        const columns = [
            {
                title: '订单编号',
                dataIndex: 'order_sn',
                key: 'order_sn'
            }, {
                title: '车辆编号',
                dataIndex: 'bike_sn',
                key: 'bike_sn'
            }, {
                title: '用户名',
                dataIndex: 'user_name',
                key: 'user_name'
            }, {
                title: '手机号',
                dataIndex: 'mobile',
                key: 'mobile'
            }, {
                title: '里程',
                dataIndex: 'distance',
                render(distance) {
                    return distance / 1000 + 'Km';
                },
                key: 'distance'
            }, {
                title: '行驶时长',
                dataIndex: 'total_time',
                key: 'total_time'
            }, {
                title: '状态',
                dataIndex: 'status',
                key: 'status'
            }, {
                title: '开始时间',
                dataIndex: 'start_time',
                key: 'start_time'
            }, {
                title: '结束时间',
                dataIndex: 'end_time',
                key: 'end_time'
            }, {
                title: '订单金额',
                dataIndex: 'total_fee',
                key: 'total_fee'
            }, {
                title: '实付金额',
                dataIndex: 'user_pay',
                key: 'user_pay'
            }
        ]
        //设置分页
        const pagination = {
            total: this.state.total,
            pageSize:10,
            onChange: (index) => {
                // console.log(index)
                this.pn=index
                this.getData()
            }
        }
        //设置单选框
        const rowSelection = {
            type:"radio",
            onChange:(selectedRowKeys, selectedRows) =>{
                // console.log(selectedRowKeys, selectedRows)
                this.setState({
                    selectedIndex: selectedRowKeys,
                    selectedItem : selectedRows  
                })

            }
        }
        return (
            <div className="order">
            <Card>
                < Form layout = "inline" >
                <FormItem label="城市">
                {getFieldDecorator('city',{
                    initialValue:"001"
                })(<Select  placeholder="请选择一个城市" style={{ width: 180 }} >
                        {this.cityOptions.map(item=>
                            <Option value={item.index} key={item.index}>{item.label}</Option>
                        )}
                    </Select>)}
                    
                </FormItem>
                <FormItem label="订单时间">
                    {getFieldDecorator('times')(
                            <RangePicker /> 
                        )
                    }    
                </FormItem>
                <FormItem label='订单状态'>
                {getFieldDecorator('status',{
                    initialValue: "01"
                })(
                    <Select placeholder='请选择一个状态' style={{width: 180}}>
                        {
                            this.orderStatus.map(item =>
                            <Option value={item.id} key={item.id}>{item.label}</Option>
                        )}
                    </Select>   
                )
                }
                </FormItem>
            </Form>
            <div className="btn-wrap">
                <Button type="primary" onClick={this.handleSearch}>查询</Button>
                <Button type="danger" className="resBtn" onClick={this.resetData}>重置</Button>
            </div>
            </Card>
            <Card>
                <Button type="primary" className="detailBtn" onClick={this.handleDetail}>订单详情</Button>
                <Button  type="dashed" onClick={this.handleDone}>结束订单</Button>
            </Card>
            <Card>
                    <Table bordered dataSource={this.state.dataSource} 
                    columns={columns}  pagination={pagination} 
                    loading={this.state.loading} rowSelection={rowSelection}/>
            </Card>
                < Modal title = "车辆详情"
                    visible={this.state.isShowModal}
                    onOk={this.handleEnd}
                    onCancel={()=>this.setState({
                    isShowModal:false
                    })}
                    okText = "确认"
                    cancelText = "取消"
                    >
                    <ul className='ul-data'>
                        <li>
                            <span className='car-num li-title'>车辆编号：</span>
                            {this.state.endItem.bike_sn}
                        </li>
                        <li>
                            <span className='car-num li-title'>剩余电量：</span>
                            {this.state.endItem.battery}
                        </li>
                        <li>
                            <span className='car-num li-title'>行程开始时间：</span>
                            {this.state.endItem.start_time}
                        </li>
                        <li>
                            <span className='car-num li-title'>当前位置：</span>
                            {this.state.endItem.location}
                        </li>
                    </ul>
            </Modal>
            </div>
        )
    }
}
export default Form.create()(Order)