import React, { Component } from 'react';
import {
    Router,
    Route,
    Link,
    hashHistory
} from 'react-router'
import './style.css';
import BookIndex from './components/bookIndex';
import MovieIndex from './components/movieIndex';
import MusicIndex from './components/musicIndex'
import DetailIndex from './components/detail/detailIndex';
class App extends Component {
    render() {
        return (
         
                <Router history={hashHistory}>
                    <div>
                        <Route path="/" component={BookIndex}></Route>
                        <Route path="/books" component={BookIndex}>
                        </Route>
                        <Route path="/detail/:data" component={DetailIndex}/>
                        <Route path="/movies" component={MovieIndex}></Route>
                        <Route path="/musics" component={MusicIndex}></Route>
                    </div>
                 </Router>
            

        );
    }
}

module.exports = App;


