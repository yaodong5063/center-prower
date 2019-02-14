import axios from 'axios';

const ajaxFun = function(serviceUrl,paramData,callback,err){
	let t = localStorage.getItem('token');
	axios({
		method:'post',
		url:serviceUrl,
	  baseURL: '//power.api.blockchaincentreglobal.com',
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
      baseURL: '//power.api.blockchaincentreglobal.com',
      timeout: 30000
    }).then(function(res){
      
      return callback(res.data);
    }).catch(function (error) {
      
      return err(error);
    });
  };

let ajaxService={};
//accountValidate
ajaxService.userPaging = function(req, callback,err) {
  return ajaxFun("/api/honeycomb/userPaging",req, callback,err)
}

module.exports =ajaxService;

