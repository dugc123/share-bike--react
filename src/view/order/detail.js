import React, { Component } from 'react'
import {Card } from "antd"
import Header from "../../components/header/header"
import "./detail.less"
import axios from "../../utils"
class Detatil extends Component {
    state = {
        orderInfo: {}
    }
    componentDidMount() {
        this.getData()
    }
    getData = ()=>{
        const id = this.props.match.params.id
        axios.get("/order/detail", id).then(res => {
            if (res.code === '0') {
                this.initMap(res.result)
                // console.log(res)
                this.setState({
                    orderInfo: res.result
                })
            }
        })
    }
    // 创建地图实例
    initMap = (result)=>{
        const BMap = window.BMap
        this.map = new BMap.Map("bmap-content");
        this.addControl()
        this.drawPolyline(result.position_list)
        this.drawServiceArea(result.area)
    }
    //绘制路径折线图
    drawPolyline = (position_list) => {
        const BMap = window.BMap
        const map = this.map
        let startPoint = position_list[0]
        let endPoint = position_list[position_list.length-1]
        let startBmapPoint = new BMap.Point(startPoint.lon, startPoint.lat)//绘制一个百度地图的起点
        let endBmapPoint = new BMap.Point(endPoint.lon, endPoint.lat)//绘制一个百度地图的终点
        
        const  startIcon = new BMap.Icon("/imgs/start_point.png", new BMap.Size(36,42), { 
            imageSize: new BMap.Size(36, 42)
        });
        let startMarker = new BMap.Marker(startBmapPoint,{icon: startIcon})
        
        const endIcon = new BMap.Icon("/imgs/end_point.png", new BMap.Size(36, 42), {
            imageSize: new BMap.Size(36, 42)
        });
        let endMarker = new BMap.Marker(endBmapPoint,{icon:endIcon}) // 创建标注 
        //添加折线
        let polyline = new BMap.Polyline(position_list.map(point=>{
            return new BMap.Point(point.lon, point.lat)
        }), {
            strokeColor: "pink",
            strokeWeight: 4,
            strokeOpacity: 1
        });
        map.addOverlay(startMarker); // 将标注添加到地图中
        map.addOverlay(endMarker); // 将标注添加到地图中
        map.addOverlay(polyline); // 将标注添加到地图中
        this.map.centerAndZoom(startBmapPoint, 15);

    }
    //绘制服务区
    drawServiceArea = (area) => {
        const BMap = window.BMap
        const map = this.map
        let polygon = new BMap.Polygon(
            area.map(point => new BMap.Point(point.lon,point.lat)),{
                strokeColor: "#ff0",
                fillColor:"skyblue",
                strokeStyle: "dashed"
            }
        )
        map.addOverlay(polygon); // 将标注添加到地图中

    }
    //添加控件
    addControl = ()=>{
        const BMap = window.BMap;
        const map = this.map
        map.addControl(new BMap.NavigationControl({
            anchor:window.BMAP_ANCHOR_TOP_RIGHT
        }));
        map.addControl(new BMap.ScaleControl({
            anchor: window.BMAP_ANCHOR_TOP_RIGHT
        }));
    }
    render () {
        const info = this.state.orderInfo
        return (
            <div>
                <Header></Header>
                <Card>
                    <div className="bmap-wrap" id="bmap-content"></div>
                        <div className="detail-info">
                        <div className="item-title">
                            基础信息
                        </div>
                        <ul>
                            <li>
                                <span className="info-left">用车模式</span>
                                <span className="info-right">{info.mode === 1 ? '服务区': '停车点'}</span>
                            </li>
                            <li>
                                <span className="info-left">订单编号</span>
                                <span className="info-right">{info.order_sn}</span>
                            </li>
                            <li>
                                <span className="info-left">车辆编号</span>
                                <span className="info-right">{info.bike_sn}</span>
                            </li>
                            <li>
                                <span className="info-left">用户姓名</span>
                                <span className="info-right">{info.user_name}</span>
                            </li>
                            <li>
                                <span className="info-left">手机号码</span>
                                <span className="info-right">{info.mobile}</span>
                            </li>
                        </ul>
                    </div>
                    <div className="detail-info">
                        <div className="item-title">
                            行驶轨迹
                        </div>
                        <ul className='info-wrap'>
                            <li>
                                <span className="info-left">行程起点</span>
                                <span className="info-right">{info.start_location}</span>
                            </li>
                            <li>
                                <span className="info-left">行程终点</span>
                                <span className="info-right">{info.end_location}</span>
                            </li>
                            <li>
                                <span className="info-left">行驶里程</span>
                                <span className="info-right">{info.distance/1000 + 'KM'}</span>
                            </li>
                        </ul>
                    </div>
                </Card>
            </div>
        )
    }
}

export default Detatil