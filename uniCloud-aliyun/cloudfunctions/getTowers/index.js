'use strict';

const db = uniCloud.database()
const collection = db.collection('SYS_TOWER')

exports.main = async (event, context) => {
	
	const res = collection.where({
		projectid: event.projectid
	}).get()
	
	//event为客户端上传的参数
	// const res = await collection.add([
	// 	{
	// 		'projectid': '10001000',
	// 		'towerid': '10001000-00',
	// 		'block': '第一栋'
	// 	},
	// 	{
	// 		'projectid': '10001001',
	// 		'towerid': '10001001-00',
	// 		'block': '第一栋'
	// 	},
	// 	{
	// 		'projectid': '10001002',
	// 		'towerid': '10001002-00',
	// 		'block': '第一栋'
	// 	},
	// 	{
	// 		'projectid': '10001003',
	// 		'towerid': '10001003-00',
	// 		'block': '第一栋'
	// 	},
	// 	{
	// 		'projectid': '10011000',
	// 		'towerid': '10011000-00',
	// 		'block': '第一栋'
	// 	},
	// 	{
	// 		'projectid': '10011001',
	// 		'towerid': '10011001-00',
	// 		'block': '第一栋'
	// 	},
	// 	{
	// 		'projectid': '10011002',
	// 		'towerid': '10011002-00',
	// 		'block': '第一栋'
	// 	},
	// 	{
	// 		'projectid': '10011003',
	// 		'towerid': '10011003-00',
	// 		'block': '第一栋'
	// 	},
	// 	{
	// 		'projectid': '10021000',
	// 		'towerid': '10021000-00',
	// 		'block': '第一栋'
	// 	},
	// 	{
	// 		'projectid': '10021001',
	// 		'towerid': '10021001-00',
	// 		'block': '第一栋'
	// 	},
	// 	{
	// 		'projectid': '10021002',
	// 		'towerid': '10021002-00',
	// 		'block': '第一栋'
	// 	},
	// 	{
	// 		'projectid': '10021003',
	// 		'towerid': '10021003-00',
	// 		'block': '第一栋'
	// 	},
	// 	{
	// 		'projectid': '10031000',
	// 		'towerid': '10031000-00',
	// 		'block': '第一栋'
	// 	},
	// 	{
	// 		'projectid': '10031001',
	// 		'towerid': '10031001-00',
	// 		'block': '第一栋'
	// 	},
	// 	{
	// 		'projectid': '10031002',
	// 		'towerid': '10031002-00',
	// 		'block': '第一栋'
	// 	},
	// 	{
	// 		'projectid': '10031003',
	// 		'towerid': '10031003-00',
	// 		'block': '第一栋'
	// 	}
	// ])
	
	//返回数据给客户端
	return res;
};
