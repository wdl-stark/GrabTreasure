import ConvertRewardItem from "./ConvertRewardItem";
import ToggleButton from "./ToggleButtonTs";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GrabTreasureConvert extends cc.Component {

    @property(cc.Node) private content: cc.Node = null;
    @property(cc.Prefab) private convertItemPrefab: cc.Prefab = null;
    @property([ToggleButton]) private tabButtons: ToggleButton[] = [];
    private _selectTab = 0;
    public get SelectTab(){
        return this._selectTab;
    }
    public set SelectTab(value){
        if(this._selectTab !== value)
        {
            this._selectTab = value;
            let statusList = [2];
            if(value == 0)
            {
                statusList = [0,1,2];
            }
            let input = {
                type:window.mainPage.SelectType,
                statusList:statusList,
                pageIndex:1,
                pageSize:500
            }
            window.mainPage.GetExchangeChampionshipList(input);
        }
    }

    public SetData(infoList)
    {
        this.content.removeAllChildren();
        if(infoList != null && infoList.length !== 0)
        {
            infoList.forEach(info=>{
                let itemNode = cc.instantiate(this.convertItemPrefab);
                itemNode.parent = this.content;
                itemNode.getComponent(ConvertRewardItem).SetData(info);
            });
        }
    }

    public OnTabButtonClick(event,eventData){
        let index0 = parseInt(eventData);
        this.tabButtons.forEach((item,index)=>{
            item.IsChecked = index0 == index;
        });
        this.SelectTab = index0;
    }

    public GetAllRewardButtonClick(){
        if(window.mainPage !== null)
        {
            window.mainPage.callServerByClient("object.playerHandler.onGetChampionshipAllReward",JSON.stringify({}));
        }
    }

    public Close()
    {
        window.mainPage.convertNode = null;
        this.node.destroy();
    }
}
