import React, { Component } from 'react'
import {HashRouter,Route,Switch} from "react-router-dom"
import Home from "../view/home"
import NotMatch from "../view/notMatch"
import Admin from "../view/admin"
import Order from "../view/order"
import Pie from "../view/echarts/pie"
import Bar from "../view/echarts/bar/index"
// import Detail from "../view/order/detail"
const baseRoutes = [
    {
      path:'/admin/home', 
      name:'home',
      component:Home
    },{
        path:'/admin/order', 
        name:'order',
        component:Order
      },{
        path:'/admin/echarts/pie', 
        name:'pie',
        component:Pie
      },{
        path:'/admin/echarts/bar', 
        name:'bar',
        component:Bar
      }
  ]

class Router extends Component {
    render () {
        return (
            <HashRouter>
                < div >
                <Switch> 
                    {/* <Route path="/admin/order/detail/:id" component={Detail}></Route>                     */}
                    <Route path="/" render={()=>
                        <Admin>
                            <Switch>
                            {baseRoutes.map(route=><Route key={route.name} path={route.path} name={route.name} {...route}/>)}
                                
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