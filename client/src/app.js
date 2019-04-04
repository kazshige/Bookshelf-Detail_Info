import React from "react";
import axios from "axios";
import config from "./config.js";

export default class App extends React.Component{
  componentDidMount(){
    const pathname =   window.location.pathname;
    const bookId = pathname.split("/").filter((i)=> !!i)[1]
    this.fetchData(`books/${bookId}/info`, "bookInfo")
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
    return (
      <div>This is our APP
      <button onClick={this.handleClick}>Fetch Book 2</button>
      </div>
    )
  }
}