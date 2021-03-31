'use strict';

const db = uniCloud.database()
const collection = db.collection('SYS_ROOM')

exports.main = async (event, context) => {
	
	const res = await collection.where({
		unitid: event.unitid
	}).get()
	
	//event为客户端上传的参数
	// const res = collection.add([
	// 	{
	// 		'unitid': '10001000-00-A',
	// 		'roomnum': '0000'
	// 	},
	// 	{
	// 		'unitid': '10001000-00-A',
	// 		'roomnum': '0001'
	// 	},
	// 	{
	// 		'unitid': '10001000-00-A',
	// 		'roomnum': '0002'
	// 	},
	// 	{
	// 		'unitid': '10001000-00-A',
	// 		'roomnum': '0003'
	// 	},
	// 	{
	// 		'unitid': '10011000-00-A',
	// 		'roomnum': '0000'
	// 	},
	// 	{
	// 		'unitid': '10011000-00-A',
	// 		'roomnum': '0001'
	// 	},
	// 	{
	// 		'unitid': '10011000-00-A',
	// 		'roomnum': '0002'
	// 	},
	// 	{
	// 		'unitid': '10011000-00-A',
	// 		'roomnum': '0003'
	// 	},
	// 	{
	// 		'unitid': '10021000-00-A',
	// 		'roomnum': '0000'
	// 	},
	// 	{
	// 		'unitid': '10021000-00-A',
	// 		'roomnum': '0001'
	// 	},
	// 	{
	// 		'unitid': '10021000-00-A',
	// 		'roomnum': '0002'
	// 	},
	// 	{
	// 		'unitid': '10021000-00-A',
	// 		'roomnum': '0003'
	// 	},
	// 	{
	// 		'unitid': '10031000-00-A',
	// 		'roomnum': '0000'
	// 	},
	// 	{
	// 		'unitid': '10031000-00-A',
	// 		'roomnum': '0001'
	// 	},
	// 	{
	// 		'unitid': '10031000-00-A',
	// 		'roomnum': '0002'
	// 	},
	// 	{
	// 		'unitid': '10031000-00-A',
	// 		'roomnum': '0003'
	// 	}
	// ])
	
	//返回数据给客户端
	return res;
};
