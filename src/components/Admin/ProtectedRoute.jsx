import React from 'react'
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ auth, component: Component, ...rest }) => {
    return <Route 
        {...rest}
        render={props =>
            auth ? (
                <Component {...rest} {...props} />
            ): (
                <Redirect 
                    to={{
                        pathname: "/admin"
                    }}
                />
            )
        }
    />
}

export default ProtectedRoute
