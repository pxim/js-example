var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var CAssetsLoad = (function () {
    function CAssetsLoad() {
    }
    // 加载漫反射贴图 法线贴图 高光贴图
    CAssetsLoad.prototype.loaderAsset = function () {
        var loader = new egret3d.QueueLoader();
        loader.addEventListener(egret3d.LoaderEvent3D.LOADER_COMPLETE, this.onAssetComplete, this);
        loader.load("resource/3d/pano/2.JPG");
        // loader.load("resource/doc/materail/brick-normal.jpg");
        // loader.load("resource/doc/materail/brick-specular.jpg");
    };
    // 
    CAssetsLoad.prototype.onAssetComplete = function (e) {
        var loader = e.target;
        var plane = new egret3d.Mesh(new egret3d.PlaneGeometry(300, 300));
        // this.view.addChild3D(plane);
        // plane.material.ambientColor = 0xcccccc;
        // var p0: egret3d.PointLight = new egret3d.PointLight(0xffffff);
        // // 设置点光源的坐标
        // p0.y = 50;
        // p0.z = 200;
        // this.lights.addLight(p0);
        // plane.material.lightGroup = this.lights;
        // 设置漫反射贴图
        plane.material.diffuseTexture = loader.getAsset("resource/doc/materail/brick-diffuse.jpg");
        // // 设置法线贴图
        // plane.material.normalTexture = loader.getAsset("resource/doc/materail/brick-normal.jpg");
        // // 设置高光贴图
        // plane.material.specularTexture = loader.getAsset("resource/doc/materail/brick-specular.jpg");
    };
    return CAssetsLoad;
}());
__reflect(CAssetsLoad.prototype, "CAssetsLoad");
//# sourceMappingURL=CAssetsLoad.js.map