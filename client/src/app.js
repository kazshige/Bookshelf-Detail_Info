import React from "react";
import axios from "axios";
import config from "./config.js";
import { Title, Description, Author } from "./components/Title.js";
import { Image} from './components/BookImage';
import { Container, LeftGrid, RightGrid } from './components/Container';
import styled from 'styled-components';
import Ratings from './components/Ratings';

const Dropdown = styled.div`
border-width: 1px;
padding: 6px 0 7px 8px;
width: 105px;
font-size: 13px;
background: #f2f2f2;
border-color: #dddddd;
color: #181818;
line-height: 100%;
text-overflow: ellipsis;
border-bottom-left-radius: 3px;
border-top-left-radius: 3px;
border-style: solid;
`
const Tick = styled.button`
background-image: url(data:image/png;base64,VBORw0KGgoAAAANSUhEUgAAAA0AAAALCAYAAACksgdhAAAASElEQ…IApjJAFAMAeQeiu%2BQLEOmSDihiHJDxDBDkf%2BGRHsShA2nHmi8jtgEiAAAAAElFTkSuQmCC==);
`
const Rightbutton = styled.div`
background-color: #409D69;
color: #fff;
border-width: 0px;
width: 27px;
font-size: 13px;
border-bottom-right-radius: 3px;
border-top-right-radius: 3px;
border-left: 1px solid #38883d;
margin-right: -10px;
padding: 0;
`
const Wrapper = styled.div`
margin-bottom: 15px;
margin-left: auto;
margin-right: auto;
display: flex;
width: 140px;
`

const ShelfButton = styled.button`
box-sizing: border-box;
background-color: transparent;
background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAICAQAAABaf7ccAAAAKUlEQ…3KsQEAIAzDsJzez8MuoF6tdLo1icQdiBvilrglnw1xS9wHeq2Hge3+H0sAAAAASUVORK5CYII=);
background-position: center center;
background-repeat: no-repeat;
background-size: 8px 4px;
border: 0;
cursor: pointer;
display: block;
font-family: "Lato", "Helvetica Neue", Helvetica, Arial, sans-serif;
font-size: inherit;
font-style: inherit;
font-weight: inherit;
margin: auto;
text-align: inherit;
`
const RatingText = styled.text`
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
`

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
        <LeftGrid>
          { bookImage && <Image src={bookImage.image}/> }
          <Wrapper>
          <Dropdown>
            <Tick></Tick>
            <span title="Read">Read</span>
            </Dropdown>
            <Rightbutton>
            <ShelfButton></ShelfButton>
            </Rightbutton>
          </Wrapper>
          <RatingText>Rate this book</RatingText>
          <Ratings/>
        </LeftGrid>
        <RightGrid>
            <Title>
            { bookInfo && bookInfo.title  }
            </Title>
            <Author> by
            { bookInfo && bookInfo.author }
            </Author>
            <Ratings/>
            <Description>
            { bookInfo && bookInfo.description }
            </Description>
        </RightGrid>
      </Container>
    )
  }
}