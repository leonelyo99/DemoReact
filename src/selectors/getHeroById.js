import {heroes} from '../data/heroes'

export const getHeroById = (Id) => {
    const heroe = heroes.filter(heroe => heroe.id === Id);
    return heroe.length !== 0 ? heroe[0] : null
};
