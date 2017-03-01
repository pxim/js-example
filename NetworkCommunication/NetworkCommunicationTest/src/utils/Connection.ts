/**
 *
 * @author 
 *
 */
class Connection extends egret.Sprite{
    /**网络套接字对象*/
    private webSocket:egret.WebSocket;
    /**是否已连接了服务器*/
    private isConnection: boolean = false;
     
        public constructor() {
        super();
        }
        /**
         * 连接至服务器
         * sc:地址
         * d:端口
         * */
    public Connection(sc: string,d: number): void {
        if(this.isConnection){
            console.log("已有连接，勿重复");
            this.messageEvent("已有连接，勿重复");
            return;
        }
        /**
        * 简单注解：
        * 首先，创建一个 代表本次连接的唯一的 套接字。
        * 然后，侦听 套接字 有没有 连接到 服务器。
        * 再后，侦听 套接字 有没有 收到 服务器返回的数据。
        * 最后，用 套接字 尝试连接至 服务器。（本地的“功能”都准备完毕后，就可以去尝试连接服务器了）
        */
                 
        //1
        //new一个套接字（唯一的连接标识）
        this.webSocket = new egret.WebSocket();
        //2
        //侦听 套接字 跟 服务器 的 连接事件（如果检测到 连接至服务器成功了，就 转向 成功后要执行的子程序 onSocketOpen）
        this.webSocket.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
        //3
        //侦听 套接字 的 收到数据事件（如果检测到 服务器返回了数据，就 转向 收到数据后要执行的子程序 onReceiveMessage）
        this.webSocket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
        //4
        //用 套接字 去尝试连接至 服务器（服务器地址：echo.websocket.org  服务器端口：80）
        this.webSocket.connect(sc, d);
    }
    /**跟 服务器连接成功后 执行的子程序*/
    private onSocketOpen():void {
        this.isConnection = true;
        console.log("连接至服务器成功");
        this.messageEvent("连接至服务器成功");

		this.sendData("123");
		
    }
    /**收到 服务器发来数据 后 执行的子程序*/
    private onReceiveMessage(e:egret.Event):void {
        var msg = this.webSocket.readUTF();
        console.log("收到数据：" + msg);
        this.messageEvent(msg);
    }
     
    /**向 服务器 发送数据*/
    public sendData(cmd:string):void{
        if(!this.isConnection){
            console.log("尚未建立连接");
            this.messageEvent("尚未建立连接");
            return;
        }
        this.webSocket.writeUTF(cmd);
        this.webSocket.flush();
    }
     
    /**调度事件 利用自定义事件类DateEvent.ts 在各类之间传递消息内容*/
    private messageEvent(msg:string):void{
        //生成约会事件对象
        // var daterEvent:DateEvent = new DateEvent(DateEvent.DATE);
        //添加对应的约会信息
        // daterEvent.testTxt = msg;
        //发送要求事件
        // this.dispatchEvent(daterEvent);
    }
}