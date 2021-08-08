var cool = require('cool-ascii-faces');
var express = require('express');
var app = express();
fvar db = require('./db_operations.js')
const cors = require('cors');

var bodyParser = require('body-parser');

app.use(bodyParser.json({limit: '50mb', extended: true})); // for parsing application/json


app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/app'));

app.use(cors());

app.get('/', function(request, response) {
  response.send('Welcome Home');
});

app.get('/getHistory', function(req, res){
 db.get_all_rows(db.conn(), res);
})

app.post('/setData', function(req, res){
  num1 = req.body.num1;
  num2 = req.body.num2;
  result = req.body.result;
  db.insert_data(db.conn(), num1, num2, result, res)
})

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
