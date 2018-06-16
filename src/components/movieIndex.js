import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import MovieList from './movie_list'
export default class MovieIndex extends Component {
  constructor(){
    super();
    this.state={
      searchStr:''
    }
  }
  //获取头部搜索字符
  getSearchStr(val){
    this.setState({
      searchStr:val
    })
  }
  render(){
    const kind = this.props.location.pathname.length > 1 ? this.props.location.pathname.slice(1) :'' ;
    return( 
      <div className="app">
        <Header kind={kind} getStr={this.getSearchStr.bind(this)}/>
        <MovieList kind={kind} searchStr={this.state.searchStr}/>
        <Footer/>
      </div>
    )
  }
}