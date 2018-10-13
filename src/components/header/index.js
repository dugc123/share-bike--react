import React, { Component } from 'react'
import {Link} from "react-router-dom"
import { Icon} from 'antd';
import {formatData} from "../../utils"
import "../../style/commen.less"
import "./index.less"
import axios from "axios"
import {connect} from "react-redux"
class Header extends Component {
    state={
        weather:"今天有点冷",
        time: "2018-10-10 08:00:05"
    }
    getTime=()=>{
        setInterval(()=>{
            let unixDate = +new Date()    
            let timeStr = formatData(unixDate)
            this.setState({
                time: timeStr
            })
        },1000)
    }
    getMeather(){
        axios.get(`http://t.weather.sojson.com/api/weather/city/101010100`).then(res=>{
            // console.log(res)
            let weather = res.data.data.forecast[0]
            let weatherStr = `${weather.type}~${weather.low}~${weather.high} ${weather.fx} ${weather.fl}`
            this.setState({
                weather: weatherStr
            })
        })
    }
    componentWillMount() {
        this.getTime()
        this.getMeather()
    }
    render () {
        return (
            <div className="header-wrapper">
                <div className="user-info clearfix">
                    <div className="flr">
                        <Link to="/login">退出</Link>
                    </div>
                    <div className="user-detail flr">
                        欢迎：<Icon type="user"/><span className="user-name">李宁</span>
                    </div>
                </div>
                < div className = "weather-wrapper clearfix" >
                    <div className="breadcrumb fll">
                        {this.props.menuText}
                    </div>
                    <div className="weather flr">
                        <div className="weather-detail flr">{this.state.weather}</div>
                        <div className="data flr">{this.state.time}</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default connect(function mapStateToProps(state){
    return {
        menuText: state.menuItemText
    }
})(Header)