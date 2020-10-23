import React, { useState, useEffect } from 'react';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { connect, useDispatch } from "react-redux";
import { Button as RsButton } from "rsuite";
import { ToastContainer, toast } from 'react-toastify';
import AddressForm from "../../views/elements/AddressForm";
import PaymentForm from "../../views/elements/PaymentForm";
import Review from "../../views/elements/Review";
import {
    fetchOrders,
    handleViewPaymentDialogStatus,
    updateOrderStatus,
} from "../../redux/action/OrderAction";

const useStyles = makeStyles((theme) => ({
    appBar : {
        position : 'relative',
    },
    layout : {
        width                                              : 'auto',
        marginLeft                                         : theme.spacing(2),
        marginRight                                        : theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)] : {
            width       : 600,
            marginLeft  : 'auto',
            marginRight : 'auto',
        },
    },
    paper : {
        marginTop                                          : theme.spacing(3),
        marginBottom                                       : theme.spacing(3),
        padding                                            : theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)] : {
            marginTop    : theme.spacing(6),
            marginBottom : theme.spacing(6),
            padding      : theme.spacing(3),
        },
    },
    stepper : {
        padding : theme.spacing(3, 0, 5),
    },
    buttons : {
        display        : 'flex',
        justifyContent : 'flex-end',
    },
    button : {
        marginTop  : theme.spacing(3),
        marginLeft : theme.spacing(1),
    },
}));

const steps = [ 'Shipping address', 'Payment details', 'Review your order' ];

function getStepContent(step)
{
    switch (step)
    {
        case 0:
            return <AddressForm />;
        case 1:
            return <PaymentForm />;
        case 2:
            return <Review />;
        default:
            throw new Error('Unknown step');
    }
}

function PaymentDialog(props)
{
    const classes = useStyles();
    const [ activeStep, setActiveStep ] = React.useState(0);

    const { isEnable } = props;

    const { details } = props;

    const handleNext = () =>
    {
        setActiveStep(activeStep + 1);
        if (activeStep === steps.length - 1)
        {
            props.updateOrderStatus(details.orderItems[0].id, 2);

            toast.done('Order placed successfully', {
                position        : "top-right",
                autoClose       : 5000,
                hideProgressBar : false,
                closeOnClick    : true,
                pauseOnHover    : true,
                draggable       : true,
                progress        : true,
            });
            props.fetchOrders();
            props.handleViewPaymentDialogStatus(false, null);
        }
    };

    const handleBack = () =>
    {
        setActiveStep(activeStep - 1);
    };

    const handleSubmit = () =>
    {
        props.handleViewPaymentDialogStatus(false, null);
    };

    return (
        <>
            <Dialog
                open={isEnable}
                aria-labelledby='form-dialog-title'
                fullWidth
                maxWidth='lg'
            >
                <DialogContent>
                    <main className={classes.layout}>
                        <Paper className={classes.paper}>
                            <Typography component='h1' variant='h4' align='center'>
                                Checkout
                            </Typography>
                            <Stepper activeStep={activeStep} className={classes.stepper}>
                                {steps.map((label) => (
                                    <Step key={label}>
                                        <StepLabel>{label}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                            <>
                                {activeStep === steps.length ? (
                                    <>
                                        <Typography variant='h5' gutterBottom>
                                            Thank you for your order.
                                        </Typography>
                                        <Typography variant='subtitle1'>
                                            Your order number is #
                                            {' '}
                                            {details !== null ? details.orderID : ''}
                                            .
                                            We have emailed your order confirmation, and will
                                            send you an update when your order has shipped.
                                        </Typography>
                                    </>
                                ) : (
                                    <>
                                        {getStepContent(activeStep)}

                                        <div className={classes.buttons}>
                                            <Button
                                                variant='contained'
                                                color='default'
                                                onClick={handleSubmit}
                                                className={classes.button}
                                            >
                                                Cancel
                                            </Button>
                                            {activeStep !== 0 && (
                                                <Button
                                                    onClick={handleBack}
                                                    className={classes.button}
                                                >
                                                    Back
                                                </Button>
                                            )}
                                            <Button
                                                variant='contained'
                                                color='primary'
                                                onClick={handleNext}
                                                className={classes.button}
                                            >
                                                {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                                            </Button>
                                        </div>
                                    </>
                                )}
                            </>
                        </Paper>
                    </main>
                </DialogContent>
            </Dialog>
            <ToastContainer />
        </>
    );
}

const mapStateToProps = (state) => ({
    isEnable : state.system.viewPaymentForm,
    details  : state.system.paymentFormDetails,
});

export default connect(
    mapStateToProps,
    {
        handleViewPaymentDialogStatus,
        updateOrderStatus,
        fetchOrders,
    },
)(PaymentDialog);
