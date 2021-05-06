import React from 'React';
import {shallow, mount} from 'enzyme';
import { App } from '../app/App'

jest.unmock('../app/App');

describe('App', () => {
    it('should say Hello World', () => {
        const tree = shallow(<App/>);

        console.log(tree.debug());

         expect(tree.find('#helloWorld').text()).toEqual('Hello World');
    });
});