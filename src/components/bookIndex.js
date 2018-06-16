import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import List from './List'
export default class BookIndex extends Component {
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
  componentDidMount(){
    document.querySelector('.tab_item').classList.add('active')
  }
  render(){
    const kind = this.props.location.pathname.length > 1 ? this.props.location.pathname.slice(1) :'books' ;
    return(
      <div className="app">
        <Header kind={kind} getStr={this.getSearchStr.bind(this)}/>
        <List kind={kind} searchStr={this.state.searchStr}/>
        <Footer/>
      </div>
    )
  }
}