import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import configEnzyme from "../setupTest";
import store from "../redux/store";
import Register from "../views/basic/Register";

describe('Test case for testing register', () =>
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
                <Register />
            </Provider>,
        );
    });

    // test case for login field validation
    it('check input data', () =>
    {
        const componentInstance = wrapper.find('Register').instance();

        componentInstance.handleOnTextChange({ target: { id: 'email', value: 'testEmail@gmail.com' } });
        componentInstance.handleOnTextChange({ target: { id: 'password', value: 'Test@Password' } });
        componentInstance.handleOnTextChange({ target: { id: 'password2', value: 'Test@Password' } });

        // wait for 2 seconds for redux store update
        jest.useFakeTimers();
        setTimeout(() =>
        {
            wrapper.update();

            expect(componentInstance.state.email).toEqual('testEmail@gmail.com');
            expect(componentInstance.state.password).toEqual('Test@Password');
            expect(componentInstance.state.password2).toEqual('Test@Password');
        }, 2000);
        jest.runAllTimers();
    });

    // test case for login field validation
    it('validate password', () =>
    {
        const componentInstance = wrapper.find('Register').instance();

        componentInstance.handleOnTextChange({ target: { id: 'password', value: 'Test@PasswordForUser' } });
        componentInstance.handleOnTextChange({ target: { id: 'password2', value: 'Test@PasswordForUser' } });

        // wait for 2 seconds for redux store update
        jest.useFakeTimers();
        setTimeout(() =>
        {
            wrapper.update();

            expect(componentInstance.state.password)
                .toEqual(componentInstance.state.password2);
        }, 2000);
        jest.runAllTimers();
    });

    // check password invalidate
    it('validate password', () =>
    {
        const componentInstance = wrapper.find('Register').instance();

        componentInstance.handleOnTextChange({ target: { id: 'password', value: 'Test@Password' } });
        componentInstance.handleOnTextChange({ target: { id: 'password2', value: 'Test@PasswordForUser' } });

        // wait for 2 seconds for redux store update
        jest.useFakeTimers();
        setTimeout(() =>
        {
            wrapper.update();

            expect(componentInstance.state.password)
                .toEqual(componentInstance.state.password2);
        }, 2000);
        jest.runAllTimers();
    });
});
