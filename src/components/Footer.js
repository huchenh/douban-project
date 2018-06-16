import React, { Component } from 'react';
import {Link} from 'react-router';
export default class Footer extends Component {
  render() {
    return (
      <footer className="m_footer">
    
        <div className="tabs">
          <Link to="/books" className="tab_item" activeClassName="active" onlyActiveOnIndex={true}>
            <i className="iconfont icon-tushu f_icon"></i>
            <span className="icon_text">图书</span>
          </Link>
          <Link to="/movies" className="tab_item" activeClassName="active">
            <i className="iconfont icon-dianying f_icon"></i>
            <span className="icon_text">电影</span>
          </Link>
          <Link to="/musics" className="tab_item" activeClassName="active">
            <i className="iconfont icon-14 f_icon"></i>
            <span className="icon_text">音乐</span>
          </Link>
        </div>
      </footer>
    )
  }
}