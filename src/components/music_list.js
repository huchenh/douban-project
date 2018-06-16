require('es6-promise').polyfill();
import React, { Component } from 'react';
import { Link } from 'react-router';
import fetchJsonp from 'fetch-jsonp';
export default class MusicList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      query:{
        q: '爱的太迟',
        count: 20
      }
    }
  }
  componentWillReceiveProps(newProps){
    console.log(newProps)
    if(newProps.searchStr){
      this.setState({query:{
        q:newProps.searchStr,
        count:10
      }},()=>{
        this.componentDidMount();
      })  
    }
    
  }
  componentDidMount() {
    const _this = this;
    fetchJsonp(`https://api.douban.com/v2/music/search?q=${this.state.query.q}&count=${this.state.query.count}`)
      .then(function (response) {
        return response.json()
      }).then(function (json) {
        _this.setState({ data: json })
      }).catch(function (ex) {
        console.log('parsing failed', ex)
      })
  }
 
  render() {
    
    const musics = this.state.data.musics|| [];
    return (
      <ul className="con_list">
        {
          musics.map((item, index) => {
            return <li key={index}>
              <Link to={`/detail/${JSON.stringify({id:item.id,kind:this.props.kind})}`} className="con_item">
                <img className="item_img" src={`https://images.weserv.nl/?url=${item.image.slice(8)}`}/>
                <div className="item_info">
                  <h2 className="info_title">
                    名称:
                    {item.title}
                  </h2>
                  <p className="info_writer">
                    作者：{
                      item.author.map((a, i) => {
                        return <span key={i}>{a.name} </span>
                      })
                    }
                  </p>
                  <p className="info_score">
                    评分：
                    {item.rating.average}
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