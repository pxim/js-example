/**
 * 功能：事件总类
 * @author 彭祥
 *
 */
class DataEvents extends egret.Event
{
    public static change_panel: string = "change_panel";//切换界面
    
    protected  _params:Object;
    protected _container: egret.DisplayObjectContainer;
    public constructor(type: string,params: Object = null,container: egret.DisplayObjectContainer  = null, bubbles:boolean = false,cancelable:boolean = false)
    {
        super(type,bubbles,cancelable);
        this._params = params;
        this._container = container;
    }
    
    public get params(): Object
    {
        return this._params;
    }
    
    public get container():egret.DisplayObjectContainer
    {
        return this._container;
    }
}
