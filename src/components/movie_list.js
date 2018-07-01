import React, { Component } from 'react'
import { Link } from 'react-router'
import { fetchMovies } from '../utils/api'
export default class List extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      query: {
        q: '复仇者',
        count: 20
      }
    }
  }
  componentWillReceiveProps (newProps) {
    console.log(newProps)
    if (newProps.searchStr) {
      this.setState({
        query: {
          q: newProps.searchStr,
          count: 10
        }
      }, () => {
        const url = `https://api.douban.com/v2/movie/search?q=${this.state.query.q}&`
        this.getMovies(url, this.state.query.count)
      })
    }
  }
  componentDidMount (url) {
    url = url || 'https://api.douban.com/v2/movie/top250?'
    this.state.data && this.state.data.length <= 0 && this.getMovies(url, this.state.query.count)
  }
  async getMovies (url, page) {
    const movie = await fetchMovies(url, page)
    this.setState({data: movie})
  }
  render () {
    const movies = this.state.data.subjects || []
    return (
      <ul className='con_list'>
        {
          movies.map((item, index) => {
            return <li key={index}>
              <Link to={`/detail/${JSON.stringify({id: item.id, kind: this.props.kind})}`} className='con_item'>
                <img className='item_img' src={`https://images.weserv.nl/?url=${item.images.small.slice(8)}`} alt={item.alt} />
                <div className='item_info'>
                  <h2 className='info_title'>
                    {item.title}——{item.year}
                  </h2>
                  <p className='info_tags danger'>
                    {
                      item.genres.map((genre, count) => {
                        if (count < 3) {
                          return <span key={count}>{genre}</span>
                        }
                      })
                    }

                  </p>
                  <p className='info_writer'>
                    作者：{
                      item.casts.map((cast, i) => {
                        return <span key={i}>{cast.name} </span>
                      })
                    }
                  </p>
                  <p className='info_score'>
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
