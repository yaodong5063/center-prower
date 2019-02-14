import axios from 'axios';

const ajaxFun = function(serviceUrl,paramData,callback,err){
	let t = localStorage.getItem('token');
	axios({
		method:'post',
		url:serviceUrl,
	  baseURL: base.apiUrl,
	  timeout: 30000,
	  headers: {
      'lang':localStorage.lang
		},
	  //withCredentials:true,
	  data:paramData,
	}).then(function(res){
		
		return callback(res.data);
	}).catch(function (error) {
		return err(error);
  });
};
const ajaxWx = function(serviceUrl,paramData,callback,err){
	axios({
		method:'post',
		url:serviceUrl,
	  baseURL: base.apiUrl,
	  timeout: 30000,
	  //withCredentials:true,
	  data:paramData,
	}).then(function(res){
		
		return callback(res.data);
	}).catch(function (error) {
		return err(error);
  });
};
const ajaxParam = function(serviceUrl,callback,err){
  //	let t = localStorage.getItem('token');
    axios({
      method:'get',
      url:serviceUrl,
      baseURL: base.apiUrl,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'lang':localStorage.lang,
        
      },
      timeout: 30000
    }).then(function(res){
      
      return callback(res.data);
    }).catch(function (error) {
      
      return err(error);
    });
  };

let ajaxService={};
//getEinlass
ajaxService.getEinlass = function(req, callback,err) {
  return ajaxParam("/api/honeycomb/getEinlass"+req, callback,err)
}
//screenShow
ajaxService.screenShow = function(req, callback,err) {
  return ajaxParam("/api/honeycomb/screenShow"+req, callback,err)
}

//accountValidate
ajaxService.accountValidate = function(req, callback,err) {
  return ajaxFun("/api/honeycomb/accountValidate",req, callback,err)
}
//getPoems
ajaxService.getPoems = function(req, callback,err) {
  return ajaxFun("/api/honeycomb/getPoems",req, callback,err)
}
//addUser
ajaxService.addUser = function(req, callback,err) {
  return ajaxFun("/api/honeycomb/addUser",req, callback,err)
}
//updateUser
ajaxService.updateUser = function(req, callback,err) {
  return ajaxFun("/api/honeycomb/updateUser",req, callback,err)
}
//wxConfig
// ajaxService.wxConfig = function(req, callback,err) {
//   return ajaxWx("/api/honeycomb/wxConfig",req, callback,err)
// }

module.exports =ajaxService;

