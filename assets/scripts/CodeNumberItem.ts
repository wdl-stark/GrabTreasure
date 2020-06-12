
const {ccclass, property} = cc._decorator;

@ccclass
export default class CodeNumberItem extends cc.Component {

    @property(cc.Label) index: cc.Label = null;
    @property([cc.Label]) codeNumbers: cc.Label[] = [];

    public SetData(info,index0)
    {
        this.index.string = index0;
        if(info.cardNO!==null && info.cardNO.length !== 0)
        {
            let cardNo = info.cardNO.split("");
            this.codeNumbers.forEach((item,index)=>{
                if(index < cardNo.length)
                {
                    item.string = cardNo[index];
                }else{
                    item.string = "";
                }
            });
        }
    }
}
