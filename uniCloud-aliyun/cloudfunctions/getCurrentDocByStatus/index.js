'use strict';

const db = uniCloud.database()
const collection_re = db.collection('TY_REPORT_REPAIR')
const collection_con = db.collection('SYS_CONTACT_PERSON')

exports.main = async (event, context) => {
	//event为客户端上传的参数
	const res_con = await collection_con.where({
		login_token: event.userId
	}).get();
	
	const contacts = res_con.data;
	const res_re = [];
	for(var item in contacts) {
		let res = await collection_re.where({
			contact: item.id,
			state: event.status
		}).get();
		if(res.data.length > 0) {
			res_re.push(res.data);
		}
	}
	
	//返回数据给客户端
	return res_re;
};
