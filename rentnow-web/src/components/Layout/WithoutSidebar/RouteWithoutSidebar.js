import React from 'react'
import { Route } from 'react-router-dom'
import LayoutWithoutSidebar from './LayoutWithoutSidebar'
import PrivateRoute from "../../../Auth/PrivateRoute";



const RouteWithoutSidebar = ({ component: Component, isPrivate, ...rest }) => {
    const RouteToRender = () => {
        if (isPrivate) {
            return (
                <LayoutWithoutSidebar>
                    <PrivateRoute component={(props) => (<Component {...props} />)} {...rest} />
                </LayoutWithoutSidebar>)
        }
        else {
            return (<Route {...rest} render={props => (
                <LayoutWithoutSidebar>
                    <Component {...props} />
                </LayoutWithoutSidebar>
            )} />)
        }
    }
    return (
        RouteToRender()
    )
}

export default RouteWithoutSidebar