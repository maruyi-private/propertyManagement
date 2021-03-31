'use strict';

const db = uniCloud.database()
const collection = db.collection('SYS_PROJECT')

exports.main = async (event, context) => {
	const res = collection.where({
		villageid: event.villageid
	}).get();
	
	//event为客户端上传的参数
	// const res = collection.add([
	// 	{
	// 		villageid: '10000000',
	// 		projectid: '10001000',
	// 		projectname: '北京第一楼盘'
	// 	},
	// 	{
	// 		villageid: '10000000',
	// 		projectid: '10001001',
	// 		projectname: '北京第二楼盘'
	// 	},
	// 	{
	// 		villageid: '10000000',
	// 		projectid: '10001002',
	// 		projectname: '北京第三楼盘'
	// 	},
	// 	{
	// 		villageid: '10000000',
	// 		projectid: '10001003',
	// 		projectname: '北京第四楼盘'
	// 	},
	// 	{
	// 		villageid: '10010000',
	// 		projectid: '10011000',
	// 		projectname: '上海第一楼盘'
	// 	},
	// 	{
	// 		villageid: '10010000',
	// 		projectid: '10011001',
	// 		projectname: '上海第二楼盘'
	// 	},
	// 	{
	// 		villageid: '10010000',
	// 		projectid: '10011002',
	// 		projectname: '上海第三楼盘'
	// 	},
	// 	{
	// 		villageid: '10010000',
	// 		projectid: '10011003',
	// 		projectname: '上海第四楼盘'
	// 	},
	// 	{
	// 		villageid: '10020000',
	// 		projectid: '10021000',
	// 		projectname: '合肥第一楼盘'
	// 	},
	// 	{
	// 		villageid: '10020000',
	// 		projectid: '10021001',
	// 		projectname: '合肥第二楼盘'
	// 	},
	// 	{
	// 		villageid: '10020000',
	// 		projectid: '10021002',
	// 		projectname: '合肥第三楼盘'
	// 	},
	// 	{
	// 		villageid: '10020000',
	// 		projectid: '10021003',
	// 		projectname: '合肥第四楼盘'
	// 	},
	// 	{
	// 		villageid: '10030000',
	// 		projectid: '10031000',
	// 		projectname: '安庆第一楼盘'
	// 	},
	// 	{
	// 		villageid: '10030000',
	// 		projectid: '10031001',
	// 		projectname: '安庆第二楼盘'
	// 	},
	// 	{
	// 		villageid: '10030000',
	// 		projectid: '10031002',
	// 		projectname: '安庆第三楼盘'
	// 	},
	// 	{
	// 		villageid: '10030000',
	// 		projectid: '10031003',
	// 		projectname: '安庆第四楼盘'
	// 	}
	// ])
	
	//返回数据给客户端
	return res;
};
