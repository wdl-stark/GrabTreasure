
export  let prefabFactory = {
    GrabTreasureCompetiveBox:"Prefabs/GrabTreasureCompetiveBox",
    GrabTreasureConvert:"Prefabs/GrabTreasureConvert",
    GrabTreasureRule:"Prefabs/GrabTreasureRule",
    GrabTreasureWinDrawList:"Prefabs/GrabTreasureWinDrawList",
    RewardCanvas:"Prefabs/RewardCanvas",
    instantiatePrefab:function(path, parentNode, callBack = null) {
        cc.loader.loadRes(path, function(err, prefab) {
            if(err) {
                console.log("err: ", err);
            } else {
                let newNode = cc.instantiate(prefab);
                try {
                    if (cc.isValid(newNode) && cc.isValid(parentNode)) {
                        newNode.parent = parentNode;
                        if(callBack != null) {
                            callBack(newNode);
                        }
                    }
                } catch (error) {
                    console.log(path + " error: ", error);
                }
            }
        });
    },
    preAddPrefab :function(path) {
        cc.loader.loadRes(path, (err, prefab) => {
            if(err) {
                // console.log("err: ", err);
            } else {
                // console.log("prefab success:", prefab);
            }
        });
    }
}
window.prefabFactory = prefabFactory;