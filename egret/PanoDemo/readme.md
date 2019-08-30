### Egret4.0.3版本的 3d全景DEMO

这个是以前想用egret3d来做全景展厅项目时弄的技术测试demo，代码写的比较随意，不用细纠，现在放出来是给一些想用e3d做全景展厅的人，对那些用得到的人，做些参考的；

效果预览：http://i-fuyun.github.io/js-example/egret/PanoDemo/index.html


#### 功能：
1.egret html页面适配；

2.360度旋转；

3.热点触发跳转场景；

4.热点触发打开外部html页面，并且适配egret html页面；

#### 缺点：
1.使用 egret3d.Mesh 这个api加载全景图，全景图上的建筑物会扭曲，是e3d目前版本的BUG；

2.使用 egret3d.Sky 这个api加载全景图，不能使用 鼠标滚轮 操作，拉深拉近相机，来达到放大或者缩小全景图的效果；但是同时加载的 egret3d.Mesh 元素支持 鼠标滚轮操作，缩放元素大小的；

注：关于 egret3d.Mesh 和 egret3d.Sky 效果的切换，在Room_01.ts，和 Room_02.ts里的 createGameScene 这个function里。
