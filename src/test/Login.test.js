import React from 'react';
import { shallow, configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import { act } from 'react-dom/test-utils';
import configEnzyme from "../setupTest";
import store from "../redux/store";
import Login from "../views/basic/Login";
import { GetSession, DestroySession } from "../services/SessionManagement";

describe('Test case for testing login', () =>
{
    // destroy all current sessions
    DestroySession();

    // configure the jtest
    configure({ adapter: new Adapter() });

    const originalWarn = console.warn;

    console.warn = jest.fn();

    // disable the console warnings
    beforeEach(() =>
    {
        jest.spyOn(console, 'warn').mockImplementation(() => {});
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    // mount login component to the wrapper
    let wrapper;

    const inputCredentials = () =>
    {
        // input email
        wrapper.find('input[type="email"]').simulate('change', {
            target : {
                name  : 'username',
                value : 'shalithax@gmail.com',
            },
        });

        // input password
        wrapper.find('input[type="Password"]').simulate('change', {
            target : {
                name  : 'password',
                value : 'Shalitha1234',
            },
        });
    };

    // test case for login field validation
    it('check input data', () =>
    {
        wrapper = mount(
            <Provider store={store}>
                <Login />
            </Provider>,
        );

        inputCredentials();

        expect(wrapper.find('input[type="email"]').prop('value')).toEqual('shalithax@gmail.com');
    });

    // test login
    it('login check with right data', () =>
    {
        wrapper = mount(
            <Provider store={store}>
                <Login />
            </Provider>,
        );

        inputCredentials();

        wrapper.find('.login-btn').first().simulate('click');
        jest.useFakeTimers();
        setTimeout(() =>
        {
            expect(GetSession).not.toBeNull();
        }, 2000);
        jest.runAllTimers();
    });
});
