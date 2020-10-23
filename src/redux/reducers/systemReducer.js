import {
    POPUP_DIALOG_FORGOTPASSWORD,
    POPUP_SPINNER,
    SET_PERMISSION_LIST,
    SET_SESSION_EXPIRED,
    UPDATE_USER_NAME_LIST,
    DIALOG_NEW_SUPPLIER, DIALOG_NEW_ITEM, DIALOG_NEW_ORDER,
    VIEW_ORDER_TYPE, DIALOG_VIEW_ORDER, VIEW_PAYMENT_DIALOG,
} from '../actionTypes';

const initialState = {
    popupForgotpwDialog : false,
    loader              : false,
    sessionExpired      : false,
    userNameList        : [],
    permissonLevels     : null,
    newSupplierDialog   : false,
    supplierEditableID  : null,
    newItemDialog       : false,
    ItemEditableID      : null,
    newOrderDialog      : false,
    orderEditableID     : null,
    viewOrdersType      : 1,
    viewOrderDialog     : false,
    viewOrderDetails    : null,
    viewPaymentForm     : false,
    paymentFormDetails  : null,
};

export default function(state = initialState, action)
{
    switch (action.type)
    {
        case POPUP_DIALOG_FORGOTPASSWORD:
            return {
                ...state,
                popupForgotpwDialog : action.payload,
            };
        case POPUP_SPINNER:
            return {
                ...state,
                loader : action.payload,
            };
        case SET_SESSION_EXPIRED:
            return {
                ...state,
                sessionExpired : action.payload,
            };
        case UPDATE_USER_NAME_LIST:
            return {
                ...state,
                userNameList : action.payload,
            };
        case SET_PERMISSION_LIST:
            return {
                ...state,
                permissonLevels : action.payload,
            };
        case DIALOG_NEW_SUPPLIER:
            return {
                ...state,
                newSupplierDialog  : action.payload.action,
                supplierEditableID : action.payload.editID,
            };
        case DIALOG_NEW_ITEM:
            return {
                ...state,
                newItemDialog  : action.payload.action,
                ItemEditableID : action.payload.editID,
            };
        case DIALOG_NEW_ORDER:
            return {
                ...state,
                newOrderDialog  : action.payload.action,
                orderEditableID : action.payload.editID,
            };
        case DIALOG_VIEW_ORDER:
            return {
                ...state,
                viewOrderDialog  : action.payload.action,
                viewOrderDetails : action.payload.rowData,
            };
        case VIEW_ORDER_TYPE:
            return {
                ...state,
                viewOrdersType : action.payload,
            };
        case VIEW_PAYMENT_DIALOG:
            return {
                ...state,
                viewPaymentForm    : action.payload.action,
                paymentFormDetails : action.payload.rowData,
            };
        default:
            return state;
    }
}
