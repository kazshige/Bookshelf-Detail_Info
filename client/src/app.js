import React from "react";
import axios from "axios";
import config from "./config.js";

export default class App extends React.Component{
  componentDidMount(){
    this.fetchData("books/1/info", "bookInfo")
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

  render(){
    return (
      <div>This is our APP</div>
    )
  }
}