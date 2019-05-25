import React, { Component } from 'react'
import { getInfo } from '../../utils/api'
class MovieDetail extends Component {
  constructor (props) {
    super(props)
    this.state = {
      url: 'https://api.douban.com/v2/movie/subject/',
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
    this.getMovieInfo(this.props.kind, this.props.keyword,this.props.page,this.props.id)
  }
  handleGoBack () {
    window.history.go(-1)
  }
  async getMovieInfo (kind, keyword,page,id) {
    const data = await getInfo(kind, keyword,page,id)
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
            <div className='back-to' onClick={this.handleGoBack.bind(this)}>&lt;电影</div>
            <div className='detail-title'>{data.title}</div>
          </div>
        </header>
        <div className='detail-container'>
          <div className='movie-info'>
            <img className='movie-img' src={`https://images.weserv.nl/?url=${data.images.large.slice(8)}`} alt='' />
          </div>

          <div className='detail-all'>
            <div>
              <h2>简介</h2>
              <div className='movie-item'>
                <p className='info-tags movie-tags'>名称：{data.title} {data.genres.map((genre, i) => {
                  return <span key={i}>{genre}</span>
                })}
                </p>
                <p>上映时间：{data.year}</p>
                <p>导演：{data.directors.map((d, i) => {
                  return <span key={i}>{d.name}</span>
                })}</p>

              </div>
            </div>
            <div>
              <h2>演员</h2>
              <div className='movie-casts'>
                {
                  data.casts.map((cast, i) => {
                    return <img key={i} src={`https://images.weserv.nl/?url=${cast.avatars.large.slice(8)}`} alt='' />
                  })
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MovieDetail
