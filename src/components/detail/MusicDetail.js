import React, { Component } from 'react'
import { getInfo } from '../../utils/api'
class MusicDetail extends Component {
  constructor (props) {
    super(props)
    this.state = {
      url: 'https://api.douban.com/v2/music/',
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
    this.getMusicInfo(this.state.url, this.props.id)
  }
  handleGoBack () {
    window.history.go(-1)
  }
  async getMusicInfo (url, id) {
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
            <div className='back-to' onClick={this.handleGoBack.bind(this)} >&lt;音乐</div>
            <div className='detail-title'>{data.title}</div>
          </div>
        </header>
        <div className='detail-container'>
          <div className='detail-info'>
            <img className='detail-img' src={`https://images.weserv.nl/?url=${data.image.slice(8)}`} />
            <div className=' music-info'>
              <p className='info-tags'>名称：{data.title} {data.tags.map((tag, i) => {
                return <span key={i}>{tag.name}</span>
              })}
              </p>
              <p>作者：{data.author.map((a, i) => {
                return <span key={i}>{`${a.name} `}</span>
              })}</p>
              <p>发布商：{data.attrs.publisher.map((p, i) => {
                return <span key={i}>{`${p} `}</span>
              })}</p>
              <p>发布时间：{data.attrs.pubdate.map((p, i) => {
                return <span key={i}>{`${p} `}</span>
              })}</p>
              <p>评分：{data.rating.average}</p>
            </div>
          </div>

          <div className='detail-all'>
            <h2>简介</h2>
            <div>
              <h2>内容</h2>
              <p>{data.title}</p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MusicDetail
