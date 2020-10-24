import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import configEnzyme from "../setupTest";
import store from "../redux/store";
import Orders from "../views/basic/Orders";

describe('Test case for testing orders', () =>
{
    // configure the jtest
    configure({ adapter: new Adapter() });

    // mount login component to the wrapper
    let wrapper;

    const originalWarn = console.warn;

    console.warn = jest.fn();

    // disable the console warnings
    beforeEach(() =>
    {
        jest.spyOn(console, 'warn').mockImplementation(() => {});
        jest.spyOn(console, 'error').mockImplementation(() => {});

        wrapper = mount(
            <Provider store={store}>
                <Orders />
            </Provider>,
        );
    });

    // test case fetching data
    it('check input data', () =>
    {
        // const componentInstance = wrapper.find('Orders').instance();
        //
        // componentInstance.props.fetchOrders();
        //
        // // wait for 2 seconds for redux store update
        // jest.useFakeTimers();
        // setTimeout(() =>
        // {
        //     wrapper.update();
        //
        //     expect(componentInstance.props.orderHeader).not.toBeNull();
        // }, 2000);
    });
});
