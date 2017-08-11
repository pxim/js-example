class Room_01 {
	private _rootObj;
	public constructor(rootObj,camera3D) {
		this.createGameScene(rootObj,camera3D);
		this._rootObj = rootObj;
	}

	public createGameScene(rootObj,camera3D) {
		// var rootObj: egret3d.Object3D = new egret3d.Object3D();
		// this.view.addChild3D(rootObj);

		let loader = new egret3d.QueueLoader();
		loader.addEventListener(egret3d.LoaderEvent3D.LOADER_COMPLETE, (e: egret3d.LoaderEvent3D) => {
			// var mesh_hall_01 = new egret3d.Mesh(new egret3d.SphereGeometry(), new egret3d.TextureMaterial(loader.getAsset("resource/3d/pano/pano_01.jpg")));
			// rootObj.addChild(mesh_hall_01);
			// mesh_hall_01.material.gloss = 1;
			// mesh_hall_01.material.ambientColor = 1;
			// mesh_hall_01.material.cullMode = egret3d.ContextConfig.FRONT;//裁剪正面进行反面渲染
			// mesh_hall_01.material.refraction = 1;

			var room_01 = new egret3d.Sky(new egret3d.SphereGeometry(1000, 100, 100), new egret3d.TextureMaterial(loader.getAsset("resource/3d/pano/pano_01.jpg")), camera3D);
			room_01.material.cullMode = egret3d.ContextConfig.FRONT;
			rootObj.addChild(room_01);

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

			var mesh_infoPage_01: egret3d.Mesh = new egret3d.Mesh(new egret3d.PlaneGeometry(40, 30, 2, 2), new egret3d.ColorMaterial(0xff00000));
			rootObj.addChild(mesh_infoPage_01);
			mesh_infoPage_01.name = "mesh_infoPage_01";
			mesh_infoPage_01.position = new egret3d.Vector3D(15, -30, 30);
			mesh_infoPage_01.scale = new egret3d.Vector3D(0.3, 0.3, 0.3);
			mesh_infoPage_01.rotation = new egret3d.Vector3D(50, 20, 90);
			mesh_infoPage_01.enablePick = true;
			mesh_infoPage_01.pickType = egret3d.PickType.PositionPick;
			mesh_infoPage_01.addEventListener(egret3d.PickEvent3D.PICK_DOWN, this.OnPickDown, this);
			mesh_infoPage_01.addEventListener(egret3d.PickEvent3D.PICK_UP, this.OnPickUp, this);

		}, this);
		loader.load("resource/3d/pano/pano_01.jpg");
		loader.load("resource/2d/arrow_01.png");
	}

	///按键按下事件响应,其中e: egret3d.KeyEvent3D会作为参数传递给响应事件。
	public OnKeyDown(e: egret3d.KeyEvent3D) {
		///e.keyCode保存了触发该次事件的按键枚举值，通过转换成字符串可以输出。
		var code = egret3d.KeyCode[e.keyCode];
		console.log("OnKeyDown=>" + code);
		// console.log("cameraCtlHover：" + this.cameraCtlHover.distance + "——" + this.cameraCtlHover.tiltAngle + "——" + this.cameraCtlHover.panAngle);
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
				this._rootObj.dispatchEvent(new egret3d.Event3D("goto_scene", 1));
				break;
			case "mesh_infoPage_01":
				// this.parent.updataIframeUrl();
				this._rootObj.dispatchEvent(new egret3d.Event3D("load_infoPage", "resource/webpage/1/story_html5.html"));
				break;
		}
	}
}