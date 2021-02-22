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
  "SELECT * FROM faceencodings where status<>'completed' ",
  async function (err, userid, fields) {
    if (err) throw err;
    var data = [];
    for await (let person of userid) {
      var sql = 'INSERT INTO faceencodings(id,name,signup_date) VALUES ?';
      data[0] = [person.id, person.name, person.signup_date];
      servercon.query(sql, [data], function (err, fields) {
        if (err) throw err;
        console.log('record inserted');
      });

      localcon.query(
        "update faceencodings set status='completed' where id='" +
          person.id +
          "' ",
        async function (err, fields) {
          if (err) throw err;
        }
      );
    }
  }
);

localcon.query(
  "SELECT * FROM login where status<>'completed' ",
  async function (err, userid, fields) {
    if (err) throw err;
    var data = [];
    for await (let person of userid) {
      var sql = 'INSERT INTO login(id,date) VALUES ?';
      data[0] = [person.id, person.date];
      servercon.query(sql, [data], function (err, fields) {
        if (err) throw err;
        console.log('record inserted');
      });

      localcon.query(
        "update login set status='completed' where id='" +
          person.id +
          "' and date='" +
          person.date +
          "' ",
        async function (err, fields) {
          if (err) throw err;
        }
      );
    }
  }
);
