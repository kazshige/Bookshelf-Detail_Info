import React from 'react';
import StarRatingComponent from 'react-star-rating-component';
import styled from 'styled-components';

export const RatingsLine = styled.div`
  display: flex;
  align-items: center;
`
export const Center = styled.div`
  display: flex;
  justify-content: center;
`

class Ratings extends React.Component {
  constructor() {
    super();

    this.state = {
      rating: 1
    }
  }

  onStarClick(nextValue, prevValue, name) {
    this.setState({rating: nextValue});
  }

  render() {
    const { rating } = this.state;

    return (
      <div>
        <StarRatingComponent
          name="rate1"
          starCount={5}
          value={rating}
          onStarClick={this.onStarClick.bind(this)}
        />
      </div>
    );
  }
};

export default Ratings;

export const StyledRatings = styled(Ratings)`
  color: #aaa;
  overflow: hidden;
  width: 75px;
  margin-left: auto;
  margin-right: auto;
`