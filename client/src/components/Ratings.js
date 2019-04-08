import React from 'react';
import StarRatingComponent from 'react-star-rating-component';
import styled from 'styled-components';

export const RatingsLine = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  font-size: 12px;
  font-family: "Lato", "Helvetica Neue", "Helvetica", sans-serif;
  color: #00635D;
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

export const RatingContainer = styled.div`
  display: flex;
  align-items: center;
`

export const EditableRatingColor = styled.div`
  label {
    color: #999;
  }
`
export const RatingAverage = styled.span`
  display: inline-block;
  float: right;
  margin: 3px 0 0 5px;
`

class Ratings extends React.Component {
  /*onStarClick(nextValue, prevValue, name) {
    this.setState({rating: nextValue});
  }*/

  render() {
    const rating = this.props.rating || 5;

    return (
      <EditableRatingColor>
        <StarRatingComponent
          starCount={5}
          value={Math.round(rating)}
        />
      <RatingAverage>
        {rating.toFixed(2)}
      </RatingAverage>
      </EditableRatingColor>
    );
  }
};

export default Ratings;

export const StyledRatings = styled(Ratings)`
  color: #aaa;
  overflow: hidden;
  width: 75px;

`