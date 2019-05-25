/*
  处理音乐、图书和电影的数据请求
*/

import fetchJsonp from 'fetch-jsonp'
// http://sas.qq.com/cgi-bin/db/data?t=["ke_coding_book"]&q=${keyword}&count=${page}

const configs = {
  'books':fetchBooks,
  'movies':fetchMovies,
  'musics':fetchMusics
} 

async function fetchBooks (keyword, page,id?) {
  let url = `http://sas.qq.com/cgi-bin/db/data?t=["ke_coding_book"]&q={ke_coding_book(_page:${page},_limit:10,title:"%25${keyword}%25"){id,title,rating{max,numRaters,average,min},subtitle,author,pubdate,tags{count,name,title},origin_title,image,binding,translator,catalog,pages,images{small,large,medium},alt,publisher,isbn10,isbn13,url,alt_title,author_intro,summary,price,ebook_price,ebook_url,series{id,title}}}`
  if(id){
    url = `http://sas.qq.com/cgi-bin/db/data?t=["ke_coding_book"]&q={ke_coding_book(_page:${page},_limit:10,title:"%25${keyword}%25",id:"${id}"){id,title,rating{max,numRaters,average,min},subtitle,author,pubdate,tags{count,name,title},origin_title,image,binding,translator,catalog,pages,images{small,large,medium},alt,publisher,isbn10,isbn13,url,alt_title,author_intro,summary,price,ebook_price,ebook_url,series{id,title}}}`
  }
  try {
    let response = await fetchJsonp(url)
    let json = await response.json()
    return json.result
  } catch (err) {
    console.error(err)
  }
}

/* async function fetchMovies (url) {
  try {
    let res = await fetchJsonp(`${url}`)
    let json = await res.json()
    return json.result
  } catch (err) {
    console.error(err)
  }
} */

async function fetchMovies (keyword, page,id?) {
  let url = `http://sas.qq.com/cgi-bin/db/data?t=["ke_coding_movie"]&q={ke_coding_movie(_page:${page},_limit:10,title:"%25${keyword}%25"){id,title,rating{max,average,stars,min,details{score_1,score_2,score_3,score_4,score_5}},genres,casts{alt,avatars{small,large,medium},name,name_en,id},durations,mainland_pubdate,pubdates,has_video,collect_count,original_title,subtype,directors{alt,avatars{small,large,medium},name,id},year,images{small,large,medium},alt}}`
  if(id){
    url = `http://sas.qq.com/cgi-bin/db/data?t=["ke_coding_movie"]&q={ke_coding_movie(_page:${page},_limit:10,title:"%25${keyword}%25",id:"${id}"){id,title,rating{max,average,stars,min,details{score_1,score_2,score_3,score_4,score_5}},genres,casts{alt,avatars{small,large,medium},name,name_en,id},durations,mainland_pubdate,pubdates,has_video,collect_count,original_title,subtype,directors{alt,avatars{small,large,medium},name,id},year,images{small,large,medium},alt}}`
  }
  try {
    let res = await fetchJsonp(url)
    let json = await res.json()
    return json.result
  } catch (err) {
    console.error(err)
  }
} 

// https://api.douban.com/v2/music/search?q=${keyword}&count=${page}
async function fetchMusics (keyword, page,id?) {
  let url = `http://sas.qq.com/cgi-bin/db/data?t=["ke_coding_music"]&q={ke_coding_music(_page:${page},_limit:10,title:"%25${keyword}%25"){id,title,alt,rating{max,average,numRaters,min},author{name},alt_title,image,tags{count,name},mobile_link,attrs{publisher,singer,version,pubdate,title,media,tracks,discs}}}`
  if(id){
    url = `http://sas.qq.com/cgi-bin/db/data?t=["ke_coding_music"]&q={ke_coding_music(_page:${page},_limit:10,title:"%25${keyword}%25",id:"${id}"){id,title,alt,rating{max,average,numRaters,min},author{name},alt_title,image,tags{count,name},mobile_link,attrs{publisher,singer,version,pubdate,title,media,tracks,discs}}}`
  }
  try {
    let res = await fetchJsonp(url)
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

async function getInfo (kind, keyword,page,id) {
  const fetchKind = configs[kind]
  try {
    // let res = await fetchJsonp(`${url}${id}`)
    // let json = await res.json()
    const json = await fetchKind(keyword,page,id)
    return json[0]
  } catch (err) {
    console.error(err)
  }
}

export { fetchBooks, fetchMovies, fetchMusics, getInfo }
