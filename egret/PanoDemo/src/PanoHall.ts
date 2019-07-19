/**
 * 模块功能：全景展厅
 * author PengXiang
 *
 */
class PanoHall {
	// View3D操作对象
	protected view: egret3d.View3D;

	protected lightGroup: egret3d.LightGroup;

    /**
    * look at 摄像机控制器 。</p>
    * 指定摄像机看向的目标对象。</p>
    * 1.按下鼠标左键并移动鼠标可以使摄像机绕着目标进行旋转。</p>
    * 2.按下键盘的(w s a d) 可以摄像机(上 下 左 右)移动。</p>
    * 3.滑动鼠标滚轮可以控制摄像机的视距。</p>
    */
	// private cameraCtl: egret3d.LookAtController;
	private cameraCtlHover: egret3d.HoverController;
	public constructor(context3d: egret3d.Egret3DCanvas) {
		var view = new egret3d.View3D(0, (context3d.height - context3d.width) / 2, context3d.width, context3d.width);
		view.camera3D.lookAt(new egret3d.Vector3D(0, 1000, 0), new egret3d.Vector3D(0, 0, 0), egret3d.Vector3D.Y_AXIS);

		view.backColor = 0xff181818;
		context3d.addView3D(view);
		this.view = view;

		// this.cameraCtl = new egret3d.LookAtController(view.camera3D, new egret3d.Object3D());
		// this.cameraCtl.lookAtObject.y = 100;
		// this.cameraCtl.distance = 500;
		// this.cameraCtl.rotationX = 30;
		// this.cameraCtl.rotationY = 180;
		this.view.camera3D.position = new egret3d.Vector3D(10, 100, 10);
		this.cameraCtlHover = new egret3d.HoverController(this.view.camera3D, new egret3d.Object3D());
		this.cameraCtlHover.steps = 12;
		this.cameraCtlHover.distance = 50;
		this.cameraCtlHover.tiltAngle = 0;
		context3d.addEventListener(egret3d.Event3D.ENTER_FRAME, this.update, this);
		window.addEventListener("resize", () => this.resize());
		this.initIframe();

		egret3d.Input.addEventListener(egret3d.KeyEvent3D.KEY_DOWN, this.OnKeyDown, this);
	}

	public createGameScene() {
		var rootObj: egret3d.Object3D = new egret3d.Object3D();
		this.view.addChild3D(rootObj);

		new Room_01(rootObj,this.view.camera3D);
		// new Room_02(rootObj,this.view.camera3D);
		rootObj.addEventListener("goto_scene", (e: egret3d.Event3D) => {
			var target = e.target;
			switch (e.data) {
				case 1:
					rootObj.removeAllChild();
					new Room_02(rootObj,this.view.camera3D);
					break;
				case 2:
					rootObj.removeAllChild();
					new Room_01(rootObj,this.view.camera3D);
					break;
			}
		}, this);

		rootObj.addEventListener("load_infoPage",(e: egret3d.Event3D) => {
			this.updataIframeUrl(e.data);
		},this);
	}

	public OnKeyDown(e: egret3d.KeyEvent3D) {
		///e.keyCode保存了触发该次事件的按键枚举值，通过转换成字符串可以输出。
		var code = egret3d.KeyCode[e.keyCode];
		console.log("OnKeyDown=>" + code);
		console.log("cameraCtlHover：" + this.cameraCtlHover.distance + "——" + this.cameraCtlHover.tiltAngle + "——" + this.cameraCtlHover.panAngle);
	}

	//————————————————————————————————————————————————————————————适配——开始————————————————————————————————————————————————————————————————————————————————//
	protected _removeID: number = -1;
	private _resizeTime: number = -1;
	protected resize() {
		if (this._resizeTime == -1) {
			this._resizeTime = setTimeout(() => this.setResize(), 300);
		}
	}

	private setResize() {
		clearTimeout(this._resizeTime);
		this._resizeTime = -1;
		this.onResize(0, 0, document.body.clientWidth, document.body.clientHeight);
		this.resizeUI();
	}

	private onResize(x: number, y: number, width: number, height: number) {
		//  this.view.resize(x,y,width,height);
		this.view.x = x;
		this.view.y = y;
		this.view.width = width;
		this.view.height = height;

	}
	//————————————————————————————————————————————————————————————适配——结束————————————————————————————————————————————————————————————————————————————————//

	//————————————————————————————————————————————————————————————添加iframe——开始——————————————————————————————————————————————————————————————————————————//
	private _iframe;
	private initIframe() {
		let w1 = document.body.clientWidth + "px";
		let h1 = document.body.clientHeight + "px";
		var iframeBox = document.createElement("div");
		iframeBox.id = "iframeBox";
		// mask.style.position = "absolute";
		// mask.style.width = "100%";
		// mask.style.height = "100%";
		// mask.style.backgroundColor = "#545454";
		// mask.style.zIndex = '100';
		document.body.appendChild(iframeBox)

		let iframe = document.createElement("iframe");
		iframe.style.visibility = "hidden";
		iframe.id = "iframeInfoPage";
		iframe.name = "iframeInfoPage";
		iframe.style.position = "absolute";
		iframe.style.margin = "auto";
		iframe.style.display = "block";

		iframe.style.width = w1;
		iframe.style.height = h1;
		iframe.style.top = "0px";
		iframe.style.left = "0px";
		iframe.style.zIndex = "2";
		iframe.frameBorder = "no";
		iframe.border = "0";
		iframe.marginWidth = "0";
		iframe.marginHeight = "0";
		iframe.scrolling = "no";
		// iframe.align = "center";

		iframeBox.appendChild(iframe);
		this._iframe = iframe;
	}

	private resizeUI() {
		let iframe = document.getElementById("iframeInfoPage");
		iframe.style.top = "0px";
		iframe.style.left = "0px";
		iframe.style.width = this.view.width + "px";
		iframe.style.height = this.view.height + "px";
		// iframe.style.width =  document.body.clientWidth + "px";
		// iframe.style.height =  document.body.clientHeight + "px";
	}

	public updataIframeUrl(_url) {
		this._iframe.src = _url;
		this._iframe.style.visibility = "visible";
		this._iframe.onload = function () {
			var xx = window.frames[0];
			// xx.document.getElementById("txt_1").innerHTML = self.txt_info.text;
			// parent.window.document.getElementById("iframeInfoPage").style.visibility = "hidden";
		}
	}
	//————————————————————————————————————————————————————————————添加iframe——结束——————————————————————————————————————————————————————————————————————————//

	protected update(e: egret3d.Event3D) {
		this.cameraCtlHover.update();
	}
}