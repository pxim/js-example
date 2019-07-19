/**
 * 模块功能：全景展厅
 * author PengXiang
 *
 */
class PanoHall_2 {
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

		///注册事件，需要依次写入事件标识符，注册方法和注册对象。
		egret3d.Input.addEventListener(egret3d.KeyEvent3D.KEY_DOWN, this.OnKeyDown, this);
	}

	public createGameScene() {
		var rootObj: egret3d.Object3D = new egret3d.Object3D();
		this.view.addChild3D(rootObj);

		let loader = new egret3d.QueueLoader();
		loader.addEventListener(egret3d.LoaderEvent3D.LOADER_COMPLETE, (e: egret3d.LoaderEvent3D) => {
			var mesh_hall_01 = new egret3d.Mesh(new egret3d.SphereGeometry(), new egret3d.TextureMaterial(loader.getAsset("resource/3d/pano/pano_01.jpg")));
			rootObj.addChild(mesh_hall_01);
			mesh_hall_01.material.gloss = 1;
			mesh_hall_01.material.ambientColor = 0.5;
			mesh_hall_01.material.cullMode = egret3d.ContextConfig.FRONT;//裁剪正面进行反面渲染
			// mesh_sphere.material.diffuseTexture = loader.getAsset("resource/3d/pano/2.JPG");

			var mesh_arrow_01: egret3d.Mesh = new egret3d.Mesh(new egret3d.PlaneGeometry(40, 30, 2, 2), new egret3d.TextureMaterial(loader.getAsset("resource/2d/arrow_01.png")));
			rootObj.addChild(mesh_arrow_01);
			// var ray = this.view.camera3D.ScreenRayToObject3D(new egret3d.Vector3D(mesh_hall_01.x, mesh_hall_01.y, mesh_hall_01.z));
			// mesh_plane.position=ray;
			mesh_arrow_01.name = "mesh_arrow_01";
			mesh_arrow_01.position = new egret3d.Vector3D(10, -30, 50);
			mesh_arrow_01.scale = new egret3d.Vector3D(0.1, 0.1, 0.1);
			mesh_arrow_01.enablePick = true;
			// mesh_arrow_01.addEventListener(egret3d.PickEvent3D.PICK_CLICK, this.OnPickClick, this);
			mesh_arrow_01.addEventListener(egret3d.PickEvent3D.PICK_DOWN, this.OnPickDown, this);
			mesh_arrow_01.addEventListener(egret3d.PickEvent3D.PICK_UP, this.OnPickUp, this);

			var mesh_viewInfo_01: egret3d.Mesh = new egret3d.Mesh(new egret3d.PlaneGeometry(40, 30, 2, 2), new egret3d.ColorMaterial(0xff00000));
			rootObj.addChild(mesh_viewInfo_01);
			mesh_viewInfo_01.name = "mesh_viewInfo_01";
			mesh_viewInfo_01.position = new egret3d.Vector3D(15, -30, 30);
			mesh_viewInfo_01.scale = new egret3d.Vector3D(0.3, 0.3, 0.3);
			mesh_viewInfo_01.rotation = new egret3d.Vector3D(50, 20, 90);
			mesh_viewInfo_01.enablePick = true;
			mesh_viewInfo_01.pickType = egret3d.PickType.PositionPick;
			mesh_viewInfo_01.addEventListener(egret3d.PickEvent3D.PICK_DOWN, this.OnPickDown, this);
			mesh_viewInfo_01.addEventListener(egret3d.PickEvent3D.PICK_UP, this.OnPickUp, this);

		}, this);
		loader.load("resource/3d/pano/pano_01.jpg");
		loader.load("resource/2d/arrow_01.png");
	}

	///按键按下事件响应,其中e: egret3d.KeyEvent3D会作为参数传递给响应事件。
	public OnKeyDown(e: egret3d.KeyEvent3D) {
		///e.keyCode保存了触发该次事件的按键枚举值，通过转换成字符串可以输出。
		var code = egret3d.KeyCode[e.keyCode];
		console.log("OnKeyDown=>" + code);
		console.log("cameraCtlHover：" + this.cameraCtlHover.distance + "——" + this.cameraCtlHover.tiltAngle + "——" + this.cameraCtlHover.panAngle);
	}

	protected OnPickClick(e: egret3d.PickEvent3D) {
		var mesh: egret3d.Mesh = e.target;
	}

	protected OnPickDown(e: egret3d.PickEvent3D) {
		var _target: egret3d.Mesh = e.target;

		switch (_target.name) {
			case "mesh_arrow_01":
				//  //创建 显示 绘制外线框 pass
				// var pass = new egret3d.OutLinePass();
				// pass.outLineColor = 0xff0000;
				// pass.outLineSize = 0.5;	
				// _target.material.addDiffuseChilderPass(pass); //cube.material.materialData
				_target.material.diffuseColor = 0xff0000;
				break;
		}
	}

	protected OnPickUp(e: egret3d.PickEvent3D) {
		var _target: egret3d.Mesh = e.target;
		console.log(_target.name);
		switch (_target.name) {
			case "mesh_arrow_01":
				_target.material.diffuseColor = 16777215;
				break;
			case "mesh_viewInfo_01":
				this.updataIframeUrl();
				break;
		}
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
		// this.resizeUI();
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
		let w1 = (document.body.clientWidth) / 2 + "px";
		let h1 = (document.body.clientHeight) / 2 + "px";
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
		iframe.id = "iframe1";
		iframe.name = "iframe1";
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

	public updataIframeUrl(_url = "resource/webpage/1/story_html5.html")
	{
		this._iframe.src = _url;
		this._iframe.style.visibility = "visible";
		this._iframe.onload = function () {
		var xx = window.frames[0];
		// xx.document.getElementById("txt_1").innerHTML = self.txt_info.text;
		parent.window.document.getElementById("iframe1").style.visibility = "hidden";
		}
	}
	//————————————————————————————————————————————————————————————添加iframe——结束——————————————————————————————————————————————————————————————————————————//

	protected update(e: egret3d.Event3D) {
		this.cameraCtlHover.update();
	}
}