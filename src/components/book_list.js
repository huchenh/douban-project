import React, { Component } from 'react'
import { Link } from 'react-router'
import { fetchBooks } from '../utils/api'
export default class List extends Component {
  constructor (props) {
    super(props)
    this.state = {
      data: [],
      query: {
        q: '腾讯',
        count: 1
      }
    }
  }

  componentWillReceiveProps (newProps) {
    console.log(newProps)
    if (newProps.searchStr) {
      this.setState({query: {
        q: newProps.searchStr,
        count: 1
      }}, () => {
        // if(this.state.data && this.)
        this.getBooks(this.state.query.q, this.state.query.count)
        // window.localStorage.setItem('searchStr',newProps.searchStr)
      })
    }
  }
  componentDidMount () {
    this.state.data && this.state.data.length <= 0 && this.getBooks(this.state.query.q, this.state.query.count)
  }

  async getBooks (keyword, page) {
    const book = await fetchBooks(keyword, page)
    this.setState({ data: book })
  }
  render () {
    const books = this.state.data || []
    return (
      <ul className='con_list'>
        {
          books.map((item, index) => {
            return <li key={index}>
              <Link to={`/detail/${JSON.stringify({id: item.id, kind: this.props.kind})}`} className='con_item'>
                <img className='item_img' src={`https://images.weserv.nl/?url=${item.images.small.slice(8)}`} />
                <div className='item_info'>
                  <h2 className='info_title'>
                    名称:
                    {item.title}
                  </h2>
                  <p className='info_tags'>
                    {
                      item.tags.map((tag, count) => {
                        if (count < 3) {
                          return <span key={count}>{tag.name}</span>
                        }
                      })
                    }

                  </p>
                  <p className='info_writer'>
                    作者：{
                      item.author.map((a, i) => {
                        return <span key={i}>{a} </span>
                      })
                    }
                  </p>
                  <p className='info_score'>
                    评分：
                    {item.rating.average}
                  </p>
                  <p className='info_time'>
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
