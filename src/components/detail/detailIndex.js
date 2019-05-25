import React, { Component } from 'react'
import './detail.css'
import BookDetail from './BookDetail'
import MovieDetail from './MovieDetail'
import MusicDetail from './MusicDetail'
export default class DetailIndex extends Component {
  render () {
    const queryInfo = JSON.parse(this.props.params.data)
    const kind = queryInfo.kind
    const id = queryInfo.id
    const keyword = queryInfo.q;
    const page = queryInfo.page;
    if (kind === 'books') {
      return (
        <div className='detail'>
          <BookDetail id={id} page={page} keyword = {keyword} kind ='books'/>
        </div>
      )
    } else if (kind === 'movies') {
      return (
        <div className='detail' >
          <MovieDetail id={id} page={page} keyword = {keyword} kind ='movies'/>
        </div>
      )
    } else {
      return (
        <div className='detail'>
          <MusicDetail id={id} page={page} keyword = {keyword} kind ='musics'/>
        </div>
      )
    }
  }
}
