//////////////////////////////////////////////////////////////////////////////////////
//
//  Copyright (c) 2014-present, Egret Technology.
//  All rights reserved.
//  Redistribution and use in source and binary forms, with or without
//  modification, are permitted provided that the following conditions are met:
//
//     * Redistributions of source code must retain the above copyright
//       notice, this list of conditions and the following disclaimer.
//     * Redistributions in binary form must reproduce the above copyright
//       notice, this list of conditions and the following disclaimer in the
//       documentation and/or other materials provided with the distribution.
//     * Neither the name of the Egret nor the
//       names of its contributors may be used to endorse or promote products
//       derived from this software without specific prior written permission.
//
//  THIS SOFTWARE IS PROVIDED BY EGRET AND CONTRIBUTORS "AS IS" AND ANY EXPRESS
//  OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
//  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
//  IN NO EVENT SHALL EGRET AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
//  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
//  LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;LOSS OF USE, DATA,
//  OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
//  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
//  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE,
//  EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
//
//////////////////////////////////////////////////////////////////////////////////////
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Main = (function (_super) {
    __extends(Main, _super);
    function Main() {
        _super.apply(this, arguments);
        this.isThemeLoadEnd = false;
        this.isResourceLoadEnd = false;
        this.isConnect = false;
        /**服务器连接*/
        this.serverConn = new Connection();
    }
    Main.prototype.createChildren = function () {
        _super.prototype.createChildren.call(this);
        //inject the custom material parser
        //注入自定义的素材解析器
        var assetAdapter = new AssetAdapter();
        this.stage.registerImplementation("eui.IAssetAdapter", assetAdapter);
        this.stage.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        //Config loading process interface
        //设置加载进度界面
        this.loadingView = new LoadingUI();
        this.stage.addChild(this.loadingView);
        // initialize the Resource loading library
        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/default.res.json", "resource/");
    };
    /**
     * 配置文件加载完成,开始预加载皮肤主题资源和preload资源组。
     * Loading of configuration file is complete, start to pre-load the theme configuration file and the preload resource group
     */
    Main.prototype.onConfigComplete = function (event) {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        // load skin theme configuration file, you can manually modify the file. And replace the default skin.
        //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
        var theme = new eui.Theme("resource/default.thm.json", this.stage);
        theme.addEventListener(eui.UIEvent.COMPLETE, this.onThemeLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        RES.addEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
        RES.loadGroup("preload");
    };
    /**
     * 主题文件加载完成,开始预加载
     * Loading of theme configuration file is complete, start to pre-load the
     */
    Main.prototype.onThemeLoadComplete = function () {
        this.isThemeLoadEnd = true;
        this.createScene();
    };
    /**
     * preload资源组加载完成
     * preload resource group is loaded
     */
    Main.prototype.onResourceLoadComplete = function (event) {
        if (event.groupName == "preload") {
            this.stage.removeChild(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
            RES.removeEventListener(RES.ResourceEvent.ITEM_LOAD_ERROR, this.onItemLoadError, this);
            this.isResourceLoadEnd = true;
            this.createScene();
        }
    };
    Main.prototype.createScene = function () {
        if (this.isThemeLoadEnd && this.isResourceLoadEnd) {
            this.startCreateScene();
        }
    };
    /**
     * 资源组加载出错
     *  The resource group loading failed
     */
    Main.prototype.onItemLoadError = function (event) {
        console.warn("Url:" + event.resItem.url + " has failed to load");
    };
    /**
     * 资源组加载出错
     * Resource group loading failed
     */
    Main.prototype.onResourceLoadError = function (event) {
        //TODO
        console.warn("Group:" + event.groupName + " has failed to load");
        //忽略加载失败的项目
        //ignore loading failed projects
        this.onResourceLoadComplete(event);
    };
    /**
     * preload资源组加载进度
     * loading process of preload resource
     */
    Main.prototype.onResourceProgress = function (event) {
        if (event.groupName == "preload") {
            this.loadingView.setProgress(event.itemsLoaded, event.itemsTotal);
        }
    };
    /**
     * 创建场景界面
     * Create scene interface
     */
    Main.prototype.startCreateScene = function () {
        //根据name关键字，异步获取一个json配置文件，name属性请参考resources/resource.json配置文件的内容。
        // Get asynchronously a json configuration file according to name keyword. As for the property of name please refer to the configuration file of resources/resource.json.
        // RES.getResAsync("description_json", this.startAnimation, this);
        // this.setHtml();
        this.setIframe();
        // this.setLocalStorage();
        // this.SocketTest();
    };
    /**
     * 在运行html程序的服务上保存文件
    */
    Main.prototype.savefile1 = function () {
    };
    /**
     * 直接打开新的html页面，并且传值
    */
    Main.prototype.setHtml = function () {
        // window.open("data2.html?id=100");//打开新的窗口
        // window.location.href = 'data1.html?id=100';//在本页面刷新，到新的链接
        //打开新页面，直接在body里输入数据
        // var data1Page = window.open("data1.html");
        // data1Page.onload = function () {
        //     data1Page.document.body.innerHTML = "你111111111111"//document.getElementById("fatherWindowTable").outerHTML;
        // }
        // //打开新页面，并且在 body里的 标签 里输入数据
        var data1Page = window.open("data1.html");
        data1Page.onload = function () {
            data1Page.document.getElementById('txt_1').innerHTML = "你111111111111"; //document.getElementById("fatherWindowTable").outerHTML;
        };
        // var newWindowObi = window.open("childWindow.html");
        // newWindowObi.onload = function () {
        //     newWindowObi.document.title = 'childWindowTitle';
        //     newWindowObi.document.getElementById('childWindowId').innerHTML = "你是不是傻呀傻啊啊啊啊啊啊啊啊啊啊啊啊"//document.getElementById("fatherWindowTable").outerHTML;
        // }
    };
    /**
     * 在一个iframe里打开新的html页面，并传值
     */
    Main.prototype.setIframe = function () {
        //  $("<iframe width='150' height='150' id='iframe1' name='iframe1' style='position:absolute;z-index:4;'  frameborder='no' marginheight='0' marginwidth='0' allowTransparency='true'></iframe>").prependTo('body');
        // 	 $("#iframe1").css('left',"100px");
        //    $("#iframe1").css('top',"100px");
        //      $("#iframe1").attr("src", "data1.html");
        var iframe1 = document.createElement('iframe');
        document.body.appendChild(iframe1);
        //iframe.style.visibility = "hidden";
        iframe1.id = "iframe1";
        iframe1.name = "iframe1";
        iframe1.style.position = "absolute";
        iframe1.style.margin = "auto";
        iframe1.style.display = "block";
        iframe1.style.width = "150px";
        iframe1.style.height = "150px";
        iframe1.style.top = "100px";
        iframe1.style.left = "100px";
        iframe1.style.zIndex = "2";
        //js
        iframe1.src = "data1.html";
        iframe1.onload = function () {
            var xx = window.frames[0];
            xx.document.getElementById("txt_1").innerHTML = "你是dom操作";
            $("#txt_2").text("dawwwwwwwww");
        };
        var button1 = new eui.Button();
        button1.label = "获取数据";
        button1.x = 0;
        button1.y = 10;
        this.addChild(button1);
        button1.addEventListener(egret.TouchEvent.TOUCH_TAP, onButtonClick1, this);
        function onButtonClick1(e) {
            $.get("data1.html#txt_1", function (data, status) {
                // alert("数据：" + data + "\n状态：" + status);
                // $("#txt_2").text("dawwwwwwwww");
                var xx = window.frames[0];
                var str = xx.document.getElementById("txt_1").innerHTML;
                alert(str);
            });
        }
        //jq 
        // $("#iframe1").load("data1.html #txt_1","dawdawd", function (responseTxt, statusTxt, xhr) {
        //     if (statusTxt == "success")
        // var o = $(window.frames[0].document).find("#iframe1");
        //         // alert("外部内容加载成功！");
        //         //  $(this).attr("innerHTML","dawdawd");
        //         // $("#test1").text("Hello world!");
        //     if (statusTxt == "error")
        //         alert("Error: " + xhr.status + ": " + xhr.statusText);
        // });
        // $.get("data1.html", function (data, status) {
        //     $("#test1").text("Hello world!");
        // })
    };
    /**
     * 把 数据值 存储到LocalStorage里
    */
    Main.prototype.setLocalStorage = function () {
        var cmd = '{"cmd":"uzwan_login","gameId":"0","from":"guzwan","userId":"3565526"}';
        egret.localStorage.setItem("SKD", cmd);
        var ss = egret.localStorage.getItem("SKD");
    };
    /**
     *  Socket
     */
    Main.prototype.SocketTest = function () {
        //  var cmd = '{"connet:土豆土豆土豆","cmd":"uzwan_login","gameId":"0","from":"guzwan","userId":"3565526"}';
        // this.textfield = new eui.Label();
        // this.textfield.text = cmd;
        // this.textfield.x = 100;
        // this.textfield.y = 100;
        // this.addChild(this.textfield);
        this.setSocket();
        var button1 = new eui.Button();
        button1.label = "连接服务器";
        button1.x = 0;
        button1.y = 10;
        this.addChild(button1);
        button1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick1, this);
        var button2 = new eui.Button();
        button2.label = "发送数据";
        button2.x = 0;
        button2.y = 100;
        this.addChild(button2);
        button2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick2, this);
    };
    Main.prototype.onButtonClick1 = function (e) {
        this.sock.connect("10.10.20.120", 8079); //echo.websocket.org 80  10.10.20.120", 8079  192.168.1.100 127.0.0.1
    };
    Main.prototype.onButtonClick2 = function (e) {
        this.sendMes();
    };
    /**
     * 使用websocket传递数据到服务器
    */
    Main.prototype.setSocket = function () {
        //连接服务器
        //测试1
        this.sock = new egret.WebSocket();
        //设置数据格式为二进制，默认为字符串
        // this.sock.type = egret.WebSocket.TYPE_BINARY;
        //添加收到数据侦听，收到数据会调用此方法
        this.sock.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
        //添加链接打开侦听，连接成功会调用此方法
        this.sock.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
        //添加链接关闭侦听，手动关闭或者服务器关闭连接会调用此方法
        // this.sock.addEventListener(egret.Event.CLOSE, this.onSocketClose, this);
        // //添加异常侦听，出现异常会调用此方法
        // this.sock.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onSocketError, this);
        //连接服务器
        // this.sock.connect("10.10.20.120", 8079);//echo.websocket.org 80
        //测试2
        // this.serverConn.Connection("echo.websocket.org", 80);
        //测试3
        // var sockTest3: WebSocketTest = new WebSocketTest();
    };
    Main.prototype.onReceiveMessage = function (e) {
        var msg = this.sock.readUTF();
        console.log("本地游览器接收到服务器传过来的数据" + msg);
    };
    Main.prototype.onSocketOpen = function () {
        console.log("服务器连接成功");
    };
    Main.prototype.sendMes = function () {
        var cmd = '{"cmd":"uzwan_login","gameId":"0","from":"guzwan","userId":"3565526"}';
        console.log("向服务器发送数据" + cmd);
        this.isConnect = true;
        this.sock.writeUTF(cmd);
        this.sock.flush();
    };
    return Main;
}(eui.UILayer));
//# sourceMappingURL=Main.js.map