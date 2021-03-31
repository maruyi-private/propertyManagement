"use strict";

const db = uniCloud.database();
const collection = db.collection("SYS_CITY");

exports.main = async (event, context) => {
	//event为客户端上传的参数
	
	const res = await collection.get();
	
	// const res = await collection.add([
	// 	{
	// 		"villageid": "10000000",
	// 		"villageaddr": "北京"
	// 	},
	// 	{
	// 		"villageid": "10010000",
	// 		"villageaddr": "上海"
	// 	},
	// 	{
	// 		"villageid": "10020000",
	// 		"villageaddr": "合肥"
	// 	},
	// 	{
	// 		"villageid": "10030000",
	// 		"villageaddr": "安庆"
	// 	}
	// ]);
	
	//返回数据给客户端
	return res;
};
