import React from "react";
import axios from "axios";
import config from "./config.js";
import { Title, Description, Author } from "./components/Title.js";
import { Image} from './components/BookImage';
import { Container } from './components/Container';

export default class App extends React.Component{
  state = {
    bookInfo: null
  }
  componentDidMount(){

    const bookId = this.props.match.params.id
    this.fetchData(`books/${bookId}/info`, "bookInfo")
    this.fetchData(`books/${bookId}/image`, "bookImage")
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
    const { bookInfo, bookImage } = this.state;
    return (
      <Container>
      <div>This is our APP
      <button onClick={this.handleClick}>Fetch Book 2</button>
      <Title>
      { bookInfo && bookInfo.title  }
      </Title>
      <Description>
      { bookInfo && bookInfo.description }
      </Description>
      <Author>
      { bookInfo && bookInfo.author }
      </Author>
      { bookImage && <Image src={bookImage.image}/> }
      </div>
      </Container>
    )
  }
}