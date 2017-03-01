/**
 *
 * @author 彭祥
 *
 */
var PlaybackControlsPanel = (function (_super) {
    __extends(PlaybackControlsPanel, _super);
    function PlaybackControlsPanel() {
        _super.call(this);
        this.initData();
    }
    var d = __define,c=PlaybackControlsPanel,p=c.prototype;
    p.initData = function () {
        this.hSlider.maximum = this.hSlider.width;
        this.hSlider.addEventListener(eui.UIEvent.CHANGE, this.changeHandler, this);
    };
    p.changeHandler = function (evt) {
        console.log(evt.target.value);
    };
    return PlaybackControlsPanel;
}(eui.Component));
egret.registerClass(PlaybackControlsPanel,'PlaybackControlsPanel');
