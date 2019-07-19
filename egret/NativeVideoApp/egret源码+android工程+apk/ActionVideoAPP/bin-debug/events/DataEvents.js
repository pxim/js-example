/**
 * 功能：事件总类
 * @author 彭祥
 *
 */
var DataEvents = (function (_super) {
    __extends(DataEvents, _super);
    function DataEvents(type, params, container, bubbles, cancelable) {
        if (params === void 0) { params = null; }
        if (container === void 0) { container = null; }
        if (bubbles === void 0) { bubbles = false; }
        if (cancelable === void 0) { cancelable = false; }
        _super.call(this, type, bubbles, cancelable);
        this._params = params;
        this._container = container;
    }
    var d = __define,c=DataEvents,p=c.prototype;
    d(p, "params"
        ,function () {
            return this._params;
        }
    );
    d(p, "container"
        ,function () {
            return this._container;
        }
    );
    DataEvents.change_panel = "change_panel"; //切换界面
    return DataEvents;
}(egret.Event));
egret.registerClass(DataEvents,'DataEvents');
