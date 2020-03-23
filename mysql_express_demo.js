//使用npm安装express框架
//npm install express
//npm install body-parser
//npm install cookie-parser
//npm install multer
var express = require('express');
var app = express();
//用于处理 JSON, Raw, Text 和 URL 编码的数据
var bodyParser = require('body-parser');
//用于处理 enctype="multipart/form-data"（设置表单的MIME编码）的表单数据来上传文件
var multer  = require('multer');
//用来操作文件
var fs = require("fs");

//使用npm安装mysql模块
//npm install mysql
var mysql = require('mysql');

// 设置 application/x-www-form-urlencoded 编码解析,用于解析post请求的参数
app.use(bodyParser.urlencoded({ extended: false }));

//设置静态文件路径,可以直接访问这个路径下的静态文件,比如http://127.0.0.1:8081/public/images/logo.png
app.use('/public', express.static('public'));

//数据库连接设置
//为了能保存中文,数据库字符集和排序规则请分别设为utf-8和general ci
var connectionObj = {
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'test'
};

//  主页输出 "Hello World"
app.get('/',function(req,res){
	console.log("主页 GET 请求");
	res.send('Hello GET');
})

//  POST 请求
app.post('/',function(req,res){
	console.log("主页 POST 请求");
	res.send('Hello POST');
})

//  注册
app.get('/register',function(req,res){
	console.log("/register GET 请求");
	
	// 输出 JSON 格式,设置response编码为utf-8,解决返回中文乱码问题
	res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
	
	//创建新的数据库连接
	//	当你在发出请求的时候执行connection.connect()，无论你在请求末尾是否使用了connection.end()，当你再次请求时，都会视为你进行了一次新的连接。
	//	因此你需要执行创建新连接的操作
	//	connection = mysql.createConnection(connection.config);
	//	否则就会报错Cannot enqueue Handshake after invoking quit
	var connection = mysql.createConnection(connectionObj);
	//连接数据库
	connection.connect();
	
	//新增
	var  sql = 'INSERT INTO user(username,password,nick) VALUES(?,?,?)';
	var  params = [req.query.username,req.query.password,req.query.nick];
	connection.query(sql,params,function (err, result) {
		//断开数据库连接
		connection.end();
		
		if(err){
			// 输出 JSON 格式
			var obj = {
				code:100,
				msg:'注册失败'
			};
			res.end(JSON.stringify(obj));
			return;
		}
		
		// 输出 JSON 格式
		var obj = {
			code:200,
			msg:'注册成功'
		};
		res.end(JSON.stringify(obj));
	});
})

//  登录
app.get('/login',function(req,res){
	console.log("/login GET 请求");
	
	// 输出 JSON 格式,设置response编码为utf-8,解决返回中文乱码问题
	res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
	
	//创建新的数据库连接
	//	当你在发出请求的时候执行connection.connect()，无论你在请求末尾是否使用了connection.end()，当你再次请求时，都会视为你进行了一次新的连接。
	//	因此你需要执行创建新连接的操作
	//	connection = mysql.createConnection(connection.config);
	//	否则就会报错Cannot enqueue Handshake after invoking quit
	var connection = mysql.createConnection(connectionObj);
	//连接数据库
	connection.connect();
	
	//条件查询
	var sql = 'SELECT * FROM user where username=? and password=?';
	var  params = [req.query.username,req.query.password];
	connection.query(sql,params,function (err, result) {
		//断开数据库连接
		connection.end();
		
		if(err){
			// 输出 JSON 格式
			var obj = {
				code:100,
				msg:'登录失败'
			};
			res.end(JSON.stringify(obj));
			return;
		}
		
		if(result.length==0){
			// 输出 JSON 格式
			var obj = {
				code:100,
				msg:'用户名或密码错误'
			};
			res.end(JSON.stringify(obj));
			return;
		}
		
		// 输出 JSON 格式
		var obj = {
			code:200,
			msg:'登录成功',
			data:result
		};
		res.end(JSON.stringify(obj));
	});
})

//  收藏
app.get('/collect',function(req,res){
	console.log("/collect GET 请求");
	
	// 输出 JSON 格式,设置response编码为utf-8,解决返回中文乱码问题
	res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
	
	//创建新的数据库连接
	//	当你在发出请求的时候执行connection.connect()，无论你在请求末尾是否使用了connection.end()，当你再次请求时，都会视为你进行了一次新的连接。
	//	因此你需要执行创建新连接的操作
	//	connection = mysql.createConnection(connection.config);
	//	否则就会报错Cannot enqueue Handshake after invoking quit
	var connection = mysql.createConnection(connectionObj);
	//连接数据库
	connection.connect();
	
	//条件查询
	var sql = 'INSERT INTO collect(user_id,movie_id,movieObj) VALUES(?,?,?)';
	var  params = [req.query.user_id,req.query.movie_id,req.query.movieObj];
	connection.query(sql,params,function (err, result) {
		//断开数据库连接
		connection.end();
		
		if(err){
			// 输出 JSON 格式
			var obj = {
				code:100,
				msg:'收藏失败'
			};
			res.end(JSON.stringify(obj));
			return;
		}
		
		// 输出 JSON 格式
		var obj = {
			code:200,
			msg:'收藏成功'
		};
		res.end(JSON.stringify(obj));
	});
})

