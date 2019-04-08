import React from 'react';
import { shallow } from 'enzyme';
import StarRatingComponent from 'react-star-rating-component';
import Ratings, { EditableRatingColor, RatingAverage } from "../../client/src/components/Ratings";



describe('Ratings Component', () => {
  const props = {
    rating: 4,
  }
  let wrapper = shallow(<Ratings {...props}/>)

  test('Should render without Crashing', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find(EditableRatingColor).length).toEqual(1)
    expect(wrapper.find(RatingAverage).length).toEqual(1)
    expect(wrapper.find(StarRatingComponent).length).toEqual(1)
  });
})