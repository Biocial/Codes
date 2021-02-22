var mysql = require('mysql');
var userid;

var localcon = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'facedetection'
});

var servercon = mysql.createConnection({
  host: '156.67.222.175',
  user: 'u651328475_facedetection',
  password: 'Facedetection123',
  database: 'u651328475_facedetection'
});

localcon.connect(function (err) {
  if (err) throw err;
  console.log('Local Connected!');
});

servercon.connect(function (err) {
  if (err) throw err;
  console.log('Server Connected!');
});

localcon.query(
  'SELECT id FROM tempTableID ',
  async function (err, result, fields) {
    if (err) throw err;
    if (result.length != 0) GetData(result[0].id);

    localcon.query(
      'DELETE FROM tempTableID',
      async function (err, result, fields) {
        if (err) throw err;
      }
    );
  }
);

function GetData(id) {
  servercon.query(
    'SELECT * FROM ' + id + ' ',
    async function (err, vertices, fields) {
      if (err) throw err;
      var data = [];
      for (var i = 0; i < vertices.length; i++) {
        data[i] = [vertices[i].id, vertices[i].vertices];
        var sql = 'INSERT INTO tempTableEncodings(id,vertices) VALUES ?';
        localcon.query(sql, [data], async function (err, result, fields) {
          if (err) throw err;
        });
      }
    }
  );
}
