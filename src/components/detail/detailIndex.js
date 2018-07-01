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
    if (kind === 'books') {
      return (
        <div className='detail'>
          <BookDetail id={id} />
        </div>
      )
    } else if (kind === 'movies') {
      return (
        <div className='detail'>
          <MovieDetail id={id} />
        </div>
      )
    } else {
      return (
        <div className='detail'>
          <MusicDetail id={id} />
        </div>
      )
    }
  }
}
