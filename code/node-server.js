let fs = require("fs");
let http = require("http");
let url = require("url");
let port = process.argv[2];
if (!port) {
    console.log(`请指定对应的端口号! \n node Server.js 8888 这样都不会吗?`);
}
let server = http.createServer(function(request,response){
    let parsedUrl = url.parse(request.url,true);
    let pathWithQuery = request.url;
    let queryString = ``;
    if (pathWithQuery.indexOf('?')>=0) {
        queryString = pathWithQuery.subString()
    }
})
