//使用npm安装mysql模块
//npm install mysql
var mysql = require('mysql');
//数据库连接设置
//为了能保存中文,数据库字符集和排序规则请分别设为utf-8和general ci
//注意:
//		当你在发出请求的时候执行connection.connect()，无论你在请求末尾是否使用了connection.end()，当你再次请求时，都会视为你进行了一次新的连接。
//		因此你需要执行创建新连接的操作
//		connection = mysql.createConnection(connection.config);
//		否则就会报错Cannot enqueue Handshake after invoking quit
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'test'
});

//连接数据库
connection.connect();

//查询
var  cxsql = 'SELECT * FROM user';
connection.query(cxsql,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
 
       console.log('--------------------------SELECT----------------------------');
       console.log(result);
       console.log('------------------------------------------------------------\n\n');  
});

//条件查询
var  cxsql = 'SELECT * FROM user where name=?';
var cxparam = 'dd';
connection.query(cxsql,cxparam,function (err, result) {
        if(err){
          console.log('[SELECT ERROR] - ',err.message);
          return;
        }
 
       console.log('--------------------------SELECT----------------------------');
       console.log(result);
       console.log('------------------------------------------------------------\n\n');  
});

//新增
var  addSql = 'INSERT INTO user(name,age) VALUES(?,?)';
var  addSqlParams = ['菜鸟工具', 15];
connection.query(addSql,addSqlParams,function (err, result) {
        if(err){
         console.log('[INSERT ERROR] - ',err.message);
         return;
        }        
 
       console.log('--------------------------INSERT----------------------------');
       //console.log('INSERT ID:',result.insertId);        
       console.log(result);        
       console.log('-----------------------------------------------------------------\n\n');  
});

//更新
var modSql = 'UPDATE user SET name = ?,age = ? WHERE id = ?';
var modSqlParams = ['菜鸟移动站', 18,1];
connection.query(modSql,modSqlParams,function (err, result) {
   if(err){
         console.log('[UPDATE ERROR] - ',err.message);
         return;
   }        
  console.log('--------------------------UPDATE----------------------------');
  console.log(result);
  console.log('-----------------------------------------------------------------\n\n');
});

//删除
var delSql = 'DELETE FROM user where id=2';
connection.query(delSql,function (err, result) {
        if(err){
          console.log('[DELETE ERROR] - ',err.message);
          return;
        }        
 
       console.log('--------------------------DELETE----------------------------');
       console.log(result);
       console.log('-----------------------------------------------------------------\n\n');  
});

//断开数据库连接
connection.end();