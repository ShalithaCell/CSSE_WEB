import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import { act } from 'react-dom/test-utils';
import configEnzyme from "../setupTest";
import store from "../redux/store";
import Register from "../views/basic/Register";
import { GetSession } from "../services/SessionManagement";

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

    const inputCredentials = () =>
    {
        // input email
        wrapper.find('input[type="email"]').simulate('change', {
            target : {
                value : 'testEmail@gmail.com',
            },
        });

        // input password
        wrapper.find('input[type="password"]').first().simulate('change', {
            target : {
                value : 'Shalitha1234',
            },
        });
    };

    // test case for login field validation
    it('check input data', () =>
    {
        inputCredentials();

        jest.useFakeTimers();
        setTimeout(() =>
        {
            expect(wrapper.instance().state('email')).toEqual('testEmail@gmail.com');
        }, 2000);
        jest.runAllTimers();
    });
});
