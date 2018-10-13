import React, { Component } from 'react'
import {Link} from "react-router-dom" 
import notmatchImg from "./404-3.gif"
import "../../style/commen.less"
import "./index.less"
import createBrowserHistory from 'history/createBrowserHistory'
const history = createBrowserHistory()
class NotMatch extends Component {
    render () {
        return (
            <div className="notmatch">
                <div className="notmatch-left">
                    <div className="title">
                        Oh My God
                    </div>
                    <div className="desc">
                        404 您要的页面没有找到
                    </div>
                    <strong>或许您可以选择</strong>
                    <ul>
                        <li><Link to="/admin/home">返回首页</Link></li>
                        <li><span onClick={()=>history.go(0)}>刷新当前页面</span></li>
                        <li><span onClick={()=>history.go(-1)}>返回上一级</span></li>
                    </ul>
                </div>
                <div className="img-wrap">
                    <img src={notmatchImg} alt=""/>
                </div>
            </div>
        )
    }
}

export default NotMatch