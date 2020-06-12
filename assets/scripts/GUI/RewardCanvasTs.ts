import RewardAttachment from "./RewardAttachmentTs";

const { ccclass, property } = cc._decorator;

@ccclass
export default class RewardCanvas extends cc.Component {

	@property(cc.Prefab) private AttachmentPrefab: cc.Prefab = null;
	@property(cc.Node) private content: cc.Node = null;
	@property(cc.Label) private countDownText: cc.Label = null;
	public handle = null;
	public SetData(data, onComplete = null) {
		let children = [];
		this.handle = onComplete;

		data.forEach(()=> {
			let attachment = cc.instantiate(this.AttachmentPrefab);
			// attachment.parent = this.content;
			children.push(attachment);
		});

		let index = 0;
		let len = data.length;
		let callback = ()=>{
			if (index < len) {
				// children[index].getComponent('RewardAttachment').SetData(data[index].id, data[index].count);
				children[index].getComponent(RewardAttachment).SetData(data[index].id, data[index].count);
				children[index].parent = this.content;
				index++;
			}

			if (index === len) {
				this.unschedule(callback);
			}
		};
		this.schedule(callback, 0.1);
		this.scheduleOnce(()=>{
			this.node.destroy();
			if(onComplete !== null)
			{
				onComplete();
			}
		},5);
	}
	public OnClickGetRewardClick() {
		this.node.stopAllActions();
		this.node.destroy();
		if (this.handle !== null) {
			this.handle();
		}
	}
}
