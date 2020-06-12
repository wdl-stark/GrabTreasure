import { prefabFactory } from "./PrefabFactory";
import ToggleButton from "./ToggleButtonTs";
import RewardTypeItem from "./RewardTypeItem";
import CodeNumberItem from "./CodeNumberItem";
import Utils from "./Utils";
import GrabTreasureWinDrawList from "./GrabTreasureWinDrawList";
import GrabTreasureConvert from "./GrabTreasureConvert";
import GrabTreasureCompetiveBox from "./GrabTreasureCompetiveBox";
import RewardCanvas from "./GUI/RewardCanvasTs";

let GameConfig = {
    GoldDropID:1000,
    DiamondDropID:1001,
}

const {ccclass, property} = cc._decorator;

@ccclass
export default class GrabTreasureActivity extends cc.Component {

    @property([ToggleButton]) private toggleComps: ToggleButton[] = [];
    @property(cc.Node) private rewardTypeParent: cc.Node = null;
    @property(cc.Node) private codeNumberParent: cc.Node = null;
    @property(cc.Prefab) private rewardTypeItemPrefab: cc.Prefab = null;
    @property(cc.Prefab) private codeNumberItemPrefab: cc.Prefab = null;
    @property(cc.Label) private rewardPool: cc.Label = null;
    @property([cc.Sprite]) private myCodeImage: cc.Sprite[] = [];
    @property([cc.SpriteFrame]) private codeSprites: cc.SpriteFrame[] = [];
    @property(cc.Label) private onceReward: cc.Label = null;
    @property(cc.Label) private fiveReward: cc.Label = null;
    @property(cc.Label) private countDownTimeLbl: cc.Label = null;
    private _data:any = null;
    private payConfig:any = null;
    public convertNode:cc.Node = null;
    
    private _selectType = 1;
    public get SelectType(){
        return this._selectType;
    }
    public set SelectType(value){
        if(this._selectType !== value)
        {
            this._selectType = value;
            this.RefreshActivityData();
        }
    }

