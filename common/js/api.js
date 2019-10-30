import store from '@/store/index.js';
import uniRequest from './request.js';

let apis = {}

 
 
 
//文件上传
apis.uploadRequest = (url,img) =>{
	return new Promise(resolve =>{
		uni.uploadFile({
			url:store.state.baseUrl + url,
			files:img,
			success(response){
				resolve(response)
			},
			fail(error){
				console.log("error: " + JSON.stringify(error));
			}
		})
	})
}
export default apis;
