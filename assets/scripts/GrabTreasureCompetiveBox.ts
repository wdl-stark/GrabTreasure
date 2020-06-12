import GrabTreasureTaskItem from "./GrabTreasureTaskItem";
const {ccclass, property} = cc._decorator;

@ccclass
export default class GrabTreasureCompetiveBox extends cc.Component {

    @property(cc.Node) private content: cc.Node = null;
    @property(cc.Prefab) private boxItemPrefab: cc.Prefab = null;
    public SetData(infoList)
    {
        this.content.removeAllChildren();
        if(infoList !== null && infoList.length !== 0){
            infoList.forEach(info=>{
                let itemNode = cc.instantiate(this.boxItemPrefab);
                itemNode.parent = this.content;
                itemNode.getComponent(GrabTreasureTaskItem).SetData(info);
            });
        }
    }

    public GetAllButtonClicked()
    {
        window.mainPage.callServerByClient("object.playerHandler.onGetQuestAllReward",null)
    }

    public Close()
    {
        this.node.destroy();
    }
}
