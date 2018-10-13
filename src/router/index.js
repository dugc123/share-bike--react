import React, { Component } from 'react'
import {HashRouter,Route,Switch} from "react-router-dom"
import Home from "../view/home"
import NotMatch from "../view/notMatch"
import Admin from "../view/admin"
import Order from "../view/order"
import Pie from "../view/echarts/pie"
import Bar from "../view/echarts/bar/index"
import Detail from "../view/order/detail"
class Router extends Component {
    render () {
        return (
            <HashRouter>
                < div >
                <Switch> 
                    <Route path="/admin/order/detail/:id" component={Detail}></Route>                    
                    <Route path="/" render={()=>
                        <Admin>
                            <Switch>
                                <Route path="/admin/home" component={Home}></Route>
                                <Route path="/admin/order" component={Order}></Route>
                                <Route path='/admin/echarts/pie' component={Pie}/>
                                <Route path='/admin/echarts/bar' component={Bar}/>
                                <Route component={NotMatch}></Route>
                            </Switch>
                        </Admin>
                    }></Route>
                    <Route component={NotMatch}></Route>
                </Switch>
                </div>
            </HashRouter>
        )
    }
}

export default Router