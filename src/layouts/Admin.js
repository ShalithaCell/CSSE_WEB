/* eslint-disable react/jsx-props-no-spreading,react/destructuring-assignment */
import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
// reactstrap components
import { Container } from "reactstrap";
// core components
import Sidebar from "../components/Sidebar/Sidebar";

import routes from "../routes";
import Footer from "../components/Footers/AdminFooter";
import AdminNavbar from "../components/Navbars/AuthNavbar";

import logoReact from '../assets/img/brand/argon-react.png';

class Admin extends React.Component
{
    componentDidUpdate(e)
    {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        this.refs.mainContent.scrollTop = 0;
    }

    // eslint-disable-next-line class-methods-use-this
    getRoutes(route)
    {
        return route.map((prop, key) =>
        {
            if (prop.layout === "/admin")
            {
                return (
                    <Route
                        path={prop.layout + prop.path}
                        component={prop.component}
                        key={key.toString()}
                    />
                );
            }
            else
            {
                return null;
            }
        });
    }

    getBrandText(path)
    {
        // eslint-disable-next-line no-plusplus
        for (let i = 0; i < routes.length; i++)
        {
            if (
                // eslint-disable-next-line react/destructuring-assignment
                this.props.location.pathname.indexOf(
                    routes[i].layout + routes[i].path,
                ) !== -1
            )
            {
                return routes[i].name;
            }
        }

        return "Brand";
    }

    render()
    {
        return (
            <>
                <Sidebar
                    {...this.props}
                    routes={routes}
                    logo={{
                        innerLink : "/admin/index",
                        imgSrc    : logoReact,
                        imgAlt    : "...",
                    }}
                />
                <div className='main-content' ref='mainContent'>
                    <AdminNavbar
                        {...this.props}
                        brandText={this.getBrandText(this.props.location.pathname)}
                    />
                    <Switch>
                        {this.getRoutes(routes)}
                        <Redirect from='*' to='/admin/index' />
                    </Switch>
                    <Container fluid>
                        <Footer />
                    </Container>
                </div>
            </>
        );
    }
}

export default Admin;