//  取消收藏
app.get('/uncollect',function(req,res){
	console.log("/uncollect GET 请求");
	
	// 输出 JSON 格式,设置response编码为utf-8,解决返回中文乱码问题
	res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
	
	//创建新的数据库连接
	//	当你在发出请求的时候执行connection.connect()，无论你在请求末尾是否使用了connection.end()，当你再次请求时，都会视为你进行了一次新的连接。
	//	因此你需要执行创建新连接的操作
	//	connection = mysql.createConnection(connection.config);
	//	否则就会报错Cannot enqueue Handshake after invoking quit
	var connection = mysql.createConnection(connectionObj);
	//连接数据库
	connection.connect();
	
	//条件查询
	var sql = 'DELETE FROM collect where user_id=? and movie_id=?';
	var  params = [req.query.user_id,req.query.movie_id];
	connection.query(sql,params,function (err, result) {
		//断开数据库连接
		connection.end();
		
		if(err){
			// 输出 JSON 格式
			var obj = {
				code:100,
				msg:'取消收藏失败'
			};
			res.end(JSON.stringify(obj));
			return;
		}
		
		// 输出 JSON 格式
		var obj = {
			code:200,
			msg:'取消收藏成功'
		};
		res.end(JSON.stringify(obj));
	});
})

//  查询是否收藏
app.get('/isCollect',function(req,res){
	console.log("/isCollect GET 请求");
	
	// 输出 JSON 格式,设置response编码为utf-8,解决返回中文乱码问题
	res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
	
	//创建新的数据库连接
	//	当你在发出请求的时候执行connection.connect()，无论你在请求末尾是否使用了connection.end()，当你再次请求时，都会视为你进行了一次新的连接。
	//	因此你需要执行创建新连接的操作
	//	connection = mysql.createConnection(connection.config);
	//	否则就会报错Cannot enqueue Handshake after invoking quit
	var connection = mysql.createConnection(connectionObj);
	//连接数据库
	connection.connect();
	
	//条件查询
	var sql = 'SELECT * FROM collect where user_id=? and movie_id=?';
	var  params = [req.query.user_id,req.query.movie_id];
	connection.query(sql,params,function (err, result) {
		//断开数据库连接
		connection.end();
		
		if(err){
			// 输出 JSON 格式
			var obj = {
				code:100,
				msg:'查询收藏失败'
			};
			res.end(JSON.stringify(obj));
			return;
		}
		
		if(result.length==0){
			// 输出 JSON 格式
			var obj = {
				code:200,
				msg:'未收藏',
				data:false
			};
			res.end(JSON.stringify(obj));
		}else{
			// 输出 JSON 格式
			var obj = {
				code:200,
				msg:'已收藏',
				data:result
			};
			res.end(JSON.stringify(obj));
		}
		
	});
})

//  获取用户收藏
app.get('/getUserCollect',function(req,res){
	console.log("/getUserCollect GET 请求");
	
	// 输出 JSON 格式,设置response编码为utf-8,解决返回中文乱码问题
	res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});
	
	//创建新的数据库连接
	//	当你在发出请求的时候执行connection.connect()，无论你在请求末尾是否使用了connection.end()，当你再次请求时，都会视为你进行了一次新的连接。
	//	因此你需要执行创建新连接的操作
	//	connection = mysql.createConnection(connection.config);
	//	否则就会报错Cannot enqueue Handshake after invoking quit
	var connection = mysql.createConnection(connectionObj);
	//连接数据库
	connection.connect();
	
	//条件查询
	var sql = 'SELECT * FROM collect where user_id=?';
	var  params = ''+req.query.user_id;
	connection.query(sql,params,function (err, result) {
		//断开数据库连接
		connection.end();
		
		if(err){
			// 输出 JSON 格式
			var obj = {
				code:100,
				msg:'查询收藏失败'
			};
			res.end(JSON.stringify(obj));
			return;
		}
		
		// 输出 JSON 格式
		var obj = {
			code:200,
			msg:'获取用户收藏成功',
			data:result
		};
		res.end(JSON.stringify(obj));
		
	});
})


var server = app.listen(8081,function(){
	var host = server.address().address;
	var port = server.address().port;
	console.log("应用实例，访问地址为 http://%s:%s",host,port);
})
