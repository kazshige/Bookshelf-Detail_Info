import React from 'react';
import { shallow } from 'enzyme';
import RatingDetails, { Bar, BarContainer, BarFill, RatingDetailsContainer } from "../../client/src/components/RatingDetails";



describe('Bar Component', () => {
  const props = {
    rating: 4,
    votes: 7,
    largestVotingNumber: 50,
    amountOfRatings: 100
  }
  let wrapper = shallow(<Bar {...props}/>)

  test('Should render without Crashing', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find(BarContainer).length).toEqual(1)
    expect(wrapper.find(BarFill).length).toEqual(1)
  });
})



describe('RatingDetails Component', () => {
  const props = {
    rating: 4,
    ratings: [{rating: 1}],
    likedBy: 7,
    reviews: [{review: 5}],
    users: [{email: "user1"}]
  }
  let wrapper = shallow(<RatingDetails {...props}/>)

  test('Should render without Crashing', () => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.find(RatingDetailsContainer).length).toEqual(1)
    expect(wrapper.find(Bar).length).toEqual(5)
  });
})