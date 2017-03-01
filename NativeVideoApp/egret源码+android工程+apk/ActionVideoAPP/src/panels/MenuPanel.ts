/**
 * 模块功能：菜单界面
 * @author 彭祥
 *
 */
class MenuPanel extends eui.Component{
    
    public txt_title:eui.Label;
    
	public constructor() 
	{
    	 super();
       this.initData();
	}
    private initData(): void
    {
        this.skinName = "resource/eui_skins/Panel/MenuPanelSkin.exml";
        
        this.addJSON();
        this.addScroller();
    }
    

    
    private group: eui.Group;
    private myScroller: eui.Scroller;
    private addScroller():void
    {
        //创建一个容器，里面包含一张图片
        this.group = new eui.Group();
        //        var img = new eui.Image("resource/assets/Background/bg_2.png");
       
        //创建一个Scroller
        this.myScroller = new eui.Scroller();
        //注意位置和尺寸的设置是在Scroller上面，而不是容器上面
        this.myScroller.width = 1000;
        this.myScroller.height = 700;
        //设置viewport
        this.myScroller.viewport = this.group;
        this.addChild(this.myScroller);
        this.myScroller.x = 280;
        this.myScroller.y = 100;
        this.myScroller.scrollPolicyH = eui.ScrollPolicy.OFF; 
        
    }
    
    private list: eui.List;
    private dataAry: Array<any>;
    private addJSON():void
    {
        var objs = RES.getRes("menuInfo_json");
        this.dataAry = objs["menu"]["Item"] as Array<any>;
    }

    public updataTitleName(str:string):void
    {
      this.txt_title.text = str;
    }
    
    public updataItem(index:number=0):void
    {
        var titleName:string = this.dataAry[index]["content"];
        this.updataTitleName(titleName);

        var itemAry: Array<any> = this.dataAry[index]["Item"];
        var _dataProvider: eui.ArrayCollection = new eui.ArrayCollection();
        if(this.list != null && this.group.contains(this.list))
        {
//            this.list.dataProvider = new eui.ArrayCollection(itemAry);
            
            _dataProvider.source = itemAry;
           this.list.dataProvider = _dataProvider;
           
           _dataProvider.refresh();
           this.myScroller.stopAnimation();
           this.myScroller.viewport.scrollV =0;
           this.myScroller.validateNow();
           this.list.selectedIndex = -1;//设置默认选中项
            
        }else
        {
            this.list = new eui.List();
            
          
            _dataProvider.source = itemAry;
            this.list.dataProvider = _dataProvider;
            
//            this.list.dataProvider = new eui.ArrayCollection(itemAry);
            this.list.itemRenderer = MenuItem;
            this.addChild(this.list);
            this.list.x = 0;
            this.list.y = 0;
            this.list.selectedIndex = -1;//设置默认选中项
            this.list.addEventListener(eui.ItemTapEvent.ITEM_TAP,this.onChange,this);

            this.group.addChild(this.list);
        }
    }
    
    private _videoPanel:VideoPanel;
    private onChange(e: eui.PropertyEvent): void 
    {
        var item = e.currentTarget.selectedItem;
        //获取点击消息
        console.log(e.currentTarget.selectedIndex + "__" + item.content);
        
        if(this._videoPanel ==null)
        {
            this._videoPanel = new VideoPanel();
            this.addChild(this._videoPanel);
            this._videoPanel.x = 0;
            this._videoPanel.y = 0;
        }else
        {
            this._videoPanel.visible = true;
        }
        
        var path: string = "resource/assets/Video/" + item.resources;
        this._videoPanel.updataResources(path);
        
    }
    
}
