require('es6-promise').polyfill();
import React, { Component } from 'react';
import { Link } from 'react-router';
import fetchJsonp from 'fetch-jsonp';
const dataGlob=[];
export default class List extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      query:{
        q: 'react',
        count: 10
      }
    }
  }
  
  componentWillReceiveProps(newProps){
    console.log(newProps)
    if(newProps.searchStr){
      this.setState({query:{
        q:newProps.searchStr,
        count:20
      }},()=>{
        // if(this.state.data && this.)
        this.getList();
        // window.localStorage.setItem('searchStr',newProps.searchStr)
      })  
    }
  }
  componentDidMount() {
    /* if(window.localStorage['ch-books']){
      
      this.setState({
        data:JSON.parse(window.localStorage.getItem('ch-books'))
      })
      return;
    } */
    this.state.data&&this.state.data.length<=0&&this.getList()
    
  }
  getList(){
    const _this = this;
    fetchJsonp(`https://api.douban.com/v2/book/search?q=${this.state.query.q}&count=${this.state.query.count}`)
      .then(function (response) {
        return response.json()
      }).then(function (json) {
        // console.log(json)
        // window.localStorage.setItem('ch-books',JSON.stringify(json))
        _this.setState({ data: json })
      }).catch(function (ex) {
        console.log('parsing failed', ex)
      })
  }
  render() {
    const books = this.state.data.books || [];
    return (
      <ul className="con_list">
        {
          books.map((item, index) => {
            return <li key={index}>
              <Link to={`/detail/${JSON.stringify({id:item.id,kind:this.props.kind})}`} className="con_item">
                <img className="item_img" src={`https://images.weserv.nl/?url=${item.images.small.slice(8)}`} />
                <div className="item_info">
                  <h2 className="info_title">
                    名称:
              {item.title}
                  </h2>
                  <p className="info_tags">
                    {
                      item.tags.map((tag,count)=>{
                        if(count<3){
                          return <span key={count}>{tag.name}</span>
                        }
                      })
                    }

                  </p>
                  <p className="info_writer">
                    作者：{
                      item.author.map((a, i) => {
                        return <span key={i}>{a} </span>
                      })
                    }
                  </p>
                  <p className="info_score">
                    评分：
              {item.rating.average}
                  </p>
                  <p className="info_time">
                    时间：
              {item.pubdate}
                  </p>
                </div>
              </Link>
            </li>
          })
        }

      </ul>
    )
  }
}