function convertNumber2String(temp: number) {
	let res: any = "";
	let part;
	if (temp >= 100000000) {
		if (temp % 100000000 === 0) {
			part = temp / 100000000;
			res = part.toFixed(0) + '亿';
		} else {
			part = temp / 100000000;
			res = part.toFixed(2) + '亿';
		}
	} else if (temp >= 10000) {
		if (temp % 10000 === 0) {
			part = temp / 10000;
			res = part.toFixed(0) + '万';
		} else {
			part = temp / 10000;
			res = part.toFixed(2) + '万';
		}
	} else {
		res = temp;
	}
	return res;
}

function getCountDownTime(value: number) {
	let secondTime = parseInt(`${value}`);// 秒
	let minuteTime = 0;// 分
	let hourTime = 0;// 小时
	if (secondTime > 60) {
		// 如果秒数大于60，将秒数转换成整数
		// 获取分钟，除以60取整数，得到整数分钟
		minuteTime = parseInt(`${secondTime / 60}`);
		// 获取秒数，秒数取佘，得到整数秒数
		secondTime = parseInt(`${secondTime % 60}`);
		// 如果分钟大于60，将分钟转换成小时
		if (minuteTime > 60) {
			// 获取小时，获取分钟除以60，得到整数小时
			hourTime = parseInt(`${minuteTime / 60}`);
			// 获取小时后取佘的分，获取分钟除以60取佘的分
			minuteTime = parseInt(`${minuteTime % 60}`);
		}
	}
	let secStr = secondTime >= 10 ? "" + secondTime : "0" + secondTime;
	let minStr = minuteTime >= 10 ? "" + minuteTime : "0" + minuteTime;
	let hourStr = hourTime >= 10 ? "" + hourTime : "0" + hourTime;
	let result = hourStr + ":" + minStr + ":" + secStr;
	return result;
}


function isLootEmpty(loot: any) {
	if (!!loot) {
		if (loot.hasOwnProperty("gold") && loot.gold > 0) {
			return false;
		}
		if (loot.hasOwnProperty("jewel") && loot.jewel > 0) {
			return false;
		}
		if (loot.hasOwnProperty("items") && Array.isArray(loot.items)) {
			if (loot.items.length === 0) {
				return true;
			}
			let items = loot.items;
			let flag = items.some((item: any) => {
				if (item.hasOwnProperty("count")) {

					return item.count > 0;
				}
				return false;
			});
			return !flag;
		}
	}
	return true;
}
function loadHeaderImg(sprite,url)
{
	try{
		cc.loader.load(url, (error, texture) => {
			try {
				if(sprite != null && cc.isValid(sprite) && sprite.node != null) {
					sprite.spriteFrame = new cc.SpriteFrame(texture);
				}
			} catch (error) {
				// console.log("loadSpriteFrame error:", error);
			}
		});
	}catch(err){
		console.error(err);
	}
}

function loadPropsSprite(sprite, id) {

    cc.loader.loadRes("Props/" + id, cc.SpriteFrame, function (err, spriteFrame) {
        if(err) {
            // console.log("打印报错信息:", err);
            return;
        }
        try {
            if(sprite != null && cc.isValid(sprite) && sprite.node != null){
                sprite.spriteFrame = spriteFrame;
            }
        } catch (error) {
            // console.log("LoadPropsSprite error:", error);
        }
    });
};

const WordNumberMap = new Map<String,any>();
WordNumberMap.set("特等奖",0);
WordNumberMap.set("一等奖",1);
WordNumberMap.set("二等奖",2);
WordNumberMap.set("三等奖",3);
WordNumberMap.set("入围奖",4);
WordNumberMap.set("未中奖",5);

export default {
    convertNumber2String: convertNumber2String,
	getCountDownTime:getCountDownTime,
	isLootEmpty:isLootEmpty,
	loadHeaderImg:loadHeaderImg,
	loadPropsSprite:loadPropsSprite,
	WordNumberMap:WordNumberMap
}