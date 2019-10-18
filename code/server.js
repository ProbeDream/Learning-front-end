const url = require("url");
const http = require("http");
const fs = require("fs");
const port = process.argv[2];

if (!port) {
    console.log(`请指定对应的端口\n node server.js 8888 比如这样!`);
}
let server = http.createServer((request,response)=>{
    let parsedUrl = url.parse(request.url,true);
    let pathWithQuery = request.url;
    let queryString = ``;
    if(pathWithQuery.indexOf("?")>=0){
        queryString = pathWithQuery.subSring(pathWithQuery.indexOf("?"));
    }
    let path = parsedUrl.pathname;
    let query = parsedUrl.query;
    let method = parsedUrl.method;
    console.log(`发请求过来的人,路径和查询参数为${pathWithQuery}`);
    if (path === "/") {
        response.statusCode = 200;
        response.setHeader("Content-Type","text/html;charset=utf-8");
        response.write("ProbeDream");
        response.end();
    } else if(path === "/x"){
        response.statusCode = 200;
        response.setHeader("Content-Type","text/html;charset=utf-8");
        response.write("body{color:red;}")
        response.end();
    }else {
        response.statusCode = 404;
        response.setHeader("Content-Type","text/html;charset=utf-8");
        response.write("你输入的路径不存在对应的内容!");
        response.end();
    }
});
server.listen(port);
console.log(`监听${port}成功\n 请使用浏览器打开该网址 http://localhost:${port}`);

