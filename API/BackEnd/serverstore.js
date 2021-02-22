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
  'SELECT id FROM faceencodings',
  async function (err, userid, fields) {
    if (err) throw err;

    for await (let person of userid) {
      localcon.query(
        'SELECT * FROM ' + person.id + ' ',
        async function (err, vertices, fields) {
          if (err) throw err;
          var data = [];
          for (var i = 0; i < vertices.length; i++) {
            data[i] = [vertices[i].id, vertices[i].vertices];
          }

          servercon.query(
            'create table IF NOT EXISTS ' +
              person.id +
              ' (id varchar(1000), vertices varchar(1000))',
            async function (err, result, fields) {
              if (err) throw err;
              if (result.warningCount == 0) {
                var sql = 'INSERT INTO ' + person.id + '(id,vertices) VALUES ?';
                servercon.query(sql, [data], function (err, fields) {
                  if (err) throw err;
                  console.log('record inserted');
                });
              }
            }
          );

          localcon.query(
            "update faceencodings set status='completed' where id='" +
              person.id +
              "' ",
            async function (err, fields) {
              if (err) throw err;
            }
          );
          localcon.query(
            'drop table ' + person.id + '',
            async function (err, fields) {
              if (err) throw err;
            }
          );
        }
      );
    }
  }
);
