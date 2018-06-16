import React, { Component } from 'react';
import './detail.css';
require('es6-promise').polyfill();
import fetchJsonp from 'fetch-jsonp';
export default class DetailIndex extends Component {
  constructor() {
    super();
    this.state = {
      urls: {
        musics: 'https://api.douban.com/v2/music/',
        books: 'https://api.douban.com/v2/book/',
        movies: 'https://api.douban.com/v2/movie/subject/'
      },
      data: {
        images: { small: '', large: '', medium: '' },
        author: [],
        tags: [],
        genres: [],
        directors: [],
        casts: [],
        image:'',
        attrs:{
          publisher:[],
          pubdate:[]
        },
        rating:{
          average:''
        }
      }
      /* sorts:{
        books:'图书',
        musics:'音乐',
        movies:'电影'
      } */
    }
  }
  handleGoBack(){
    window.history.go(-1);
  }
  componentDidMount() {
    const queryInfo = JSON.parse(this.props.params.data);
    const url = this.state.urls[queryInfo['kind']];
    const id = queryInfo.id;
    const _this = this;
    fetchJsonp(`${url}${id}`)
      .then(function (response) {
        return response.json()
      }).then(function (json) {
        // console.log(json)
        _this.setState({ data: json })
      }).catch(function (ex) {
        console.log('parsing failed', ex)
      })
  }
  render() {
    const kind = JSON.parse(this.props.params.data).kind, data = this.state.data;
    let headerInner, infoInner, descInner, conInner;
    console.log(data)
    if (kind == 'books') {
      headerInner = <div>
        <div className='back-to' onClick={this.handleGoBack.bind(this)}>&lt;图书</div>
        <div className='detail-title'>{data.title}</div>
      </div>
      infoInner = <div className="detail-info">
        <img className='detail-img' src={`https://images.weserv.nl/?url=${data.images.small.slice(8)}`} />
        <div className="info-item">
          <p>{data.title}</p>
          <p>作者：{
            data.author.map((a, i) => {
              return <span key={i}>{`${a}" "`}</span>
            })
          }</p>
          <p>出版社：{data.publisher}</p>
          <p>日期：{data.pubdate}</p>
          <p>价钱：￥{data.price}元</p>
          <p className="info-tags">
            {
              data.tags.map((tag, i) => {
                if (i < 3) {
                  return <span key={i}>{tag.name}</span>
                }
              })
            }
          </p>
        </div>
      </div>
      descInner = <div>
        <h2>序言</h2>
        <p>{data.catalog}</p>
      </div>
      conInner = <div>
        <h2>简介</h2>
        <p>{data.summary}</p>
      </div>
    } else if (kind == 'movies') {
      headerInner = <div>
        <div className='back-to' onClick={this.handleGoBack.bind(this)}>&lt;电影</div>
        <div className='detail-title'>{data.title}</div>
      </div>
      infoInner = <div className="movie-info">
        <img className="movie-img" src={`https://images.weserv.nl/?url=${data.images.large.slice(8)}`} alt="" />
      </div>
      descInner = <div>
        <h2>简介</h2>
        <div className="movie-item">
          <p className="info-tags movie-tags">名称：{data.title} {data.genres.map((genre, i) => {
            return <span key={i}>{genre}</span>
          })}
          </p>
          <p>上映时间：{data.year}</p>
          <p>导演：{data.directors.map((d, i) => {
            return <span key={i}>{d.name}</span>
          })}</p>

        </div>
      </div>
      conInner = <div>
        <h2>演员</h2>
        <div className="movie-casts">
          {
            data.casts.map((cast, i) => {
              return <img key={i} src={`https://images.weserv.nl/?url=${cast.avatars.large.slice(8)}`} alt="" />
            })
          }
        </div>
      </div>
    } else {
      headerInner = <div>
        <div className='back-to' onClick={this.handleGoBack.bind(this)} >&lt;音乐</div>
        <div className='detail-title'>{data.title}</div>
      </div>
      infoInner = <div className="detail-info">
        <img className='detail-img' src={`https://images.weserv.nl/?url=${data.image.slice(8)}`} />
        <div className=" music-info">
          <p className="info-tags">名称：{data.title} {data.tags.map((tag,i)=>{
            return <span key={i}>{tag.name}</span>
          })}
          </p>
          <p>作者：{data.author.map((a,i)=>{
            return <span key={i}>{`${a.name} `}</span>
          })}</p>
          <p>发布商：{data.attrs.publisher.map((p,i)=>{
            return <span key={i}>{`${p} `}</span>
          })}</p>
          <p>发布时间：{data.attrs.pubdate.map((p,i)=>{
            return <span key={i}>{`${p} `}</span>
          })}</p>
          <p>评分：{data.rating.average}</p>
        </div>
      </div>
      descInner = <h2>简介</h2>
      conInner=<div>
        <h2>内容</h2>
        <p>{data.title}</p>
      </div>
    }
    /* 
       musics infoInner
          
       decInner
          
       conInner
          
    */

    return (

      <div className="detail">
        <header className="detail-header">
          {headerInner}
        </header>
        <div className="detail-container">
          <div >
            {/*掺入内容*/}
            {infoInner}
          </div>
          <div className="detail-all">
            <div>
              {/*掺入内容*/}
              {descInner}
            </div>
            <div>
              {/*掺入内容*/}
              {conInner}
            </div>
          </div>
        </div>
      </div>
    )

  }
}