'use strict';
const db = uniCloud.database()
const collection = db.collection('TY_REPORT_REPAIR')

exports.main = async (event, context) => {
	//event为客户端上传的参数
	const res = await collection.doc(event.id).update({
		state: event.state,
		evaluate: {
			point: event.point,
			content: event.point
		}
	});
	
	//返回数据给客户端
	return res;
};
