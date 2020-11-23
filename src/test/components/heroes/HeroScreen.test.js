import React from 'react';
import { mount } from 'enzyme';
import { HeroScreen } from '../../../components/heroes/HeroScreen';
import { MemoryRouter, Route } from 'react-router-dom';

describe('Pruebas en <Navbar/>', () => {

    const history = {
        length: 10,
        push: jest.fn(),
        goBack: jest.fn()
    }


    test('debe de mostrarse el redirect si no hay argumentos en el URL', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero']}>
                <HeroScreen history={history} />
            </MemoryRouter>
        );

        expect(wrapper.find('Redirect').exists()).toBe(true);
    })

    test('debe de mostrar un hero si el parámetro existe y se encuentra', () => {


        const wrapper = mount(
            // defino la ruta a la que tengo que ir
            <MemoryRouter initialEntries={['/hero/marvel-spider']}> 
                {/* Defino dentro del route, a que me estoy refiriendo */}
                <Route path="/hero/:heroeId" component={HeroScreen} />
            </MemoryRouter>
        );

        expect(wrapper.find('.row').exists()).toBe(true);
    });

    test('debe de regresar a la pantalla anterior con PUSH', () => {

        const history = {
            length: 1,
            push: jest.fn(),
            goBack: jest.fn(),
        }

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route
                    path="/hero/:heroeId"
                    component={() => <HeroScreen history={history} />}
                />
            </MemoryRouter>
        );

        wrapper.find('button').prop('onClick')();

        expect(history.push).toHaveBeenCalledWith('/');
        expect(history.goBack).not.toHaveBeenCalled();


    });

    test('debe de regresar a la pantalla anterior GOBACK', () => {


        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route
                    path="/hero/:heroeId"
                    component={() => <HeroScreen history={history} />}
                />
            </MemoryRouter>
        );

        wrapper.find('button').prop('onClick')();

        expect(history.push).toHaveBeenCalledTimes(0);
        expect(history.goBack).toHaveBeenCalled();

    })


    test('debe de llamar el redirect si el hero no existe', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider123123123']}>
                <Route
                    path="/hero/:heroeId"
                    component={() => <HeroScreen history={history} />}
                />
            </MemoryRouter>
        );

        expect(wrapper.text()).toBe('');


    })


})