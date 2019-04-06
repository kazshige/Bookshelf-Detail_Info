import React, { Component } from 'react'
import styled from 'styled-components';
import FormatAlignLeft from '@material-ui/icons/FormatAlignLeft'

const RatingDetailsContainer = styled.div`
  position: relative;
`
const RatingPopup = styled.div`
  display: ${props => props.isOpen ? 'block' : 'none' };
  position: absolute;
  top: 0;
  left:0;
  min-width: 200px;
  min-height: 100px;
  border: 5px solid orange;
  border-radius: 5px;
  background: #fff;
`

const OpenButton = styled.div`
  border: none;
  cursor: pointer;
  margin: 0 10px;
`

const CloseButton = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;
  border: none;
  cursor: pointer;
`

const BarContainer = styled.div`
  margin: 10px;
  `

const BarLine = styled.div`
  border: 1px solid #222;
  min-height: 20px;
`
const BarFill = styled.div`
  background: green;
  width: ${props => props.percent}%;
  height: 20px;
`

class Bar extends Component {
  render(){
    const { rating, votes, largestVotingNumber } = this.props;

    const percent = votes / largestVotingNumber * 100;
    return (
      <BarContainer>
       { rating}
       -
       { votes}
       -
       { percent }%
       <BarLine>
        <BarFill percent={percent} />
       </BarLine>
      </BarContainer>
    )
  }
};

class RatingDetails extends Component {
  state = {
    isOpen: false
  }

  toggle = () => this.setState( s => ({ isOpen: !s.isOpen }))

  render(){
    const { isOpen } = this.state;
    const { ratings } = this.props;

    const ratingSummary = !ratings ? null : ratings.reduce((acc, v)=>{
      const upd = {};
      upd[v.rating] = acc[v.rating]+1;
      return {...acc, ...upd}
    }, {1:0, 2:0, 3:0, 4:0, 5:0});

    const largestVotingNumber = !ratings ? null : Object.keys(ratingSummary).reduce((acc,v)=>{
      if(ratingSummary[v] > acc) return ratingSummary[v];
      return acc;
    }, 0);

    console.log('largestVotingNumber', largestVotingNumber);

    return (
      <RatingDetailsContainer>
        <OpenButton onClick={this.toggle}><FormatAlignLeft /></OpenButton>
        <RatingPopup isOpen={isOpen}>
          <CloseButton onClick={this.toggle}>X</CloseButton>
          <span>Rating Details</span>

          <div>{JSON.stringify(ratingSummary)}</div>

          {
            !!ratings && <div>{
            Object.keys(ratingSummary).map( rating => {
              return <Bar rating={rating} votes={ratingSummary[rating]} largestVotingNumber={largestVotingNumber} />
            })
            }</div>
          }

        </RatingPopup>
      </RatingDetailsContainer>
    )
  }
};

export default RatingDetails;