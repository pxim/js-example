/**
 * 模块功能：菜单item
 * @author 彭祥
 *
 */
var MenuItem = (function (_super) {
    __extends(MenuItem, _super);
    function MenuItem() {
        _super.call(this);
        this.initdata();
    }
    var d = __define,c=MenuItem,p=c.prototype;
    p.initdata = function () {
        this.skinName = "resource/eui_skins/ItemRenderer/MenuItemSkin.exml";
    };
    p.createChildren = function () {
        _super.prototype.createChildren.call(this);
    };
    p.dataChanged = function () {
    };
    return MenuItem;
}(eui.ItemRenderer));
egret.registerClass(MenuItem,'MenuItem');
