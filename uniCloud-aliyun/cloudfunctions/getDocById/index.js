'use strict';

const db = uniCloud.database()
const collection = db.collection('TY_REPORT_REPAIR')
const collection_user = db.collection('SYS_CONTACT_PERSON')
const collection_house = db.collection('TY_HOUSE')

exports.main = async (event, context) => {
	//event为客户端上传的参数
	const res = await collection.doc(event.id).get();
	const res_user = await collection_user.where({
		id: res.data[0].contact
	}).get();
	const res_house = await collection_house.where({
		ownerInfo: {
			login_token: res_user.data[0].login_token
		}
	}).get()
	res.data[0] = {
		...res.data[0],
		name: res_user.data[0].name,
		tel: res_user.data[0].tel,
		villagename: res_house.data[0].ownerInfo.villagename,
		room: res_house.data[0].ownerInfo.roomnum
	};
	
	//返回数据给客户端
	return res;
};
