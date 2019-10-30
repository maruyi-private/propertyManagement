import uniRequest from 'uni-request';
import store from '@/store/index.js';
import md5 from 'js-md5';


uniRequest.defaults.baseURL = store.state.baseUrl;
uniRequest.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

function showToast(title) {
	uni.showToast({
		icon: 'none',
		title: title
	})
}

function successState(res, data) {
	if (res) {
		if (res.status === 500) {
			showToast('500服务器访问失败');
			return;
		}
		if (res.data.status === 513) {
			showToast('请先缴清物业欠费');
			return;
		}
		

	}
}

function errorState(error) {
	showToast('您可能断网了，请重试！')
	// store.commit('logout');
}

//ascii排序
function sort_ASCII(obj) {
	var arr = new Array();
	var num = 0;
	for (var i in obj) {
		arr[num] = i;
		num++;
	}
	var sortArr = arr.sort();
	var sortObj = {};
	for (var i in sortArr) {
		sortObj[sortArr[i]] = obj[sortArr[i]];
	}
	return sortObj;
}
//对象转为字符串
function data_toStirng(obj) {
	let str = ''
	let arrayData = []
	Object.getOwnPropertyNames(obj).forEach(function(key) {
		if (obj[key]) {
			arrayData.push(key + '=' + obj[key]);
		}
	})
	for (let i = 0; i < arrayData.length; i++) {
		//最后一条数据
		let lastLength = arrayData.length - 1;
		//如果不是最后一条数据加上& 
		if (i !== lastLength) {
			str += arrayData[i] + '&'
		} else {
			str += arrayData[lastLength]
		}
	}
	return str;

}
//获取access_token
function accessToken(data) {
	let asciiData = sort_ASCII(data);
	let asciiData_toStirng = data_toStirng(asciiData);
	let md5data = md5(asciiData_toStirng);
	let upperCaseData = md5data.toUpperCase();
	return upperCaseData;
}


let requests = {}
requests.post = (url, data) => {
	
	//公用loginToken
	let objData = {};
	if(!store.state.login_token){
		objData = data;
	}else{
		let loginToken = {
			login_token: store.state.login_token
		}
	    objData = Object.assign(data, loginToken);
	}
	let access_token = accessToken(objData);
	uni.showLoading({
		title:'正在加载...'
	})
	let promise = new Promise(function(resolve, reject) {
		uniRequest.post(url + '?access_token=' + access_token, objData).then((res) => {
			uni.hideLoading();
			successState(res)
			if (res.data.code === 1) {
				resolve(res.data)
			}
		}).catch((response) => {
			
			uni.hideLoading();
			errorState(response)
			reject(response)
		});
	})
	return promise
}

export default requests;
