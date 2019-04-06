import React from "react";
import axios from "axios";
import config from "./config.js";
import { Title, Description, Author } from "./components/BookInfo.js";
import { Image } from './components/BookImage';
import { Container, LeftGrid, RightGrid } from './components/Container';
import Ratings, { RatingsLine, Center} from './components/Ratings';
import RatingDetails from './components/RatingDetails';
import { DropDown, RightButton, ShelfButton } from './components/ReadStatus';
import { Wrapper, RatingText } from './components/RatingStars'
import DoneIcon from '@material-ui/icons/Done';

const Dot = () => <span style={{margin:'0 5px'}}>·</span>

export default class App extends React.Component{
  state = {
    bookInfo: null
  }
  componentDidMount(){
    const bookId = this.props.match.params.id
    this.fetchData(`books/${bookId}/info`, "bookInfo")
    this.fetchData(`books/${bookId}/image`, "bookImage")
    this.fetchData(`books/${bookId}/ratings`, "ratings")
    this.fetchData(`books/${bookId}/reviews`, "reviews")
  }

  fetchData = (url, state) => {
    axios.get(`${config.backendUrl}/${url}`)
      .then((response)=> {
        console.log(response.data)
        this.setState({
          [state]: response.data
        })
      })
  }

  handleClick = () => {
    window.location.href = `${config.backendUrl}/books/2`
  }

  render(){
    const { bookInfo, bookImage, ratings, reviews } = this.state;
    return (
      <Container>
        <LeftGrid>
          { bookImage && <Image src={bookImage.image}/> }
          <Wrapper>
          <DropDown>
            <div style={{color:'#63ce92'}}><DoneIcon/></div>
            <span title="Read">Read</span>
          </DropDown>
          <RightButton>
            <ShelfButton></ShelfButton>
          </RightButton>
          </Wrapper>
          <RatingText>Rate this book</RatingText>
          <Center><Ratings/></Center>
        </LeftGrid>
        <RightGrid>
          <Title>
          { bookInfo && bookInfo.title  }
          </Title>
          <Author> by
          { bookInfo && bookInfo.author }
          </Author>
          <RatingsLine>
            <Ratings/>
            <RatingDetails ratings={ratings} />
            <Dot />
            { ratings && <span style={{color: '#00635D'}}>{ratings.length} ratings</span> }
            <Dot />
            { reviews && <span style={{color: '#00635D'}}>{reviews.length} reviews</span> }
          </RatingsLine>
          <Description>
          { bookInfo && bookInfo.description }
          </Description>
        </RightGrid>
      </Container>
    );
  }
};