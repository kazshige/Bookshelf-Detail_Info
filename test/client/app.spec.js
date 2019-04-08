import React from 'react';
import { shallow } from 'enzyme';
import App from "../../client/src/app";
import { Container, LeftGrid, RightGrid, Wrapper } from '../../client/src/components/Container';



describe('App Component', () => {

  let wrapper = shallow(<App match={{params: { id: 1}}}/>)

  test('Should render without Crashing', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find(Container).length).toEqual(1)
    expect(wrapper.find(LeftGrid).length).toEqual(1)
    expect(wrapper.find(RightGrid).length).toEqual(1)
  });
})