const http = require("http");
const fs = require("fs");
const urlLib = require("url");
const querystring = require("querystring");

let server = http.createServer(function (req,res) {
    //GET
    let reqInfo = urlLib.parse(req.url,true);
    let url = reqInfo.pathname;
    const GET = reqInfo.query;
    //POST
    let str = "";
    req.on("data",function (data) {
        str += data;
    })
    
    req.on("end",function (data) {
        const POST = querystring.parse(str);
        console.log(url,GET,POST);
    })
    //文件请求
    let file_name = "./www" + req.url;
    fs.readFile(file_name,function (err,data) {
        if (err){
            res.write("404");
        }else {
            res.write(data)
        }
        res.end();
    })
});

server.listen(8080);