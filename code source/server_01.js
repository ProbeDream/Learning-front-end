//通过window.Jquery就会返回一个节点对象!
window.jQuery = function(nodeOrSelector){
  let nodes = {}
  nodes.addClass = function(){}
  nodes.html = function(){}
  return nodes
}
//将window.jQuery赋值给$
window.$ = window.jQuery

//ES6析构赋值法!
window.jQuery.ajax = function({url, method, body, success, fail}){
  //创建一个XMLHTTPRequest对象 赋值给一个声明好的变量!
  let request = new XMLHttpRequest()
  request.open(method, url); //配置request
  let  headers={
      'content-type':'application/x-www-form-urlencoded',
      'ProbeDream': '18'
    }
  for(let key in headers) {
    let value = headers[key]
    request.setRequestHeader(key, value)
  }
  //onreadystatechange 只要 readyState 属性发生变化，就会调用相应的处理函数
  request.onreadystatechange = ()=>{
  	// XMLHttpRequest  代理当前所处的状态 当readyState表示请求操作已完成!
    if(request.readyState === 4){
    //当请求状态码为200或者是大于200的时候和小于300的时候 表示请求成功!	
      if(request.status >= 200 && request.status < 300){
      	//调用success 并且传入请求响应文本!
        success.call(undefined, request.responseText)
      }else if(request.status >= 400){
      	//如果说请求状态码 为大于或者是等于400的时候 表示请求失败! 调用fail 传入的参数为request!
        fail.call(undefined, request)
      }
    
    }
  }
  //最后调用send方法 发送body!
  request.send(body)
}
//声明函数f1
function f1(responseText){}
//声明函数f2
function f2(responseText){}

//myButton添加一个时间监听器  当点击事件触发后 就会进行异步请求!
myButton.addEventListener('click', (e)=>{
  window.jQuery.ajax({
    url: '/frank',
    method: 'get',
    //异步请求成功后调用
    success: (x)=>{
      //请求成功后 就会调用f1,f2函数
      f1.call(undefined,x)
      f2.call(undefined,x)
    },
    //异步请求失败后
    fail: (x)=>{
      console.log(x)
      console.log(x.status)
      console.log(x.responseText)
    }
  })
})