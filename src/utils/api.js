/*
  处理音乐、图书和电影的数据请求
*/
import fetchJsonp from 'fetch-jsonp'
async function fetchBooks (keyword, page) {
  try {
    let response = await fetchJsonp(`https://api.douban.com/v2/book/search?q=${keyword}&count=${page}`)
    let json = response.json()
    return json
  } catch (err) {
    console.error(err)
  }
}

async function fetchMovies (url, page) {
  try {
    let res = await fetchJsonp(`${url}count=${page}`)
    let json = res.json()
    return json
  } catch (err) {
    console.error(err)
  }
}

async function fetchMusics (keyword, page) {
  try {
    let res = await fetchJsonp(`https://api.douban.com/v2/music/search?q=${keyword}&count=${page}`)
    let json = await res.json()
    return json
  } catch (err) {
    console.error(err)
  }
}

async function getInfo (url, id) {
  try {
    let res = await fetchJsonp(`${url}${id}`)
    let json = await res.json()
    return json
  } catch (err) {
    console.error(err)
  }
}

export { fetchBooks, fetchMovies, fetchMusics, getInfo }