    public onLoad(){
        window.mainPage = this;
         this.RefreshActivityData();
    }
    public onDestroy()
    {
        window.mainPage = null;
    }
    public RefreshActivityData()
    {
        this.callServerByClient("object.playerHandler.onGetChampionshipInfo",JSON.stringify({type:this.SelectType}));
    }
    public activitycallback(body) {
        // body = {
        //     "error":false,"code":200,"command":"onGetChampionshipInfo","data":{"cardNOS":[{"cardNO":"7935341"},{"cardNO":"9518000"},{"cardNO":"5207805"},{"cardNO":"2413489"},{"cardNO":"9178891"},{"cardNO":"8435677"},{"cardNO":"4426930"},{"cardNO":"9042810"},{"cardNO":"2628943"},{"cardNO":"1684993"},{"cardNO":"9175999"},{"cardNO":"2870475"},{"cardNO":"9736304"},{"cardNO":"6734363"},{"cardNO":"9039129"},{"cardNO":"8792094"},{"cardNO":"6097452"},{"cardNO":"5870723"},{"cardNO":"4659559"},{"cardNO":"9992926"},{"cardNO":"7178973"},{"cardNO":"0970643"},{"cardNO":"6609453"},{"cardNO":"1347467"},{"cardNO":"3285773"},{"cardNO":"0614157"},{"cardNO":"9258449"},{"cardNO":"3308292"},{"cardNO":"3471584"},{"cardNO":"6955459"},{"cardNO":"8195914"}],
        //     "openTime":"1591950940000","stopTime":"1591950940000","rewardType":[{"name":"特等奖","poolRate":0.2,"num":1,"additional":{"gold":1000000}},{"name":"一等奖","poolRate":0.1,"num":3,"additional":{"gold":700000}},{"name":"二等奖","poolRate":0.02,"num":10,"additional":{"gold":400000}},{"name":"三等奖","poolRate":0.1,"num":30,"additional":{"gold":300000}},{"name":"入围奖","poolRate":0,"num":36,"additional":{"gold":50000}}],
        //     "pool":155000,"payConfig":[{"id":1,"name":"新手场一次","num":1,"gold":5000,"nowGold":20000,"type":1,"payId":96},{"id":2,"name":"新手场五次","num":5,"gold":25000,"nowGold":100000,"type":1,"payId":97}],"openStatus":1}
        // }
        // alert("activitycallback body="+JSON.stringify(body));
        let command=body.command;
        let code=body.code;
        let error=body.error;
        switch (command){
            case "onGetChampionshipInfo":
                // alert("activitycallback onGetChampionshipInfo body="+JSON.stringify(body));
                console.log("activitycallback onGetChampionshipInfo");
                if(code==200 && error==false){
                    if(body.data !== null)
                    {
                        
                        this._data = body.data;
                        this.payConfig = body.data.payConfig;
                        this.onceReward.string = body.data.payConfig[0].nowGold;//Utils.convertNumber2String(body.data.payConfig[0].nowGold);
                        this.fiveReward.string = body.data.payConfig[1].nowGold;//Utils.convertNumber2String(body.data.payConfig[1].nowGold);
                        this.rewardPool.string = body.data.pool;//Utils.convertNumber2String(body.data.pool);
                        let nowDate = (new Date()).valueOf();
                        let diff = Math.ceil((parseInt(body.data.openTime)  - nowDate)/1000);
                        this.countDownTimeLbl.string = Utils.getCountDownTime(diff);
                        this.CountDownTime(body.data.openTime);

                        this.rewardTypeParent.removeAllChildren();
                        if(body.data.rewardType !== null &&  body.data.rewardType.length > 0)
                        {
                            
                            body.data.rewardType.forEach((item,index)=>{
                                let rewardTypeNode = cc.instantiate(this.rewardTypeItemPrefab);
                                rewardTypeNode.getComponent(RewardTypeItem).SetData(item,index);
                                rewardTypeNode.parent = this.rewardTypeParent;
                            });
                        }
                        this.codeNumberParent.removeAllChildren();
                        if(body.data.cardNOS !== null &&  body.data.cardNOS.length > 0)
                        {
                            let myCode = body.data.cardNOS[0].cardNO.split("");
                            this.myCodeImage.forEach((item,index)=>{
                                if(index < myCode.length)
                                {
                                    item.spriteFrame = this.codeSprites[parseInt(myCode[index])];
                                } 
                            });
                            
                            body.data.cardNOS.forEach((item,index)=>{
                                let codeNumberNode = cc.instantiate(this.codeNumberItemPrefab);
                                codeNumberNode.getComponent(CodeNumberItem).SetData(item,index+1);
                                codeNumberNode.parent = this.codeNumberParent;
                            });
                        }
                    }
                }
            break;
            case "onGetExchangeChampionshipList":
                // alert("activitycallback 兑换奖励 body="+JSON.stringify(body));
                if(this.convertNode === null)
                {
                    prefabFactory.instantiatePrefab(prefabFactory.GrabTreasureConvert,this.node,(convertNode)=>{
                        convertNode.getComponent(GrabTreasureConvert).SetData(body.data);
                        this.convertNode = convertNode;
                    });
                }else{
                    this.convertNode.getComponent(GrabTreasureConvert).SetData(body.data);
                }
                break;
            case "onGetHitChampionshipList":
                // alert("activitycallback 查看最新中奖名单 body="+JSON.stringify(body));
                prefabFactory.instantiatePrefab(prefabFactory.GrabTreasureWinDrawList,this.node,(listNode)=>{
                    listNode.getComponent(GrabTreasureWinDrawList).SetData(body.data.list);
                });
                break;
            case "onGetChampionshipQuestList":
                prefabFactory.instantiatePrefab(prefabFactory.GrabTreasureCompetiveBox,this.node,(boxNode)=>{
                    boxNode.getComponent(GrabTreasureCompetiveBox).SetData(body.data);
                });
                break;
            case "onGetChampionshipAllReward":
                // alert(JSON.stringify(body))
                // body = {reward:{gold:1005000}};
                this.showReardCanvas(body);
                break;
            case "onGetQuestAllReward":
                this.showReardCanvas(body);
                break;
            
        }
    }
    public CountDownTime(openTime){
        let timerId = setInterval(()=>{
            let nowDate = (new Date()).valueOf();
            let diff = Math.ceil((parseInt(openTime)  - nowDate)/1000);
            if(diff > 0)
            {
                this.countDownTimeLbl.string = Utils.getCountDownTime(diff);
            }else{
                this.countDownTimeLbl.string = "00:00:00";
                clearInterval(timerId);
            }
        },1000);
    }
    public OnToggleButtonClicked(event,eventData)
    {
        this.toggleComps.forEach((item,index) => {
            item.IsChecked = index == parseInt(eventData); 
            if(item.IsChecked)
            {
                this.SelectType = index + 1;
            }
        });
    }
    public OnJoinOnceButtonClicked(){
        if(this._data == null || this._data.openStatus !== 1 || this.payConfig == null 
            || this.payConfig.length != 2 || this.payConfig[0].payId == null)
        {
            return;
        }
        let itemData = {
            id: this.payConfig[0].payId,
            type: 0,
            count: 0,
            pay: 0
        };
        this.callPayWayClient(JSON.stringify(itemData));
   }

