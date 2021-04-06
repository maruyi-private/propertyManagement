'use strict';

const db = uniCloud.database()
const collection = db.collection('TY_NOTICE')

exports.main = async (event, context) => {
	//event为客户端上传的参数
	const res = await collection.skip((parseInt(event.page) - 1) * 10)
								.limit(parseInt(event.limit))
								.get();
	//返回数据给客户端
	return res;
};
