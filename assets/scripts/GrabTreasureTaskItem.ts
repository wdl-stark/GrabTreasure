
const {ccclass, property} = cc._decorator;

@ccclass
export default class GrabTreasureTaskItem extends cc.Component {

    @property(cc.Label) private taskInfo: cc.Label = null;
    @property(cc.Label) private rewardCoins: cc.Label = null;
    @property(cc.Label) private processLbl: cc.Label = null;
    @property(cc.Node) private progressBG:cc.Node = null;
    @property(cc.Node) private progressBar:cc.Node = null;

    public SetData(info)
    {
        this.taskInfo.string = `参赛满${info.num}次`;
        this.rewardCoins.string = info.reward.gold;
        this.processLbl.string = `${info.status}/${info.questCount}`
        let width = this.progressBG.width;
        this.progressBar.width = (info.status / info.questCount)*width;
    }
}
