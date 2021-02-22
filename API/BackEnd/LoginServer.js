var mysql = require('mysql');
var schedule = require('node-schedule');
// var connection = require('./Temp');

var userid;

var localcon = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'python'
});

// var servercon = mysql.createConnection({
//   host: '156.67.222.175',
//   user: 'u651328475_facedetection',
//   password: 'Facedetection123',
//   database: 'u651328475_facedetection'
// });

localcon.connect(function (err) {
  if (err) null;
  localcon.query(
    'select * from serverconnection',
    async function (err, result) {
      var servercon = mysql.createConnection({
        host: result[0].hostname,
        user: result[0].username,
        password: result[0].password,
        database: result[0].dbname
      });
      servercon.connect(function (err) {
        if (err) null;
        console.log('Server Connected!');
      });

      schedule.scheduleJob('* * * * * *', function () {
        localcon.query(
          'SELECT id FROM tempTableID ',
          async function (err, result, fields) {
            if (err) null;
            if (result.length != 0) GetData(result[0].id);
          }
        );
      });

      function GetData(id) {
        servercon.query(
          'SELECT * FROM ' + id + ' ',
          async function (err, vertices, fields) {
            if (err) null;
            var data = [];
            localcon.query(
              'DELETE FROM tempTableEncodings',
              async function (err, result, fields) {
                if (err) null;
              }
            );
            var data = [];
            for (var i = 0; i < vertices.length; i++) {
              data[i] = [vertices[i].id, vertices[i].vertices];
            }
            var sql = 'INSERT INTO tempTableEncodings(id,vertices) VALUES ?';
            localcon.query(sql, [data], async function (err, result, fields) {
              if (err) null;
              localcon.query(
                'DELETE FROM tempTableID',
                async function (err, result, fields) {
                  if (err) null;
                }
              );
            });
          }
        );
      }
    }
  );
});
