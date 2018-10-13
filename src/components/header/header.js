import React, { Component } from 'react'
import {Link} from "react-router-dom"
import "../../style/commen.less"
import "./header.less"
class Header extends Component {
    render () {
        return (
            <div  className="header-wrap clearfix">
                <div className="header-left fll">
                    <h1>共享单车后台系统</h1>
                </div>
                <div className="header-righ flr">
                    <span className="username">
                        欢迎：旺财
                    </span>
                    <span className="logout">
                        <Link to="/admin/login">退出</Link>
                    </span>
                </div>
            </div>
        )
    }
}

export default Header