import React from 'react'
import { Route } from 'react-router-dom'
import LayoutWithSidebar from './LayoutWithSidebar'
import PrivateRoute from "../../../Auth/PrivateRoute";



const RouteWithSidebar = ({ component: Component, isPrivate, ...rest }) => {
    const RouteToRender = () => {
        if (isPrivate) {
            return (
                <LayoutWithSidebar>
                    <PrivateRoute component={(props) => (<Component {...props} />)} {...rest} />
                </LayoutWithSidebar>)
        }
        else {
            return (<Route {...rest} render={props => (
                <LayoutWithSidebar>
                    <Component {...props} />
                </LayoutWithSidebar>
            )} />)
        }
    }
    return (
        RouteToRender()
    )
}

export default RouteWithSidebar