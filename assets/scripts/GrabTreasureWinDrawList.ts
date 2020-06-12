
import WinDrawListItem from "./WinDrawListItem";

const {ccclass, property} = cc._decorator;

@ccclass
export default class GrabTreasureWinDrawList extends cc.Component {

    @property(cc.Node) private content: cc.Node = null;
    @property(cc.Prefab) private winDrawItemPrefab: cc.Prefab = null;
    public SetData(infoList)
    {
        this.content.removeAllChildren();
        if(infoList != null && infoList.length != 0)
        {
            infoList.forEach(info=>{
                let itemNode = cc.instantiate(this.winDrawItemPrefab);
                itemNode.parent = this.content;
                itemNode.getComponent(WinDrawListItem).SetData(info);
            });
        }
    }
    public Close(){
        this.node.destroy();
    }
}
