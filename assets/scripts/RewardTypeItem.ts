import Utils from "./Utils";

const {ccclass, property} = cc._decorator;

@ccclass
export default class RewardTypeItem extends cc.Component {

    @property(cc.Label) rewardType :cc.Label = null;
    @property(cc.Label) poolRate :cc.Label = null;
    @property(cc.Label) additional :cc.Label = null;
    @property(cc.Sprite) boxIcon :cc.Sprite = null;
    @property([cc.SpriteFrame]) boxSptFrms :cc.SpriteFrame[] = [];
    public SetData(info,index)
    {
        this.rewardType.string = `${info.name}:${info.num}名`;
        this.poolRate.string = `奖池${info.poolRate * 100}%`;
        this.additional.string = Utils.convertNumber2String(info.additional.gold);
        if(index >0 && index < this.boxSptFrms.length){
            this.boxIcon.spriteFrame = this.boxSptFrms[index];
        }
    }
}
