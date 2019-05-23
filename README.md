# 从零开始开发自己的口袋豆瓣


如今身兼十八般武艺的你，急需一场实战来验证这段时间的修炼成果。接下来下面将面临人生中的最艰难的一个任务：**实现口袋豆瓣应用**。


## 项目说明
本项目我们来开发一个叫 ***口袋豆瓣*** 的应用，从名字中可以知道，该应用是和豆瓣相关的。在豆瓣应用我们可以获取（或者搜索获取）到豆瓣的图书，电影，音乐列表以及相关的详情信息，具体效果图如下：

![](http://coding.imweb.io/img/p7/douban-demo.gif)

## 具体要求

1. 需要使用 `React` + `ES6` 来开发项目对于你们来说，这是一种新的开发方式。需要完成下面的功能：
    - 列表页展示
    - 底部 Tab 切换类别
    - 顶部搜索框功能
    - 点击 item 展示详情页
    - 返回列表页等功能。

2. 拉取豆瓣上的数据
3. 管理代码规范：[standard](https://standardjs.com/)
4. 本应用的交互和设计不严格要求大家可以自由发挥，开发出属于自己的应用

## 1. 具体功能介绍
### 1.1 列表展示
共有三种不同类型的列表（图示-电影-音乐），每一个列表需要展示至少一页的内容。


图书列表：

![](http://coding.imweb.io/img/p7/book-list.png)

电影列表：

![](http://coding.imweb.io/img/p7/movie-list.png)

音乐列表：

![](http://coding.imweb.io/img/p7/music-list.png)

### 1.2 底部导航
底部常驻导航栏，点击可切换不同类型，控制列表展示相应的内容。

![](http://coding.imweb.io/img/p7/navbar.png)

### 1.3 顶部搜索
顶部搜索框，输入内容点击搜索后，会在当前类别进行搜索出相关内容

![](http://coding.imweb.io/img/p7/search.png)

### 1.4 内容详情
点击列表中的每一项可以进入内容详情，点击左上角可返回

图书详情：

![](http://coding.imweb.io/img/p7/book-detail.png)

电影详情：

![](http://coding.imweb.io/img/p7/movie-detail.png)

音乐详情：

![](http://coding.imweb.io/img/p7/music-detail.png)


## 2. 通过JSONP 拉取豆瓣数据
### 豆瓣接口说明
豆瓣开发者网站有许多接口的说明文档，大家需要根据看豆瓣文档中接口的数据格式说明来进行开发页面。本应用涉及的接口文档如下：

2019-05-10更新：由于豆瓣开发者平台逐渐下架相关文档以及接口的访问权限，现通过平台接口提供数据访问服务，具体接口以及使用样例请查看以下文档的内容。
使用豆瓣 API 接口，涉及到跨域问题，大家可通过 `JSONP` 方式解决。建议大家使用下面的 JSONP 拉取组件（React 体系中不建议 jQuery）：
- [fetch-jsonp](https://github.com/camsong/fetch-jsonp)

### 图书相关
- 拉取图书列表和搜索图书列表可使用下面的接口:

  http://git.imweb.io/imweb-teacher/douban-api/blob/master/book.md

### 音乐相关
- 拉取音乐列表和搜索音乐列表可使用下面的接口:

  http://git.imweb.io/imweb-teacher/douban-api/blob/master/music.md

### 电影相关
由于拉取电影列表接口有点特殊，涉及接口需要有两条：
- 【拉取电影 top 250 列表】

  http://git.imweb.io/imweb-teacher/douban-api/blob/master/movie_top.md
- 【搜索电影】

  http://git.imweb.io/imweb-teacher/douban-api/blob/master/movie.md


**注意：豆瓣 API 有权限和访问次数限制，单个 ip 限制每个小时 150 次，这个问题大家可查看[这里](https://developers.douban.com/wiki/?title=api_v2)的说明。因此建议大家在开发时把拉取到的数据存到本地，避免超过次数。**


## Standard
为了更好的管理我们的代码，我们需要有相应的代码规范管理工具。这里需要大家学习使用 `Standard` 来管理 JavaScript 的代码规范。

- [Standard 文档](https://standardjs.com/)
- [Standard - github 仓库](https://github.com/standard/standard)


## 待完成
- 列表页实现**下拉刷新**以及**拉到底部加载更多**的功能

