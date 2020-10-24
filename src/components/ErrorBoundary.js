import React from 'react';
import reportError from "../redux/action/ErrorLogAction";

/**
 * Global error boundary for catch all errors
 */
export default class ErrorBoundary extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            hasError : false,
            error    : { message: '', stack: '' },
            info     : { componentStack: '' },
        };
    }

    static getDerivedStateFromError = (error) =>
    {
        console.log("getDerivedStateFromError");

        // save the error details
        try
        {
            reportError(error);
        }
        catch (err)
        {
            console.log(`firebase error - ${err}`);
        }

        return { hasError: true };
    };

    componentDidCatch = (error, info) =>
    {
        console.log("componentDidCatch");
        // save the error details
        // save the error details
        try
        {
            reportError(error);
        }
        catch (err)
        {
            console.log(`firebase error - ${err}`);
        }

        this.setState({ error, info });
    };

    render()
    {
        const { hasError, error, info } = this.state;
        const { children } = this.props;

        return hasError ? <h1>Something Went wrong..</h1> : children;
    }
}