    public OnJoinFiveTimesButtonClicked()
    {
        if(this._data == null || this._data.openStatus !== 1 || this.payConfig == null 
            || this.payConfig.length != 2 || this.payConfig[1].payId == null)
        {
            return;
        }
        let itemData = {
            id: this.payConfig[1].payId,
            type: 0,
            count: 0,
            pay: 0
        };

        this.callPayWayClient(JSON.stringify(itemData));
    }
    public callServerByClient(router,data)
    {
        console.log(router,data)
        window.location.href = "uniwebview://callServerByClient?route=" + router +"&data="+data;
    }
    public callPayWayClient(data)
    {
        window.location.href = "uniwebview://WebPay?data="+data;
    }

    public OnRuleButtonClicked(){
        prefabFactory.instantiatePrefab(prefabFactory.GrabTreasureRule,this.node,()=>{

        });
    }
    public GetExchangeChampionshipList(input)
    {
        this.callServerByClient("object.playerHandler.onGetExchangeChampionshipList",JSON.stringify(input));
    }
    public OnConvertRewardButtonClicked()
    {
        let input = {
            type:this.SelectType,
            pageIndex:1,
            statusList:[0,1,2],
            pageSize:500
        }
        this.GetExchangeChampionshipList(input);
        //test
        // let list = [{"id":76,"daily":"2020-06-11","cardNO":"5913144","status":1,"reward":{"gold":1010000},"name":"特等奖"},{"id":75,"daily":"2020-06-11","cardNO":"9554028","status":1,"reward":{"gold":705000},"name":"一等奖"},{"id":73,"daily":"2020-06-11","cardNO":"8741948","status":1,"reward":{"gold":705000},"name":"一等奖"},{"id":68,"daily":"2020-06-11","cardNO":"4291670","status":1,"reward":{"gold":705000},"name":"一等奖"},{"id":66,"daily":"2020-06-10","cardNO":"1717333","status":1,"reward":{"gold":702500},"name":"一等奖"},{"id":65,"daily":"2020-06-10","cardNO":"7883163","status":1,"reward":{"gold":702500},"name":"一等奖"},{"id":74,"daily":"2020-06-11","cardNO":"9921874","status":1,"reward":{"gold":401000},"name":"二等奖"},{"id":72,"daily":"2020-06-11","cardNO":"6938384","status":1,"reward":{"gold":401000},"name":"二等奖"},{"id":71,"daily":"2020-06-11","cardNO":"2189590","status":1,"reward":{"gold":401000},"name":"二等奖"},{"id":70,"daily":"2020-06-11","cardNO":"3202922","status":1,"reward":{"gold":401000},"name":"二等奖"}]    
        // prefabFactory.instantiatePrefab(prefabFactory.GrabTreasureConvert,this.node,(convertNode)=>{
        //     convertNode.getComponent(GrabTreasureConvert).SetData(list);
        // });
    }
    public OnWinDrawListButtonClicked(){
        let input = {
            type:this.SelectType,
        }
        this.callServerByClient("object.playerHandler.onGetHitChampionshipList",JSON.stringify(input));
        //test
        // let list = {"list":[{"rewardName":"特等奖","cardNO":"0646061","reward":{"gold":1005000},"avatar":"http://fishjoy.oss-cn-hangzhou.aliyuncs.com/header%2F0ecf5c30-9964-4dcf-9700-379480b5f4ca.png","nickname":"zjxs","join_num":5,"rewardDaily":"2020-06-10"},{"rewardName":"一等奖","cardNO":"1717333","reward":{"gold":702500},"avatar":"http://fishjoy.oss-cn-hangzhou.aliyuncs.com/header%2F0ecf5c30-9964-4dcf-9700-379480b5f4ca.png","nickname":"zjxs","join_num":5,"rewardDaily":"2020-06-10"},{"rewardName":"一等奖","cardNO":"7883163","reward":{"gold":702500},"avatar":"http://fishjoy.oss-cn-hangzhou.aliyuncs.com/header%2F0ecf5c30-9964-4dcf-9700-379480b5f4ca.png","nickname":"zjxs","join_num":5,"rewardDaily":"2020-06-10"},{"rewardName":"一等奖","cardNO":"6636368","reward":{"gold":702500},"avatar":"http://fishjoy.oss-cn-hangzhou.aliyuncs.com/header%2F0ecf5c30-9964-4dcf-9700-379480b5f4ca.png","nickname":"zjxs","join_num":5,"rewardDaily":"2020-06-10"},{"rewardName":"二等奖","cardNO":"3363143","reward":{"gold":400500},"avatar":"http://fishjoy.oss-cn-hangzhou.aliyuncs.com/header%2F0ecf5c30-9964-4dcf-9700-379480b5f4ca.png","nickname":"zjxs","join_num":5,"rewardDaily":"2020-06-10"}],"daily":"2020-06-10"}
        // prefabFactory.instantiatePrefab(prefabFactory.GrabTreasureWinDrawList,this.node,(listNode)=>{
        //     listNode.getComponent(GrabTreasureWinDrawList).SetData(list.list);
        // });
    }

