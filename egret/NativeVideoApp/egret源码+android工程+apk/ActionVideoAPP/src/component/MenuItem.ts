/**
 * 模块功能：菜单item
 * @author 彭祥
 *
 */
class MenuItem extends eui.ItemRenderer{
	public constructor() {
        super();
        this.initdata();
	}
	
    private labelDisplay: eui.Label;
    private initdata():void
    {
        this.skinName = "resource/eui_skins/ItemRenderer/MenuItemSkin.exml";
    }
    
    protected createChildren(): void {
        super.createChildren();
    }

    protected dataChanged(): void {
    }
}
