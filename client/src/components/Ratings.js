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

export const RatingText = styled.div`
  background: transparent;
  border: 0;
  box-sizing: content-box;
  display: block;
  font-size: 11px;
  height: 16px;
  line-height: 14px;
  margin: 0 auto;
  padding: 3px 6px 0 6px;
  width: 100px;
  color: #999999;
  font-family: "Lato", "Helvetica Neue", "Helvetica", sans-serif;
  text-align: center;
`

const EditableRatingColor = styled.div`
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
      <EditableRatingColor>
        <StarRatingComponent
          name="rate1"
          starCount={5}
          value={rating}
          onStarClick={this.onStarClick.bind(this)}
        />
      </EditableRatingColor>
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