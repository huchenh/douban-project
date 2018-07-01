import React, { Component } from 'react'
export default class Header extends Component {
  constructor () {
    super()
    this.state = {
      kinds: {
        books: '书名、作者、ISBN',
        musics: '唱片名、表演者、条码、ISRC',
        movies: '电影、影人、影院、电视剧'
      }
    }
  }
  handleClick (e) {
    this.props.getStr(this.refs.input.value)
  }
  render () {
    const placeHolder = this.state.kinds[this.props.kind] || '书名、作者、ISBN'
    return (
      <header className='m_header'>
        <div className='search_wrap'>
          <input type='text' placeholder={placeHolder} ref='input' />
          <button className='search_btn' onClick={this.handleClick.bind(this)}>搜索</button>
          <i className='iconfont icon-sousu icon_book' />
        </div>
      </header>
    )
  }
}
