var mysql = require('mysql');

var con = mysql.createConnection({
  host: '156.67.222.175',
  user: 'u651328475_facedetection',
  password: 'Facedetection123',
  database: 'u651328475_facedetection'
});

var conLocal = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'python'
});

con.connect(function (err) {
  if (err) throw err;
  console.log('Connected!');

  con.query('select * from faceencodings', function (err, result) {
    if (err) throw err;

    var values = [];
    for (var i = 0; i < result.length; i++) {
      values[i] = [result[i].id, result[i].encodings, result[i].frequency];
    }
    // conLocal.query('delete from faceencodings', function (err, result) {
    if (err) throw err;
    var sql = 'INSERT INTO faceencodings (id, encodings,frequency) VALUES ?';

    conLocal.query(sql, [values], function (err, result) {
      if (err) throw err;
    });
    // });
  });
});
