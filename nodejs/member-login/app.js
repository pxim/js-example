
var express = require("express");
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var multer = require('multer');
var session = require('express-session');

app.use(express.static(require('path').join(__dirname, 'public')));
app.use(express.static(require('path').join(__dirname, 'views')));
// 设定views变量，意为视图存放的目录
app.set('views', (__dirname + "/views"));
// app.set('views', __dirname);
// 修改模板文件的后缀名为html
app.set( 'view engine', 'html' );
// 运行ejs模块
app.engine( '.html', require( 'ejs' ).__express );

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());

app.use(session({
    secret:'secret',
    resave:true,
    saveUninitialized:false,
    cookie:{
        maxAge:1000*60*10  //过期时间设置(单位毫秒)
    }
}));

app.use(function(req, res, next){
    res.locals.user = req.session.user;
    var err = req.session.error;
    res.locals.message = '';
    if (err) res.locals.message = '<div style="margin-bottom: 20px;color:red;">' + err + '</div>';
    next();
});

// require('./views/login')(app);
// require('./views/home')(app);
// require('./views/logout')(app);

// app.all("*", function(request, response, next) {
//     response.writeHead(200, { "Content-Type": "text/html;charset=utf-8" });      //设置响应头属性值
//     next();
// });

app.get("/", function(req, res) {
    console.log(req.host,res.path); //res.send("req.host获取主机名，req.path获取请求路径名!");
    res.render('index');
});

app.get('/index', function(req, res) {
    res.render('index');
});

app.get("/login", function (req,res) {
    res.render('login');
    // res.redirect("/views/login");
});

app.get('/home',function(req,res){
    if(req.session.user){
        res.render('home');
    }else{
        req.session.error = "请先登录"
        res.redirect('login');
    }
});

app.get('/logout', function(req, res){
    req.session.user = null;
    req.session.error = null;
    res.redirect('index');
});


// // app.get("*", function(request, response) {
// //     response.end("404 - 未找到!");
// // });

app.post("/login", function (req,res) {
    var user={
        username:'admin',
        password:'admin'
    }
    if(req.body.username==user.username&&req.body.password==user.password){
        req.session.user = user;
        res.send(200);
    }else{
        req.session.error = "用户名或密码不正确";
        res.send( 404 );
    }
});

var server = app.listen(8083, "127.0.0.1",function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log("Server running at http://%s:%s", host, port)
});




