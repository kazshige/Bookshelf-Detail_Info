import React from "react";
import axios from "axios";
import config from "./config.js";
import { Title, Description, Author } from "./components/BookInfo.js";
import { Image } from './components/BookImage';
import { Container, LeftGrid, RightGrid } from './components/Container';
import Ratings, { RatingsLine, Center} from './components/Ratings';
import RatingDetails from './components/RatingDetails';
import { DropDown, RightButton, Options, Option, AddShelf } from './components/ReadStatus';
import { Wrapper, RatingText } from './components/RatingStars'
import DoneIcon from '@material-ui/icons/Done';

const Dot = () => <span style={{margin:'0 5px'}}>·</span>

export default class App extends React.Component{
  state = {
    bookInfo: null,
    options: [{
      selected: false,
      text: 'Want to Ready'
    }, {
      selected: true,
      text: 'Read'
    }, {
      selected: false,
      text: 'Currently Reading'
    }]
  }
  componentDidMount(){
    const bookId = this.props.match.params.id
    this.fetchData(`books/${bookId}/info`, "bookInfo")
    this.fetchData(`books/${bookId}/image`, "bookImage")
    this.fetchData(`books/${bookId}/ratings`, "ratings")
    this.fetchData(`books/${bookId}/reviews`, "reviews")
    this.fetchData(`books/${bookId}/readstatus`, "readstatus")
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

  toggleOption = (optionText) => {
    const statusArr = [];

    this.state.options.forEach(option => {
      option.selected = option.text === optionText;
      statusArr.push(option);
    });

    this.setState({ options: statusArr });
  }

  addShelf = () => {
    const { shelf } = this.state;

    // Adds shelf
    shelf;
  }

  toggleMenu = () => {
    this.setState({
      statusOpened: !this.state.statusOpened
    });
  }

  updateShelfInput = (event) => {
    this.setState({
      shelf: event.target.value
    });
  }

  render(){
    const { bookInfo, bookImage, ratings, reviews, statusOpened, options } = this.state;

    const selectedOption = options.find(option => option.selected);

    return (
      <Container>
        <LeftGrid>
          { bookImage && <Image src={bookImage.image}/> }
          <Wrapper>
            <DropDown>
              <div style={{color:'#63ce92'}}><DoneIcon/></div>
              <span title="Read">{selectedOption.text}</span>
              </DropDown>
              <RightButton onClick={this.toggleMenu} className={statusOpened ? 'show-menu' : ''}>
                <Options>
                  {options.filter(option => !option.selected).map(option => (
                    <Option onClick={this.toggleOption.bind(this, option.text)}>
                      {option.text}
                    </Option>
                  ))}
                  <AddShelf>
                    <div>Add shelf</div>
                    <input type="text" onChange={this.updateShelfInput} />
                    <button onClick={this.addShelf}>Add</button>
                  </AddShelf>
                </Options>
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
            <Dot />
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