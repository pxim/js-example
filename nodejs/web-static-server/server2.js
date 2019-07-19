 var connect = require("connect");
 var serveStatic = require("serve-static");

 var app = connect();
 // app.use(serveStatic("C:\\xxx\\xxx\\xxx\\项目文件夹"));
 app.use(serveStatic("public"));

 app.listen(1337);
 console.log('Server running at http://127.0.0.1:1337/');