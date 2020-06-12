import Utils from "./Utils";

const joinWordColor = "#BF6944";
const numberColor = "#f12820";
const {ccclass, property} = cc._decorator;

@ccclass
export default class WinDrawListItem extends cc.Component {


    @property(cc.Label) private nickname: cc.Label = null;
    @property(cc.RichText) private joinTimes: cc.RichText = null;
    @property(cc.Label) private codeNumber: cc.Label = null;
    @property(cc.Label) private rewardCoins: cc.Label = null;
    @property(cc.Sprite) private avatar: cc.Sprite = null;
    @property(cc.Sprite) private rewardTypeImage: cc.Sprite = null;
    @property([cc.SpriteFrame]) private rewardTypeSprites: cc.SpriteFrame[] = [];

    public SetData(info)
    {
        this.nickname.string = info.nickname;
        this.codeNumber.string = info.cardNO;
        this.rewardCoins.string = info.reward.gold;
        this.joinTimes.string = `<color=${joinWordColor}>参赛</c><color=${numberColor}>${info.join_num}</color><color=${joinWordColor}>次</c>`;
        let index = Utils.WordNumberMap.get(info.rewardName);
        if(index !== undefined)
        {
            this.rewardTypeImage.spriteFrame = this.rewardTypeSprites[index];
        }
        Utils.loadHeaderImg(this.avatar,info.avatar);
    }
    
}
