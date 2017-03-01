var WebSocketTest = (function () {
    function WebSocketTest() {
        this.initData();
    }
    var d = __define,c=WebSocketTest,p=c.prototype;
    p.initData = function () {
        this.socket = new egret.WebSocket();
        //设置数据格式为二进制，默认为字符串
        this.socket.type = egret.WebSocket.TYPE_BINARY;
        //添加收到数据侦听，收到数据会调用此方法
        this.socket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
        //添加链接打开侦听，连接成功会调用此方法
        this.socket.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
        //添加链接关闭侦听，手动关闭或者服务器关闭连接会调用此方法
        this.socket.addEventListener(egret.Event.CLOSE, this.onSocketClose, this);
        //添加异常侦听，出现异常会调用此方法
        this.socket.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onSocketError, this);
        //连接服务器
        this.socket.connect("echo.websocket.org", 80);
    };
    p.onSocketOpen = function () {
        var byte = new egret.ByteArray();
        byte.writeUTF("Hello Egret WebSocket");
        byte.writeBoolean(false);
        byte.writeInt(123);
        byte.position = 0;
        this.socket.writeBytes(byte, 0, byte.bytesAvailable);
        this.socket.flush();
        console.log("连接服务器成功，向服务器发送数据：" + byte);
    };
    p.onReceiveMessage = function (e) {
        var byte = new egret.ByteArray();
        this.socket.readBytes(byte);
        var msg = byte.readUTF();
        var boo = byte.readBoolean();
        var num = byte.readInt();
        console.log("本地游览器接，收到服务器传过来的数据：" + byte);
    };
    p.onSocketClose = function () {
        console.log("手动关闭或者服务器；关闭连接");
    };
    p.onSocketError = function () {
        console.log("服务器连接异常");
    };
    return WebSocketTest;
}());
egret.registerClass(WebSocketTest,'WebSocketTest');
