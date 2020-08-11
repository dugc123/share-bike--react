/*
 * @Autor: 杜庚辰
 * @Desc: 
 * @Date: 2019-08-22 17:41:58
 */
import React, { Component } from 'react'
import { Form, Select, Card, Button, Table, message, Modal} from 'antd';
import { DatePicker} from 'antd';
import "./index.less"
import axios from "../../utils/index"
import ReactToPront from "react-to-print"
import print from 'print-js';
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
        titleShow:false,
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
    //     axios.get('/order/list',this.params).then(res=>{
    //     if (res.code === "0") {
    //         const dataSource= res.result.item_list.map((item,index)=>{
    //             item.key=index
    //             return item
    //         })
    //         this.setState({
    //             dataSource,
    //             total: res.result.total_count,
    //             loading: {
    //                 ...this.state.loading,
    //                 spinning: false
    //             }
    //         })
    //     }
    // })
        axios.get("https://www.easy-mock.com/mock/5c1b3ee5fe5907404e6540d0/example/getbike").then(res=>{
            this.setState({
                dataSource:res.data,
                total: res.data.length,
                loading: {
                    ...this.state.loading,
                    spinning: false
                }
            })
        })
    }
    //订单详情
    handleDone =()=>{
        let selectedItem = this.state.selectedItem    
        if (selectedItem){
            axios.get("/order/ebike_info", { id: selectedItem[0].id}).then(res=>{
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
    doPrint3(){
    
        //判断iframe是否存在，不存在则创建iframe
        let iframe=document.getElementById("print-iframe");
        if(!iframe){  
                let el = document.getElementById("table");
                iframe = document.createElement('IFRAME');
                console.log("iframe",iframe)
                var doc = null;
                iframe.setAttribute("id", "print-iframe");
                iframe.setAttribute('style', 'position:absolute;width:0px;height:0px;left:-500px;top:-500px;');
                document.body.appendChild(iframe);
                doc = iframe.contentWindow.document;
                //这里可以自定义样式
                // doc.write("<LINK rel="stylesheet" type="text/css" href="css/print.css">");
                doc.write('<div>' + el.innerHTML + '</div>');
                doc.close();
                iframe.contentWindow.focus();            
        }
        iframe.contentWindow.print();
        if (navigator.userAgent.indexOf("MSIE") > 0){
            document.body.removeChild(iframe);
        }
        
    }
    render () {
        const { getFieldDecorator} = this.props.form;
    // eslint-disable-next-line
    console.log("XLSX",XLSX)

        const columns = [
            {
                title: '订单编号',
                dataIndex: 'order_sn',
                key: 'order_sn',
                width:140
            }, {
                title: '车辆编号',
                dataIndex: 'bike_sn',
                key: 'bike_sn',
                width:120
            }, {
                title: '用户名',
                dataIndex: 'user_name',
                key: 'user_name',
                width:100
            }, {
                title: '手机号',
                dataIndex: 'mobile',
                key: 'mobile',
                width:140
            }, {
                title: '里程',
                dataIndex: 'distance',
                render(distance) {
                    return distance / 1000 + 'Km';
                },
                key: 'distance',
                width:100
            }, {
                title: '行驶时长',
                dataIndex: 'total_time',
                key: 'total_time',
                width:100
            }, {
                title: '开始时间',
                dataIndex: 'start_time',
                key: 'start_time',
                width:160
            }, {
                title: '结束时间',
                dataIndex: 'end_time',
                key: 'end_time',
                width:160
            }, {
                title: '订单金额',
                dataIndex: 'total_fee',
                key: 'total_fee',
                width:120
            }
        ]
        //设置分页
        const pagination = {
            total: this.state.total,
            pageSize:20,
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
                <Button onClick={this.doPrint3.bind(this)} style={{marginLeft:12}}>测试打印</Button>
                <ReactToPront trigger={()=><Button style={{marginLeft:12}}>打印11</Button>}
                    content={()=> this.refs}
                    onAfterPrint={()=>this.setState({titleShow:false})}
                    onBeforeGetContent={()=>{
                        this.setState({titleShow:true})
                    }
                    }
                ></ReactToPront>
                <Button style={{marginLeft:12}} onClick={()=>print({
                        printable: this.state.dataSource,
                        type: 'json',
                        properties: !this.state.titleShow?[{field:"order_sn",displayName:"订单编号"}, {field:'bike_sn',displayName:"车辆编号"},{field:'user_name',displayName:"用户名"},
                        {field:'mobile',displayName:"手机号"},{field:"distance",displayName:"里程"},{field:'total_time',displayName:"行驶时长"},{field:'start_time',displayName:"开始时间"},
                        {field:'end_time',displayName:"结束时间"},{field:'total_fee',displayName:"订单金额"}]:[{field:"order_sn",displayName:"订单编号"}],
                        header: '<h1 class="custom-h3">浙江大学第一医院</h1><h2 class="custom-h3">病情护理记录单</h2><div class="huanzhe-info" style={{margin:12px}}><span>患者姓名：<span class="name">王二</span></span></div>',
                        style: '.custom-h3 { text-align:center }.huanzhe-info {margin-bottom:8px}.name{border-bottom:1px solid #000}'
                    })}>打印22</Button>
            </div>
            </Card>
            <Card>
                <Button type="primary" className="detailBtn" onClick={this.handleDetail}>订单详情</Button>
                <Button  type="dashed" onClick={this.handleDone}>结束订单</Button>
            </Card>
            <Card ref={(el)=>this.refs = el} className="print">
                    {this.state.titleShow?<div><h1 style={{textAlign:"center"}}>浙江大学第一医院</h1><h2 style={{textAlign:"center"}}>病情护理记录单</h2></div>:null}
                    <Table bordered dataSource={this.state.dataSource}  id="table"
                    columns={columns} pagination={pagination} 
                    loading={this.state.loading} rowSelection={rowSelection}/>
            </Card >
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