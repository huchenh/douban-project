import React, { Component } from 'react'
import { getInfo } from '../../utils/api'
class BookDetail extends Component {
  constructor (props) {
    super(props)
    this.state = {
      url: 'https://api.douban.com/v2/book/',
      data: {
        images: { small: '', large: '', medium: '' },
        author: [],
        tags: [],
        genres: [],
        directors: [],
        casts: [],
        image: '',
        attrs: {
          publisher: [],
          pubdate: []
        },
        rating: {
          average: ''
        }
      }
    }
  }
  componentDidMount () {
    this.getBookInfo(this.state.url, this.props.id)
  }
  handleGoBack () {
    window.history.go(-1)
  }
  async getBookInfo (url, id) {
    const data = await getInfo(url, id)
    this.setState({
      data
    })
  }
  render () {
    const data = this.state.data
    return (
      <div>
        <header className='detail-header'>
          <div>
            <div className='back-to' onClick={this.handleGoBack.bind(this)}>&lt;图书</div>
            <div className='detail-title'>{data.title}</div>
          </div>
        </header>
        <div className='detail-container'>
          <div className='detail-info'>
            <img className='detail-img' src={`https://images.weserv.nl/?url=${data.images.small.slice(8)}`} />
            <div className='info-item'>
              <p>{data.title}</p>
              <p>作者：{
                data.author.map((a, i) => {
                  return <span key={i}>{`${a}" "`}</span>
                })
              }</p>
              <p>出版社：{data.publisher}</p>
              <p>日期：{data.pubdate}</p>
              <p>价钱：￥{data.price}元</p>
              <p className='info-tags'>
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

          <div className='detail-all'>
            <div>
              <h2>序言</h2>
              <p>{data.catalog}</p>
            </div>
            <div>
              <h2>简介</h2>
              <p>{data.summary}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default BookDetail
