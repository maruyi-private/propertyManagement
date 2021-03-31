'use strict';

const db = uniCloud.database()
const collection = db.collection('SYS_UNIT')

exports.main = async (event, context) => {
	//event为客户端上传的参数
	
	const res = await collection.where({
		towerid: event.towerid
	}).get()
	
	// const res = await collection.add([
	// 	{
	// 		'towerid': '10001000-00',
	// 		'unitid': '10001000-00-A',
	// 		'unit': '一单元'
	// 	},
	// 	{
	// 		'towerid': '10001000-00',
	// 		'unitid': '10001000-00-B',
	// 		'unit': '二单元'
	// 	},
	// 	{
	// 		'towerid': '10001000-00',
	// 		'unitid': '10001000-00-C',
	// 		'unit': '三单元'
	// 	},
	// 	{
	// 		'towerid': '10001000-00',
	// 		'unitid': '10001000-00-D',
	// 		'unit': '四单元'
	// 	},
	// 	{
	// 		'towerid': '10001000-00',
	// 		'unitid': '10011000-00-A',
	// 		'unit': '一单元'
	// 	},
	// 	{
	// 		'towerid': '10001000-00',
	// 		'unitid': '10011000-00-B',
	// 		'unit': '二单元'
	// 	},
	// 	{
	// 		'towerid': '10001000-00',
	// 		'unitid': '10011000-00-C',
	// 		'unit': '三单元'
	// 	},
	// 	{
	// 		'towerid': '10001000-00',
	// 		'unitid': '10011000-00-D',
	// 		'unit': '四单元'
	// 	},
	// 	{
	// 		'towerid': '10001000-00',
	// 		'unitid': '10021000-00-A',
	// 		'unit': '一单元'
	// 	},
	// 	{
	// 		'towerid': '10001000-00',
	// 		'unitid': '10021000-00-B',
	// 		'unit': '二单元'
	// 	},
	// 	{
	// 		'towerid': '10001000-00',
	// 		'unitid': '10021000-00-C',
	// 		'unit': '三单元'
	// 	},
	// 	{
	// 		'towerid': '10001000-00',
	// 		'unitid': '10021000-00-D',
	// 		'unit': '四单元'
	// 	},
	// 	{
	// 		'towerid': '10001000-00',
	// 		'unitid': '10031000-00-A',
	// 		'unit': '一单元'
	// 	},
	// 	{
	// 		'towerid': '10001000-00',
	// 		'unitid': '10031000-00-B',
	// 		'unit': '二单元'
	// 	},
	// 	{
	// 		'towerid': '10001000-00',
	// 		'unitid': '10031000-00-C',
	// 		'unit': '三单元'
	// 	},
	// 	{
	// 		'towerid': '10001000-00',
	// 		'unitid': '10031000-00-D',
	// 		'unit': '四单元'
	// 	}
	// ])
	
	//返回数据给客户端
	return res;
};
