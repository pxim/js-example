/**
 * 模块功能：视频界面
 * @author 彭祥
 *
 */
class VideoPanel extends eui.Component {
    public constructor() {
        super();
        this.skinName = "resource/eui_skins/Panel/VideoPanelSkin.exml";
        this.initData();
    }

    private initData(): void 
    {
        this.initView();
    }


    /*** 本示例关键代码段开始 ***/
    private _video: egret.Video;
    private _pauseTime: number = 0;
    //加载
    
    //播放
    private play(): void {
        this.stop();

        this._video.play(this._pauseTime,false);
        this._video.addEventListener(egret.Event.ENDED,this.onComplete,this);
    }
    //停止
    private stop(): void {
        this._video.pause();
    }
    //播放完成
    private onComplete(e: egret.Event): void {
        console.log("播放结束");
        this._video.removeEventListener(egret.Event.ENDED,this.onComplete,this);

        //        this.setAllAbled(false);
    }

    private changeScreen(): void {
        if(!this._video.paused) {
            this._video.fullscreen = !this._video.fullscreen;
        }
    }
    /*** 本示例关键代码段结束 ***/

    public updataResources(str: string) {
        if(this._video == null) 
        {
            var _height: number = this.height - this.controlsPanel.height;
            var _width: number = 1082 / 800 * _height;
            var _x: number = (this.width - _width)/2;
            
            this._video = new egret.Video();
            this._video.x = 0;
            this._video.y = 0;
            this._video.width = 1280;
            this._video.height = 720;
            this._video.fullscreen = false;
            // this._video.poster = this._video.fullscreen ? "resource/assets/posterfullscreen.jpg" : "resource/assets/posterinline.jpg";
            this._video.load(str);
            this.addChild(this._video);
            this._video.addEventListener(egret.Event.COMPLETE,this.loadVideoComplete2,this);
            this._video.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame1,this);

        }
        // this._video.fullscreen = false;
        // this._video.load(str);
//        this._video.addEventListener(egret.Event.COMPLETE,this.loadVideoComplete2,this);
//        this._video.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame1,this);
    }

    private loadVideoComplete2(): void {
        console.log("complete");
        this._pauseTime = 0;
        this._video.play(this._pauseTime,false);
        // this._video.visible = false;
        this.setChildIndex(this.controlsPanel,this.numChildren - 1);
        //            this._hSlider.maximum = this._video.length;
    }

    /** 以下为 UI 代码 **/
    public controlsPanel: PlaybackControlsPanel;
    private _btn_PlayOrStop: eui.ToggleButton;
    private _btn_Return: eui.Button;
    private _txt_time: eui.Label;
    private _hSlider: eui.HSlider;

    private initView(): void {
        this.setChildIndex(this.controlsPanel,this.numChildren - 1);
        this._btn_PlayOrStop = this.controlsPanel.btn_PlayOrStop;
        this._btn_Return = this.controlsPanel.btn_return;
        this._txt_time = this.controlsPanel.txt_time;
        this._hSlider = this.controlsPanel.hSlider;

        this._btn_Return.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onBtnReturnTouchTap,this);
        this._btn_PlayOrStop.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onBtnPlayOrStopTouchTap,this);
//        this._video.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame1,this);

        this._hSlider.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onHSliderTcouhBegin,this);
        this._hSlider.addEventListener(egret.TouchEvent.TOUCH_END,this.onHSliderTcouhEnd,this);
         this._hSlider.addEventListener(eui.UIEvent.CHANGE_START,this.onHSliderChangeStart,this);
        this._hSlider.addEventListener(eui.UIEvent.CHANGE,this.onHSliderChange,this);
        this._hSlider.addEventListener(eui.UIEvent.CHANGE_END,this.onHSliderChangeEnd,this);
    }

    /**
     * 返回按钮 点击
     * @param e
     */
    private onBtnReturnTouchTap(e: egret.TouchEvent): void {
        this.visible = false;

        this._video.removeEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame1,this);
        this.stop();
        this._btn_PlayOrStop.selected = true;
        this._hSlider.value = 0;

        if(this._video != null && this.contains(this._video)) {
            this.removeChild(this._video);
            this._video.src = null;
            this._video = null;
        }
    }


    /**
     * 播放 暂停  按钮点击
     * @param e
     */
    private onBtnPlayOrStopTouchTap(e: egret.TouchEvent): void {
        var target: eui.ToggleButton = e.currentTarget as eui.ToggleButton;
        if(target.selected == true) {
            //            this.play();
            this._video.play(this._pauseTime,false);
            this._video.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame1,this);
        } else {
            this._video.removeEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame1,this);
            this._pauseTime = this._video.position;
            this._video.pause();
        }
    }

    /**
     * 设置时间文本
     * @param str
     */
    private setTxtTimeLabel(str: string): void {
        this._txt_time.text = str;
    }

    private _str: string;
    private onEnterFrame1(e: egret.Event): void {
//        this._str = Math.floor(this._video.position).toString() + "/" + this._video.length.toString();
        
        this._str = CTimeFormat.convertTime(this._video.position);
        this.setTxtTimeLabel(this._str);

        var _value1: number = (this._video.position / this._video.length) * this._hSlider.maximum;
        this._hSlider.value = _value1;
    }

    //滑块事件处理

     /**
     * 播放控件按钮 按下
     * @param str
     */
    private onHSliderTcouhBegin(e: egret.Event): void {
        // this._pauseTime = this._video.position;
        // this._video.pause();
        // this._video.removeEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame1,this);
    }

 /**
     * 播放控件按钮 松开
     * @param str
     */
    private onHSliderTcouhEnd(e: egret.Event): void {
        // var index: number = (this._hSlider.value / this._hSlider.maximum) * this._video.length;
        // this._pauseTime = index;

        // this._video.play(this._pauseTime,false);
        // this._btn_PlayOrStop.selected = true;
        // this._video.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame1,this);
    }

 /**
     * 滑块改变位置 开始
     * @param str
     */
    private onHSliderChangeStart(e: eui.UIEvent):void
    {
        this._pauseTime = this._video.position; 
        this._video.pause();
        this._video.removeEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame1,this);
    }

 /**
     * 滑块改变位置 有变化的时候
     * @param str
     */
    private onHSliderChange(e: eui.UIEvent): void 
    {
        //        var index: number = e.target        
        var index: number = (this._hSlider.value / this._hSlider.maximum) * this._video.length;
        this._pauseTime = index;

//        this._str = Math.floor(this._pauseTime).toString() + "/" + this._video.length.toString();
        this._str = CTimeFormat.convertTime(this._video.position);
        this.setTxtTimeLabel(this._str);
    }

 /**
     * 滑块改变位置 结束
     * @param str
     */
    private onHSliderChangeEnd(e: eui.UIEvent): void {
        // var index: number = (this._hSlider.value / this._hSlider.maximum) * this._video.length;
        // this._pauseTime = index;

        //        this._video.play(this._pauseTime,false);
        //        this._pauseTime = this._video.position;
        //        this._video.pause();

          var index: number = (this._hSlider.value / this._hSlider.maximum) * this._video.length;
        this._pauseTime = index;

        this._video.play(this._pauseTime,false);
        this._btn_PlayOrStop.selected = true;
        this._video.addEventListener(egret.Event.ENTER_FRAME,this.onEnterFrame1,this);
    }

}
