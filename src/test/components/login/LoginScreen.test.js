import React from 'react';
import { mount } from 'enzyme';
import { LoginScreen } from '../../../components/login/LoginScreen';
import { AuthContext } from '../../../auth/AuthContext';
import { types } from '../../../types/types';

describe('Pruebas en <LoginScreen />', () => {
    
    const history = {
        replace: jest.fn()
    }

    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: false
        }
    }

    const wrapper = mount(
        <AuthContext.Provider value={ contextValue }>
            <LoginScreen history={ history } />
        </AuthContext.Provider>
    )

    test('debe de mostrarse correctamente', () => {
        
        expect( wrapper ).toMatchSnapshot();

    });


    test('debe de realizar el dispatch y la navegación', () => {

        wrapper.find('input').simulate('change',{
            target: {
                value: 'Leonel',
                name: 'name'
            }
        })
        
        const handleClick = wrapper.find('form').prop('onSubmit');

        handleClick({
            preventDefault(){}
        })

        expect( contextValue.dispatch ).toHaveBeenCalledWith({
            type: types.login,
            payload: {
                name: 'Leonel'
            }
        });
        
        expect( history.replace ).toHaveBeenCalledWith('/');

        localStorage.setItem('lastPath','/dc');
        handleClick({
            preventDefault(){}
        });
        expect( history.replace ).toHaveBeenCalledWith('/dc');
    })
    
    

})
