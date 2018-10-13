import React, { Component } from 'react'
import echarts from "echarts/lib/echarts" //引入echarts核心包
import "echarts/lib/chart/bar" //引入柱状图组件
import "echarts/lib/component/legend" //引入legend组件
import EchartsReact from "echarts-for-react"
import echartTheme from "../echartTheme"
import {Card} from "antd"

class Bar extends Component {
    componentWillMount() {
        echarts.registerTheme('echartTheme', echartTheme)
    }
    bar1=()=>{
        return {
            title:{
                text:"OFO周骑行量"
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: [{
                type: 'category',
                data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
                axisTick: {
                    alignWithLabel: true
                }
            }],
            yAxis: [{
                type: 'value'
            }],
            series: [{
                name: '骑行人数',
                type: 'bar',
                barWidth: '60%',
                data: [3546, 5212,4359, 3374, 3901, 5330, 7220]
            }]
        }
    }
    bar2 = () => {
        return {
            title: {
                text: "用户周骑行量"
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            legend: {
                data: ['OFO', '摩拜', '小蓝单车']
            },
            xAxis: [{
                type: 'category',
                data: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
                axisTick: {
                    alignWithLabel: true
                }
            }],
            yAxis: [{
                type: 'value'
            }],
            series: [{
                name: 'OFO',
                type: 'bar',
                data: [3546, 5212, 4359, 3374, 3901, 5330, 7220]
            }, {
                name: '摩拜',
                type: 'bar',
                data: [1234, 3522, 6421, 5142, 6111, 8000, 10000]
            }, {
                name: '小蓝单车',
                type: 'bar',
                data: [3421, 6070, 8300, 1800, 2800, 8532, 12478]
            }]
        }
    }
    render () {
        return (
            <div>
                <Card title="柱状图一">
                    <EchartsReact option={this.bar1()} theme='echartTheme'></EchartsReact>
                </Card>
                <Card title="柱状图二">
                    <EchartsReact option={this.bar2()} theme='echartTheme'></EchartsReact>
                </Card>
            </div>
        )
    }
}

export default Bar