import React from 'react';
import StarRatingComponent from 'react-star-rating-component';
import styled from 'styled-components';

export const RatingsLine = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`
export const Center = styled.div`
  display: flex;
  justify-content: center;
`

const Grey = styled.div`
  label {
    color: #999;
  }
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
      <Grey>
        <StarRatingComponent
          name="rate1"
          starCount={5}
          value={rating}
          onStarClick={this.onStarClick.bind(this)}
        />
      </Grey>
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