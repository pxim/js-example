/**
 * Created by pengxiang on 2017/7/14.
 * 功能：使用connect模块，建立的静态服务器，解决了静态资源访问问题
 */

var connect = require("connect");
 var serveStatic = require("serve-static");
var open = require("open");


 var app = connect();
 // app.use(serveStatic("C:\\xxx\\xxx\\xxx\\项目文件夹"));
 app.use(serveStatic("public"));

 app.listen(1336);
 console.log('Server running at http://127.0.0.1:1336/');

open("http://127.0.0.1:1336/");
// open("http://www.google.com", "firefox");