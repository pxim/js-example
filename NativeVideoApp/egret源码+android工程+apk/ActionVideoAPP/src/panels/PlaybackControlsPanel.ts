/**
 *
 * @author 彭祥
 *
 */
class PlaybackControlsPanel extends eui.Component {

    public btn_PlayOrStop: eui.ToggleButton;
    public btn_return: eui.Button;
    public txt_time: eui.Label;
    public hSlider:eui.HSlider;
    public constructor() {
        super();
        this.initData();
    }

    private initData(): void
    {
        this.hSlider.maximum = this.hSlider.width;
        this.hSlider.addEventListener(eui.UIEvent.CHANGE,this.changeHandler,this);
    }
    
    private changeHandler(evt: eui.UIEvent): void {
        console.log(evt.target.value);

    }

}
