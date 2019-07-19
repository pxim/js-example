
var express = require('express');
var app = express();
var fs = require("fs");
var path = require('path');

var bodyParser = require('body-parser');
var multer  = require('multer');

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ dest: '/tmp/'}).array('image'));

app.get('/', function (req, res) {
    res.sendFile( __dirname + "/" + "index.html" );
});

app.get('/index.html', function (req, res) {
    res.sendFile( __dirname + "/" + "index.html" );
});

app.post('/upload_file', function (req, res) {
    console.log(req.files[0]);  // 上传的文件信息
    var _file = req.files[0];
 //   var _path = path.resolve(__dirname, '../web/res/data');  //这句是改变目录句柄，相当于 cd
    // var des_file = path + "/" + req.files[0].originalname;
    var _path = __dirname + '/res';
    var des_file = _path + "/" + _file.originalname;
    fs.readFile( _file.path, function (err, data) {
        fs.writeFile(des_file, data, function (err) {
            if( err ){
                console.log( err );
            }else{
                response = {
                    message:'File uploaded successfully',
                    filename:_file.originalname
                };
            }
            console.log( response );
            res.end( JSON.stringify( response ) );
        });
    });
});

var server = app.listen(8089,"127.0.0.1", function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("应用实例，访问地址为 http://%s:%s", host, port);
});
