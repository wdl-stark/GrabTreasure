import Utils from "./Utils";


const {ccclass, property} = cc._decorator;

@ccclass
export default class ConvertRewardItem extends cc.Component {

    @property(cc.Label) private rewardDaily: cc.Label = null;
    @property(cc.Label) private codeNumber: cc.Label = null;
    @property(cc.Label) private rewardCoins: cc.Label = null;
    @property(cc.Sprite) private getRewardFlag: cc.Sprite = null;
    @property([cc.SpriteFrame]) private getRewardFlagSprites: cc.SpriteFrame[] = [];
    @property(cc.Sprite) private rewardTypeImage: cc.Sprite = null;
    @property([cc.SpriteFrame]) private rewardTypeSprites: cc.SpriteFrame[] = [];

    public SetData(info)
    {
        this.rewardDaily.string = info.daily;
        this.codeNumber.string = info.cardNO;
        this.rewardCoins.string = (info.reward.gold===null || info.reward.gold===undefined) ?  "0" : info.reward.gold;
        if(info.status >=0 && info.status < 3)
        {
            this.getRewardFlag.spriteFrame = this.getRewardFlagSprites[info.status];
        }
        let index = Utils.WordNumberMap.get(info.name);
        if(index !== undefined)
        {
            this.rewardTypeImage.spriteFrame = this.rewardTypeSprites[index];
        }
    }
}
