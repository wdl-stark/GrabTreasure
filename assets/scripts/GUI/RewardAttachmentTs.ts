import Utils from "../Utils";


const { ccclass, property } = cc._decorator;

@ccclass
export default class RewardAttachment extends cc.Component {
	@property(cc.Sprite) private propSpt: cc.Sprite = null;
	@property(cc.Label) private numLbl: cc.Label = null;


	// SetData(id, count) {
	//     if(utility.GetFragmentSmallImageURL(id) != null) {
	//         this.PropImage.spriteFrame = ResourcesManager.LoadFragmentSprite(this.PropImage);
	//     } else if(id >= 215 && id<= 219) {
	//         this.PropImage.spriteFrame = ResourcesManager.LoadGiftSprite(this.PropImage, id - 214);
	//     } else {
	//         this.PropImage.spriteFrame = ResourcesManager.LoadPropsSprite(this.PropImage, id);
	//     }

	//     if(id == GameConfig.TelephoneFare) {
	//         this.NumText.string = utility.ConvertTelephoneFare2String(count);
	//     } else {
	//         this.NumText.string = utility.ConvertNumber2String(count);
	//     }
	// },
	public SetData(id: number, count: number) {
		Utils.loadPropsSprite(this.propSpt, id);
		this.numLbl.string = Utils.convertNumber2String(count);
		// TODO:动画显示问题
		// if (cc.isValid(this.Animation)) {
		// 	this.Animation.active = true;
		// }
	}
}
