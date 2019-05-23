/*
  处理音乐、图书和电影的数据请求
*/

import fetchJsonp from 'fetch-jsonp'
// http://sas.qq.com/cgi-bin/db/data?t=["ke_coding_book"]&q=${keyword}&count=${page}

const configs = {
  'books':fetchBooks,
  'movies':'',
  'musics':''
} 

async function fetchBooks (keyword, page) {
  try {
    let response = await fetchJsonp(`http://sas.qq.com/cgi-bin/db/data?t=["ke_coding_book"]&q={ke_coding_book(_page:${page},_limit:10,title:"%25${keyword}%25"){id,title,rating{max,numRaters,average,min},subtitle,author,pubdate,tags{count,name,title},origin_title,image,binding,translator,catalog,pages,images{small,large,medium},alt,publisher,isbn10,isbn13,url,alt_title,author_intro,summary,price,ebook_price,ebook_url,series{id,title}}}`)
    let json = await response.json()
    return json.result
  } catch (err) {
    console.error(err)
  }
}

async function fetchMovies (url) {
  try {
    let res = await fetchJsonp(`${url}`)
    let json = await res.json()
    return json.result
  } catch (err) {
    console.error(err)
  }
}
// https://api.douban.com/v2/music/search?q=${keyword}&count=${page}
async function fetchMusics (keyword, page) {
  try {
    let res = await fetchJsonp(`http://sas.qq.com/cgi-bin/db/data?t=["ke_coding_music"]&q={ke_coding_music(_page:${page},_limit:10,title:"%25${keyword}%25"){id,title,alt,rating{max,average,numRaters,min},author{name},alt_title,image,tags{count,name},mobile_link,attrs{publisher,singer,version,pubdate,title,media,tracks,discs}}}`)
    let json = await res.json()
    return json.result
  } catch (err) {
    console.error(err)
  }
}


/* async function getInfo (kind, id) {
  try {
    let res = await fetchJsonp(`${url}${id}`)
    let json = await res.json()
    return json
  } catch (err) {
    console.error(err)
  }
} */

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
