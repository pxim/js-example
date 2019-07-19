var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Room_02 = (function () {
    function Room_02(rootObj, camera3D) {
        this.createGameScene(rootObj, camera3D);
        this._rootObj = rootObj;
    }
    Room_02.prototype.createGameScene = function (rootObj, camera3D) {
        // var rootObj: egret3d.Object3D = new egret3d.Object3D();
        // this.view.addChild3D(rootObj);
        var _this = this;
        var loader = new egret3d.QueueLoader();
        loader.addEventListener(egret3d.LoaderEvent3D.LOADER_COMPLETE, function (e) {
            // var mesh_hall_01 = new egret3d.Mesh(new egret3d.SphereGeometry(), new egret3d.TextureMaterial(loader.getAsset("resource/3d/pano/pano_02.jpg")));
            // rootObj.addChild(mesh_hall_01);
            // mesh_hall_01.material.gloss = 1;
            // mesh_hall_01.material.ambientColor = 0.5;
            // mesh_hall_01.material.cullMode = egret3d.ContextConfig.FRONT;//裁剪正面进行反面渲染
            // mesh_hall_01.material.refraction = 1;
            // mesh_sphere.material.diffuseTexture = loader.getAsset("resource/3d/pano/2.JPG");
            var room_01 = new egret3d.Sky(new egret3d.SphereGeometry(1000, 100, 100), new egret3d.TextureMaterial(loader.getAsset("resource/3d/pano/pano_02.jpg")), camera3D);
            room_01.material.cullMode = egret3d.ContextConfig.FRONT;
            rootObj.addChild(room_01);
            var mesh_arrow_01 = new egret3d.Mesh(new egret3d.PlaneGeometry(40, 30, 2, 2), new egret3d.TextureMaterial(loader.getAsset("resource/2d/arrow_01.png")));
            rootObj.addChild(mesh_arrow_01);
            // var ray = this.view.camera3D.ScreenRayToObject3D(new egret3d.Vector3D(mesh_hall_01.x, mesh_hall_01.y, mesh_hall_01.z));
            // mesh_plane.position=ray;
            mesh_arrow_01.name = "mesh_arrow_01";
            mesh_arrow_01.position = new egret3d.Vector3D(10, -30, 50);
            mesh_arrow_01.scale = new egret3d.Vector3D(0.1, 0.1, 0.1);
            mesh_arrow_01.enablePick = true;
            // mesh_arrow_01.addEventListener(egret3d.PickEvent3D.PICK_CLICK, this.OnPickClick, this);
            mesh_arrow_01.addEventListener(egret3d.PickEvent3D.PICK_DOWN, _this.OnPickDown, _this);
            mesh_arrow_01.addEventListener(egret3d.PickEvent3D.PICK_UP, _this.OnPickUp, _this);
            var mesh_infoPage_01 = new egret3d.Mesh(new egret3d.PlaneGeometry(40, 30, 2, 2), new egret3d.ColorMaterial(0xff00000));
            rootObj.addChild(mesh_infoPage_01);
            mesh_infoPage_01.name = "mesh_infoPage_01";
            mesh_infoPage_01.position = new egret3d.Vector3D(15, -30, 30);
            mesh_infoPage_01.scale = new egret3d.Vector3D(0.3, 0.3, 0.3);
            mesh_infoPage_01.rotation = new egret3d.Vector3D(50, 20, 90);
            mesh_infoPage_01.enablePick = true;
            mesh_infoPage_01.pickType = egret3d.PickType.PositionPick;
            mesh_infoPage_01.addEventListener(egret3d.PickEvent3D.PICK_DOWN, _this.OnPickDown, _this);
            mesh_infoPage_01.addEventListener(egret3d.PickEvent3D.PICK_UP, _this.OnPickUp, _this);
        }, this);
        loader.load("resource/3d/pano/pano_02.jpg");
        loader.load("resource/2d/arrow_01.png");
    };
    ///按键按下事件响应,其中e: egret3d.KeyEvent3D会作为参数传递给响应事件。
    Room_02.prototype.OnKeyDown = function (e) {
        ///e.keyCode保存了触发该次事件的按键枚举值，通过转换成字符串可以输出。
        var code = egret3d.KeyCode[e.keyCode];
        console.log("OnKeyDown=>" + code);
        e.currentTarget;
        // console.log("cameraCtlHover：" + this.cameraCtlHover.distance + "——" + this.cameraCtlHover.tiltAngle + "——" + this.cameraCtlHover.panAngle);
    };
    Room_02.prototype.OnPickClick = function (e) {
        var mesh = e.target;
    };
    Room_02.prototype.OnPickDown = function (e) {
        var _target = e.target;
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
    };
    Room_02.prototype.OnPickUp = function (e) {
        var _target = e.target;
        console.log(_target.name);
        switch (_target.name) {
            case "mesh_arrow_01":
                _target.material.diffuseColor = 16777215;
                this._rootObj.dispatchEvent(new egret3d.Event3D("goto_scene", 2));
                break;
            case "mesh_infoPage_01":
                this._rootObj.dispatchEvent(new egret3d.Event3D("load_infoPage", "resource/webpage/1/story_html5.html"));
                break;
        }
    };
    return Room_02;
}());
__reflect(Room_02.prototype, "Room_02");
//# sourceMappingURL=Room_02.js.map