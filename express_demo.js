//使用npm安装express框架
//npm install express
//npm install body-parser
//npm install cookie-parser
//npm install multer
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// 设置 application/x-www-form-urlencoded 编码解析,用于解析post请求的参数
app.use(bodyParser.urlencoded({ extended: false }));

//设置静态文件路径,可以直接访问这个路径下的静态文件,比如http://127.0.0.1:8081/public/images/logo.png
app.use('/public', express.static('public'));


//  主页输出 "Hello World"
app.get('/',function(req,res){
	console.log("主页 GET 请求");
	// 输出 JSON 格式,设置response编码为utf-8,解决返回中文乱码问题
	res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
	res.send('Hello GET');
})

//  POST 请求
app.post('/',function(req,res){
	console.log("主页 POST 请求");
	// 输出 JSON 格式,设置response编码为utf-8,解决返回中文乱码问题
	res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
	res.send('Hello POST');
})

//  GET请求返回字符串或页面代码到浏览器
app.get('/del_user',function(req,res){
	console.log("/del_user 响应 DELETE 请求");
	// 输出 JSON 格式,设置response编码为utf-8,解决返回中文乱码问题
	res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
	res.send('删除页面');
})

//  GET请求返回json格式数据
app.get('/list_user',function(req,res){
	console.log("/list_user GET 请求");
	// 输出 JSON 格式,设置response编码为utf-8,解决返回中文乱码问题
	res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
	// 输出 JSON 格式
	var response = [
		{name:'111',age:25},
		{name:'222',age:33}
	];
	response.push({
		name:req.query.name,
		age:req.query.age
	});
	console.log(response);
	res.end(JSON.stringify(response));
})

//  POST请求返回json格式数据
app.post('/gethhh',function(req,res){
	// 输出 JSON 格式,设置response编码为utf-8,解决返回中文乱码问题
	res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
	// 输出 JSON 格式
	var response = [
		{name:'111',age:25},
		{name:'222',age:33}
	];
	response.push({
		name:req.body.name,
		age:req.body.age
	});
	console.log(response);
	res.end(JSON.stringify(response));
})

// 对页面 abcd, abxcd, ab123cd, 等响应 GET 请求
app.get('/ab*cd',function(req,res){
	console.log("/ab*cd GET 请求");
	// 输出 JSON 格式,设置response编码为utf-8,解决返回中文乱码问题
	res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
	res.send('正则匹配');
})

var server = app.listen(8081,function(){
	var host = server.address().address;
	var port = server.address().port;
	console.log("应用实例，访问地址为 http://%s:%s",host,port);
})