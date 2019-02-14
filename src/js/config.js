
window.size=0;
(function (doc, win) {
    var docEl = doc.documentElement,
      // 手机旋转事件,大部分手机浏览器都支持 onorientationchange 如果不支持，可以使用原始的 resize
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        recalc = function () {
          //clientWidth: 获取对象可见内容的宽度，不包括滚动条，不包括边框
          var clientWidth = docEl.clientWidth;
          if (!clientWidth) return;

          docEl.style.fontSize = 50*(clientWidth / 750) + 'px';
          window.size=50*(clientWidth / 750);
        };
   
    recalc();
    //判断是否支持监听事件 ，不支持则停止
    if (!doc.addEventListener) return;
    //注册翻转事件
    win.addEventListener(resizeEvt, recalc, false);
   
  })(document, window);  
import 'babel-polyfill';
window.base={
    indexUrl:'//power.blockchaincentreglobal.com',
    apiUrl:'//power.api.blockchaincentreglobal.com', //local.test.com
    cookie:{
        set:function(name,value,time){
              var Days = time||1;
              var exp = new Date();
              exp.setTime(exp.getTime() + Days*24*60*60*1000);
              document.cookie = name + "="+ escape (value) + ";expires="+exp.toGMTString()+ ";path=/; domain=.blockchaincentreglobal.com";
        },
        get:function(name){
            var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
              if(arr=document.cookie.match(reg))
              return unescape(arr[2]);
              else
              return null;

        },
        del:function(name){
            var exp = new Date();
            exp.setTime(exp.getTime() - 1);
            var cval=Method.getCookie(name);
            if(cval!=null)
            document.cookie= name + "="+cval+";expires="+exp.toGMTString();
        }
    },
    loading(boll){
        $('.loadingDom').remove();
        if(!boll) return !1;
        let dom=`
          <div class="loading loadingDom">
             <div class="loadingBom">
                <div class="loadingQ"><img src=${base.indexUrl}/img/www/quan.png style="width:3.2rem;height:3.2rem;"></div>
                <div class="loadingImg"><img src=${base.indexUrl}/img/www/loading.png style="width:1.2rem;height:1.08rem;"></div>
             </div>
             
          </div>
          <div class="bg loadingDom" style="z-index:99"></div>
        `;
        $('body').append(dom)
    },
    prompt:function(err,code,time){
        //code为-1错误提示,0普通提示,1成功提示
        let div=document.createElement("div");
        div.id="tip";
        if(!!document.getElementById('tip')) document.body.removeChild(document.getElementById('tip'));
        if(typeof promptTime!='undefined'){
            clearTimeout(promptTime)
        }
        var str="<div class='promptMid' id='promptMid' style='position:fixed;line-height:.8rem;top:50%;left:50%;background:rgba(0,0,0,.5);box-shadow: 0px .08rem .32rem 0px rgba(0,0,0,0.1);border-radius:.16rem ;padding:.4rem .64rem;z-index: 999;'><p>";
        if(code==-1){
            str+='<em style="color:#fff;font-size: .56rem;">'+err+'</em></p></div>';
        }else if(code==0){
            str+='<em style="color:#fff;font-size: .56rem;">'+err+'</em></p></div>';
        }else if(code==1){
            str+='<em style="color:#fff;font-size: .56rem;>'+err+'</em></p></div>'
        };
        div.innerHTML+=str;
        document.body.appendChild(div);
        var width=document.getElementById('promptMid').clientWidth;
        var height=document.getElementById('promptMid').clientHeight;
        document.getElementById('promptMid').style.margin=`-${height/2}px 0 0 -${width/2}px`;
        window.promptTime=setTimeout(function() {
            document.body.removeChild(document.getElementById('tip'));
        }, time);
    },
    localRemove(){
        localStorage.most='';
        localStorage.mostTwo='';
        localStorage.mostThree='';
    }
    
};

//下面是继承
String.prototype.parseURL = function(){
    var url =this.toString()
    var a = document.createElement('a');
    a.href = url;
    return {
        source: url,
        protocol: a.protocol.replace(':', ''),
        host: a.hostname,
        port: a.port,
        query: a.search,
        file: (a.pathname.match(/\/([^\/?#]+)$/i) || [, ''])[1],
        hash: a.hash.replace('#', ''),
        path: a.pathname.replace(/^([^\/])/, '/$1'),
        relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [, ''])[1],
        segments: a.pathname.replace(/^\//, '').split('/'),
        params: (function() {
            var ret = {};
            var hash=!!a.hash.replace('#', '').split('?')[1]?a.hash.replace('#', '').split('?')[1]:'';
            var seg = hash.replace(/^\?/, '').split('&').filter(function(v,i){
                if (v!==''&&v.indexOf('=')) {
                    return true;
                }
            });
            seg.forEach( function(element, index) {
                var idx = element.indexOf('=');
                var key = element.substring(0, idx);
                var val = element.substring(idx+1);
                ret[key] = val;
            });
            return ret;
        })(),
        paramsUrl: (function() {
			var ret = {};
			var seg = a.search.replace(/^\?/, '').split('&').filter(function(v,i){
				if (v!==''&&v.indexOf('=')) {
					return true;
				}
			});
			seg.forEach( function(element, index) {
				var idx = element.indexOf('=');
				var key = element.substring(0, idx);
				var val = element.substring(idx+1);
				ret[key] = val;
			});
			return ret;
		})()
    };
};
window.requestAnimFrame = (function() {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
		function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
			return window.setTimeout(callback, 1000 / 60);
		};
})();
window.lang=require('./language/lang.js');

window.timeBol=false;






