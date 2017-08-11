var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 * 模块功能：全景展厅
 * author PengXiang
 *
 */
var PanoHall_3 = (function () {
    function PanoHall_3(context3d) {
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
    }
    PanoHall_3.prototype.createGameScene = function () {
        // var rootObj: egret3d.Object3D = new egret3d.Object3D();
        // this.view.addChild3D(rootObj);
        var _this = this;
        var loader = new egret3d.QueueLoader();
        loader.addEventListener(egret3d.LoaderEvent3D.LOADER_COMPLETE, function (e) {
            _this.sky = new egret3d.Sky(new egret3d.SphereGeometry(1000, 100, 100), new egret3d.TextureMaterial(loader.getAsset("resource/3d/pano/pano_02.jpg")), _this.view.camera3D);
            _this.sky.material.cullMode = egret3d.ContextConfig.FRONT;
            _this.view.addChild3D(_this.sky);
            var mesh_infoPage_01 = new egret3d.Mesh(new egret3d.PlaneGeometry(40, 30, 2, 2), new egret3d.ColorMaterial(0xff00000));
            _this.view.addChild3D(mesh_infoPage_01);
            mesh_infoPage_01.name = "mesh_infoPage_01";
            mesh_infoPage_01.position = new egret3d.Vector3D(15, -30, 30);
            mesh_infoPage_01.scale = new egret3d.Vector3D(0.3, 0.3, 0.3);
            mesh_infoPage_01.rotation = new egret3d.Vector3D(50, 20, 90);
        }, this);
        loader.load("resource/3d/pano/pano_02.jpg");
        // loader.load("resource/3d/pano_b[1].jpg");
        // loader.load("resource/3d/pano_d[1].jpg");
        // loader.load("resource/3d/pano_f[1].jpg");
        // loader.load("resource/3d/pano_l[1].jpg");
        // loader.load("resource/3d/pano_r[1].jpg");
        // loader.load("resource/3d/pano_u[1].jpg");
    };
    PanoHall_3.prototype.OnPickClick = function (e) {
        var mesh = e.target;
    };
    PanoHall_3.prototype.OnPickDown = function (e) {
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
    PanoHall_3.prototype.OnPickUp = function (e) {
        var _target = e.target;
        console.log(_target.name);
        switch (_target.name) {
            case "mesh_arrow_01":
                _target.material.diffuseColor = 16777215;
                break;
            case "mesh_viewInfo_01":
                break;
        }
    };
    PanoHall_3.prototype.update = function (e) {
        this.cameraCtlHover.update();
    };
    return PanoHall_3;
}());
__reflect(PanoHall_3.prototype, "PanoHall_3");
//# sourceMappingURL=PanoHall_3.js.map