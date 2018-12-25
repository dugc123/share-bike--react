import React, { Component } from 'react'
import echarts from "echarts/lib/echarts" //引入echarts核心包
import "echarts/lib/chart/pie" //引入饼图组件
import "echarts/lib/component/legend" //引入legend组件
import EchartsReact from "echarts-for-react"
import echartsTheme from "../echartTheme"
import {Card} from "antd"
class Pie extends Component {
    componentWillMount() {
        echarts.registerTheme('macarons', echartsTheme)
    }
    pie1 = ()=>{
        return {
            title: {
                text: '用户骑行订单',
                x: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                right: '20',
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            },
            series: [{
                name: '骑行订单',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: [{
                        value: 3352,
                        name: '周一'
                    },
                    {
                        value: 3109,
                        name: '周二'
                    },
                    {
                        value: 2348,
                        name: '周三'
                    },
                    {
                        value: 1354,
                        name: '周四'
                    },
                    {
                        value: 15481,
                        name: '周五'
                    }, {
                        value: 5481,
                        name: '周六'
                    }, {
                        value: 8632,
                        name: '周日'
                    }
                ]
            }]
        };
    }
        pie2 = () => {
            return {
                title: {
                    text: '用户骑行订单',
                    x: 'center'
                },
                tooltip: {
                    trigger: 'item',
                },
                legend: {
                    orient: 'vertical',
                    right: '20',
                    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                },
                series: [{
                    name: '骑行订单',
                    type: 'pie',
                    radius: ["80%","60%"],
                    center: ['50%', '60%'],
                    data: [{
                            value: 3352,
                            name: '周一'
                        },
                        {
                            value: 3109,
                            name: '周二'
                        },
                        {
                            value: 2348,
                            name: '周三'
                        },
                        {
                            value: 1354,
                            name: '周四'
                        },
                        {
                            value: 15481,
                            name: '周五'
                        }, {
                            value: 5481,
                            name: '周六'
                        }, {
                            value: 8632,
                            name: '周日'
                        }
                    ]
                }]
            };

        }
    render () {
        return (
            <div>
                <Card 
                    title="饼状图一"
                >
                <EchartsReact option={this.pie1()} theme='macarons'></EchartsReact>
                </Card>
                <Card 
                    title="饼状图二"
                >
                <EchartsReact option={this.pie2()} theme='macarons'></EchartsReact>
                </Card>
            </div>
        )
    }
}

export default Pie