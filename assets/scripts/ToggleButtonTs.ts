// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const { ccclass, property } = cc._decorator;

@ccclass
export default class ToggleButton extends cc.Component {

	@property(cc.Sprite) private renderSpr: cc.Sprite = null;
	@property(cc.SpriteFrame) private normalSptFrm: cc.SpriteFrame = null;
	@property(cc.SpriteFrame) private heighLightSptFrm: cc.SpriteFrame = null;
	@property(cc.Sprite) private backgroundSpt: cc.Sprite = null;
	@property(cc.SpriteFrame) private backNormalSptFrm: cc.SpriteFrame = null;
	@property(cc.SpriteFrame) private backHeighLightSptFrm: cc.SpriteFrame = null;
	@property(cc.Node) private btnEffectNode: cc.Node = null;
	@property private isChecked: boolean = false;
	public get IsChecked() {
		return this.isChecked;
	}
	public set IsChecked(value: boolean) {
		this.isChecked = value;
		this.renderSpr.spriteFrame = value ? this.heighLightSptFrm : this.normalSptFrm;
		this.backgroundSpt.spriteFrame = value ? this.backHeighLightSptFrm : this.backNormalSptFrm;
		if (this.btnEffectNode != null) {
			this.btnEffectNode.active = value;
		}
	}
}
