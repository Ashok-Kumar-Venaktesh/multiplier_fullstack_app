var mysql = require('mysql');

var DB_NAME    = 'multiplier',
    HOST       = 'localhost',
    USER       = 'root',
    PASSWORD   = 'password',
    TABLE_NAME = 'results'


var conn = function(){
  return mysql.createConnection({
    host: HOST,
    user: USER,
    password: PASSWORD,
    database: DB_NAME
  })
}


var create_db = function(){
  var conn = mysql.createConnection({
    host: HOST,
    user: USER,
    password: PASSWORD
  });

  conn.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    conn.query("CREATE DATABASE " + DB_NAME, function (err, result) {
      if (err) throw err;
      console.log("Database created");
    });
  });
}


var create_table = function(conn){
  console.log('create table called');
  conn.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "CREATE TABLE " + TABLE_NAME + " (Number1 INT, Number2 INT, Result INT)";
    conn.query(sql, function (err, result) {
      if (err) throw err;
      console.log("Table created");
    });
  });
}


var insert_data = function(conn, n1, n2, r, res){
  console.log("inserting data");
  conn.connect(function(err) {
  if (err) throw err;
    console.log("Connected!");
    var sql = "DELETE from " + TABLE_NAME;
    conn.query(sql, function (err) {
      if (err) throw err;
      console.log("delete successful");
      var sql = "INSERT INTO " +  TABLE_NAME + " (Number1, Number2, Result) VALUES ('"+ n1 + "','" + n2 + "','" + r + "')";
      conn.query(sql, function (err, result) {
        if (err) throw err;
        console.log("insertion successful");
        res.send('success')
      });
    });
  });
}

var rows_data = function(data){
  return data
}

var get_all_rows = function(conn, res){
  console.log("get all data");
  conn.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "SELECT * FROM " + TABLE_NAME + " LIMIT 1";
    conn.query(sql, function (err, result) {
      if (err) throw err;
      res.send(result[0])
    })
  });
}

var get_data = function(conn){
  console.log("get canvas data");
  conn.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "SELECT * FROM projects";
    conn.query(sql, function (err, result) {
      if (err) throw err;
      console.log(result);
    })
  });
}


module.exports = {
  insert_data:     insert_data,
  get_all_rows:    get_all_rows,
  conn:            conn
}

// step1 create db
// create_db(conn());

// step 2 create table
// create_table(conn());