import React from 'react';
import { mount, shallow } from 'enzyme';
import { PrivateRoute } from '../../routers/PrivateRoute';
import { AppRouter } from '../../routers/AppRouter';
import { AuthContext } from '../../auth/AuthContext';


describe('Pruebas en <Private/>', () => {

    const contextValue = {
        dispatch: jest.fn(),
        user: {
            logged: false
        }
    }

    test('debe de mostrar el login si no esta autenticado', () => {
        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <AppRouter/>
            </AuthContext.Provider>
        );

        expect(wrapper).toMatchSnapshot();
    })

    test('debe de mostrar el componente marvel si esta autenticado', () => {
        const contextValue = {
            dispatch: jest.fn(),
            user: {
                logged: true,
                name: 'Leonel'
            }
        }

        const wrapper = mount(
            <AuthContext.Provider value={contextValue}>
                <AppRouter/>
            </AuthContext.Provider>
        );

        expect(wrapper.find('.navbar').exists()).toBe(true); //si esta el navbar mostro el componente ya que esta logueado
    })
    
})