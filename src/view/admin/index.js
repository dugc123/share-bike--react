import React, { Component } from 'react'
import { Row, Col } from 'antd';

import Header from "../../components/header"
import NavLeft from "../../components/navLeft"
import Footer from "../../components/footer"

import "./index.less"
class Admin extends Component {
    render () {
        return (
            <div>
                <Row>
                    <Col span={4}>
                        <NavLeft className="nav-left"></NavLeft>
                    </Col>
                    <Col span={20} style={{height: '100vh',overflow: 'auto'}}>
                        <Header></Header>
                        <div className="content-wrap">
                            <div className="content">
                                {this.props.children}
                            </div>
                        </div>
                        <Footer></Footer>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Admin