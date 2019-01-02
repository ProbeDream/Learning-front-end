var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if (!port) {
  console.log('请指定端口号？\nnode server.js 1024 这样不会吗？')
  process.exit(1)
}x
//给定一个函数 创建服务器!
var server = http.createServer(function (request, response) {
  var parsedUrl = url.parse(request.url, true)
  var path = request.url
  var query = ''
  if (path.indexOf('?') >= 0) { query = path.substring(path.indexOf('?')) }
  var pathNoQuery = parsedUrl.pathname //解析URL中的path名
  var queryObject = parsedUrl.query    //解析URL中的查询    
  var method = request.method //拿到请求中的方法 常用方法get or post

  console.log('HTTP 路径为\n' + path)
  if (path == '/') {
    //当请求的是/的请求路径的时候,将其内容类型设置为HTML文件! 
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write('<!DOCTYPE>\n<html>' +
      '<head><link rel="stylesheet" href="/style.css">' +
      '</head><body>' +
      '<h1>你好 ProbeDream!</h1>' +
      '<script src="/main.js"></script>' +
      '</body></html>')
    response.end()
  } else if (path == '/style.css') {
    /**设置什么内容的类型 通过setHeader方法设置Content-Type类型 一般的话分为三种 text/css text/javascript text/html**/
    //当请求的是style.css的请求路径时候 将其内容类型设置为css文件
    response.setHeader('Content-Type', 'text/css;charset=utf-8')
    response.write('body{background-color: #ddd;}h1{color: red;}')
    response.end()
  } else if (path == '/main.js') {
    //当请求时main.js的时候请求路径的时候,将其内容类型设置为javaScript文件!
    response.setHeader('Content-Type', 'text/javascript;charset=utf-8')
    response.write('alert("这是javaScript执行的")')
    response.end()
  } else {
    response.statusCode = 404 //设置状态吗
    response.end() //响应结束
  }

})

server.listen(port) //服务器监听端口!
console.log('ProbeDream监听端口' + port + ' 成功\n请仔细查看Server.js源码 http://localhost:' + port)