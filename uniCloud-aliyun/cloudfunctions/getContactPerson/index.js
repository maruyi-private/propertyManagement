'use strict';

const db = uniCloud.database()
const collection = db.collection('SYS_CONTACT_PERSON')

exports.main = async (event, context) => {
	//event为客户端上传的参数
	const res = await collection.where({
		login_token: event.userId
	}).get()
	
	//返回数据给客户端
	return res;
};
