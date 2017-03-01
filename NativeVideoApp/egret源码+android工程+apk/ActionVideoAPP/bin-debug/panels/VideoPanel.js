/**
 * 模块功能：视频界面
 * @author 彭祥
 *
 */
var VideoPanel = (function (_super) {
    __extends(VideoPanel, _super);
    function VideoPanel() {
        _super.call(this);
        this._pauseTime = 0;
        this.skinName = "resource/eui_skins/Panel/VideoPanelSkin.exml";
        this.initData();
    }
    var d = __define,c=VideoPanel,p=c.prototype;
    p.initData = function () {
        this.initView();
    };
    //加载
    //播放
    p.play = function () {
        this.stop();
        this._video.play(this._pauseTime, false);
        this._video.addEventListener(egret.Event.ENDED, this.onComplete, this);
    };
    //停止
    p.stop = function () {
        this._video.pause();
    };
    //播放完成
    p.onComplete = function (e) {
        console.log("播放结束");
        this._video.removeEventListener(egret.Event.ENDED, this.onComplete, this);
        //        this.setAllAbled(false);
    };
    p.changeScreen = function () {
        if (!this._video.paused) {
            this._video.fullscreen = !this._video.fullscreen;
        }
    };
    /*** 本示例关键代码段结束 ***/
    p.updataResources = function (str) {
        if (this._video == null) {
            var _height = this.height - this.controlsPanel.height;
            var _width = 1082 / 800 * _height;
            var _x = (this.width - _width) / 2;
            this._video = new egret.Video();
            this._video.x = 0;
            this._video.y = 0;
            this._video.width = 1280;
            this._video.height = 720;
            this._video.fullscreen = false;
            // this._video.poster = this._video.fullscreen ? "resource/assets/posterfullscreen.jpg" : "resource/assets/posterinline.jpg";
            this._video.load(str);
            this.addChild(this._video);
            this._video.addEventListener(egret.Event.COMPLETE, this.loadVideoComplete2, this);
            this._video.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame1, this);
        }
        // this._video.fullscreen = false;
        // this._video.load(str);
        //        this._video.addEventListener(egret.Event.COMPLETE,this.loadVideoComplete2,this);
        //        this._video.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame1,this);
    };
    p.loadVideoComplete2 = function () {
        console.log("complete");
        this._pauseTime = 0;
        this._video.play(this._pauseTime, false);
        // this._video.visible = false;
        this.setChildIndex(this.controlsPanel, this.numChildren - 1);
        //            this._hSlider.maximum = this._video.length;
    };
    p.initView = function () {
        this.setChildIndex(this.controlsPanel, this.numChildren - 1);
        this._btn_PlayOrStop = this.controlsPanel.btn_PlayOrStop;
        this._btn_Return = this.controlsPanel.btn_return;
        this._txt_time = this.controlsPanel.txt_time;
        this._hSlider = this.controlsPanel.hSlider;
        this._btn_Return.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnReturnTouchTap, this);
        this._btn_PlayOrStop.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBtnPlayOrStopTouchTap, this);
        //        this._video.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame1,this);
        this._hSlider.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onHSliderTcouhBegin, this);
        this._hSlider.addEventListener(egret.TouchEvent.TOUCH_END, this.onHSliderTcouhEnd, this);
        this._hSlider.addEventListener(eui.UIEvent.CHANGE_START, this.onHSliderChangeStart, this);
        this._hSlider.addEventListener(eui.UIEvent.CHANGE, this.onHSliderChange, this);
        this._hSlider.addEventListener(eui.UIEvent.CHANGE_END, this.onHSliderChangeEnd, this);
    };
    /**
     * 返回按钮 点击
     * @param e
     */
    p.onBtnReturnTouchTap = function (e) {
        this.visible = false;
        this._video.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame1, this);
        this.stop();
        this._btn_PlayOrStop.selected = true;
        this._hSlider.value = 0;
        if (this._video != null && this.contains(this._video)) {
            this.removeChild(this._video);
            this._video.src = null;
            this._video = null;
        }
    };
    /**
     * 播放 暂停  按钮点击
     * @param e
     */
    p.onBtnPlayOrStopTouchTap = function (e) {
        var target = e.currentTarget;
        if (target.selected == true) {
            //            this.play();
            this._video.play(this._pauseTime, false);
            this._video.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame1, this);
        }
        else {
            this._video.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame1, this);
            this._pauseTime = this._video.position;
            this._video.pause();
        }
    };
    /**
     * 设置时间文本
     * @param str
     */
    p.setTxtTimeLabel = function (str) {
        this._txt_time.text = str;
    };
    p.onEnterFrame1 = function (e) {
        //        this._str = Math.floor(this._video.position).toString() + "/" + this._video.length.toString();
        this._str = CTimeFormat.convertTime(this._video.position);
        this.setTxtTimeLabel(this._str);
        var _value1 = (this._video.position / this._video.length) * this._hSlider.maximum;
        this._hSlider.value = _value1;
    };
    //滑块事件处理
    /**
    * 播放控件按钮 按下
    * @param str
    */
    p.onHSliderTcouhBegin = function (e) {
        // this._pauseTime = this._video.position;
        // this._video.pause();
        // this._video.removeEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame1,this);
    };
    /**
        * 播放控件按钮 松开
        * @param str
        */
    p.onHSliderTcouhEnd = function (e) {
        // var index: number = (this._hSlider.value / this._hSlider.maximum) * this._video.length;
        // this._pauseTime = index;
        // this._video.play(this._pauseTime,false);
        // this._btn_PlayOrStop.selected = true;
        // this._video.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame1,this);
    };
    /**
        * 滑块改变位置 开始
        * @param str
        */
    p.onHSliderChangeStart = function (e) {
        this._pauseTime = this._video.position;
        this._video.pause();
        this._video.removeEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame1, this);
    };
    /**
        * 滑块改变位置 有变化的时候
        * @param str
        */
    p.onHSliderChange = function (e) {
        //        var index: number = e.target        
        var index = (this._hSlider.value / this._hSlider.maximum) * this._video.length;
        this._pauseTime = index;
        //        this._str = Math.floor(this._pauseTime).toString() + "/" + this._video.length.toString();
        this._str = CTimeFormat.convertTime(this._video.position);
        this.setTxtTimeLabel(this._str);
    };
    /**
        * 滑块改变位置 结束
        * @param str
        */
    p.onHSliderChangeEnd = function (e) {
        // var index: number = (this._hSlider.value / this._hSlider.maximum) * this._video.length;
        // this._pauseTime = index;
        //        this._video.play(this._pauseTime,false);
        //        this._pauseTime = this._video.position;
        //        this._video.pause();
        var index = (this._hSlider.value / this._hSlider.maximum) * this._video.length;
        this._pauseTime = index;
        this._video.play(this._pauseTime, false);
        this._btn_PlayOrStop.selected = true;
        this._video.addEventListener(egret.Event.ENTER_FRAME, this.onEnterFrame1, this);
    };
    return VideoPanel;
}(eui.Component));
egret.registerClass(VideoPanel,'VideoPanel');