    public OnTreasureBoxButtonClicked()
    {
        // let json = {reward:{gold:1005000}};
        // this.showReardCanvas(json);
        this.callServerByClient("object.playerHandler.onGetChampionshipQuestList",JSON.stringify({}));
        //test
        // let list = [{"num":5,"reward":{"gold":25000},"questCount":1,"status":0},{"num":10,"reward":{"gold":300000},"questCount":1,"status":1},{"num":20,"reward":{"gold":70000},"questCount":2,"status":1}]
        // prefabFactory.instantiatePrefab(prefabFactory.GrabTreasureCompetiveBox,this.node,(boxNode)=>{
        //     boxNode.getComponent(GrabTreasureCompetiveBox).SetData(list);
        // });
    }

    public showReardCanvas(json) {
        // alert("showReardCanvas,json="+JSON.stringify(json));
		if (!json.reward) {
			return;
		}
		if (Utils.isLootEmpty(json.reward)) {
			return;
		}

		let rewards = json.reward;
		let rewardInfos = [];
		if (rewards.gold > 0) {
			let info = { id: GameConfig.GoldDropID, count: rewards.gold };
			rewardInfos.push(info);
		}
		if (rewards.jewel > 0) {
			let info = { id: GameConfig.DiamondDropID, count: rewards.jewel };
			rewardInfos.push(info);
		}
		if (rewards.items != null && rewards.items.length > 0) {
			rewardInfos = rewardInfos.concat(rewards.items);
		}
		if (rewardInfos.length > 0) {
			prefabFactory.instantiatePrefab(prefabFactory.RewardCanvas, this.node, (newNode) => {
				newNode.getComponent(RewardCanvas).SetData(rewardInfos, () => {

				});
			});
		}
	}

}
