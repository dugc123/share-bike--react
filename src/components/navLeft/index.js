import React, { Component } from 'react'
import {Link} from "react-router-dom"
import { Menu, Icon} from 'antd';
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import actions from "../../redux/action"
import "./index.less"

const SubMenu = Menu.SubMenu;


class NavLeft extends Component {
    
    clickMenuItem = ({ item, key, keyPath }) => {
    // console.log(item)
    const text = item.props.children.props.children
    // console.log(this.props.dispatch({type:"CHANGE_MENU_ITEM",text}))
    this.props.action.changeMenuItem(text)
    
}
render() {
    return (
        <div className="nav-left">
            <Menu mode="vertical" theme="dark" onClick={this.clickMenuItem}>
                <Menu.Item key="/admin/home"><Link to="/admin/home"><Icon type="appstore" />首页</Link></Menu.Item>
                < SubMenu title={<span><Icon type="file-done" /><span>订单管理</span></span>} >
                    <Menu.Item key="/admin/order">
                    <Link to="/admin/order">订单管理</Link>
                    </Menu.Item>
                </SubMenu>
                < SubMenu title={<span><Icon type="smile" /><span>图形展示</span></span>} >
                    < Menu.Item key = "/admin/echarts/pie" >
                        <Link to="/admin/echarts/pie">饼图</Link>
                    </Menu.Item>
                    < Menu.Item key = "/admin/echarts/bar" >
                        <Link to="/admin/echarts/bar">柱形图</Link>
                    </Menu.Item>
                </SubMenu>
            </Menu>
        </div>
    );
}

}

export default connect(
    null,
    (dispatch)=>({
       action:bindActionCreators(actions,dispatch)
    })
)(NavLeft) 