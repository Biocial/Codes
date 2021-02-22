var mysql = require('mysql');
var DateDiff = require('date-diff');

var servercon = mysql.createConnection({
  host: '156.67.222.175',
  user: 'u651328475_facedetection',
  password: 'Facedetection123',
  database: 'u651328475_facedetection'
});

var con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'python'
});

var dateTime = require('node-datetime');
var dt = dateTime.create();
var current_date = dt.format('Y-m-d');

var dt1 = dateTime.create();
var today_date = dt1.format('Y-m-d');

var signup_date = '';
var userid = '';
var totalDays = 0;

var HF_Users = [];

FirstProbability(function (ret) {
  Frequency();
});

var days = [7, 6, 5, 4, 3, 2, 1];
var totalDays = 7;
var frequentValue = 0;
var x = 0;

async function SevenDaysProbability(user_id) {
  var PreviousDate = current_date;

  var userid = user_id;

  dt = dateTime.create(current_date);

  for await (let i of days) {
    dt.offsetInDays(-1);
    PreviousDate = dt.format('Y-m-d');

    con.query(
      "select * from login where id='" +
        userid +
        "' and date='" +
        PreviousDate +
        "' ",
      async function (err, result1) {
        if (result1.length != 0) x = 1;
        else x = 0;
        frequentValue += i * x;
        if (result1.length != 0) userid = result1[0].id;
        if (i == 1) {
          con.query(
            "update faceencodings set frequency='" +
              frequentValue +
              "' where id='" +
              userid +
              "' ",
            async function (err, result) {}
          );
          frequentValue = 0;
        }
      }
    );
  }
}

async function FirstProbability(callback) {
  con.connect(function (err) {
    if (err) throw err;
    con.query('select * from faceencodings', async function (err, result) {
      if (err) throw err;
      for await (let user of result) {
        signup_date = user.signup_date;
        userid = user.id;

        var CurrentDate = new Date(today_date);
        var SignupDate = new Date(signup_date);
        var diff = new DateDiff(CurrentDate, SignupDate);
        totalDays = diff.days();

        con.query(
          'select * from login where id=?',
          userid,
          function (err, result) {
            if (err) throw err;

            userid = result[0].id;

            if (totalDays == result.length) {
              con.query(
                "update faceencodings set frequency='28' where id='" +
                  userid +
                  "' ",
                function (err, result) {}
              );
            } else SevenDaysProbability(userid);
            console.log(userid);
          }
        );
      }
    });
  });
  return callback('userid');
}

function Frequency() {
  con.query(
    'select frequency from faceencodings',
    async function (err, result1) {
      var limit = 0;
      for await (let res of result1) {
        limit += res.frequency;
      }
      limit = limit / result1.length;

      if (limit != 0) {
        Push_data(
          'select * from faceencodings where frequency >= ?',
          limit,
          'server',
          servercon,
          con,
          'local'
        );
        Push_data(
          'select * from faceencodings where frequency < ?',
          limit,
          'local',
          con,
          servercon,
          'server'
        );
      } else {
        Push_data(
          'select * from faceencodings where frequency = ?',
          limit,
          'local',
          con,
          servercon,
          'server'
        );
      }
    }
  );
}

function Push_data(sql, limit, status, con_get, con_set, upd_status) {
  con.query(sql, limit, async function (err, result1) {
    for await (let person of result1) {
      if (person.status == status) {
        con_get.query(
          'SELECT * FROM ' + person.id + ' ',
          async function (err, vertices, fields) {
            if (err) null;
            else {
              var data = [];
              for (var i = 0; i < vertices.length; i++) {
                data[i] = [vertices[i].id, vertices[i].vertices];
              }
              con_set.query(
                'create table IF NOT EXISTS ' +
                  person.id +
                  ' (id varchar(1000), vertices varchar(1000))',
                async function (err, result, fields) {
                  if (err) throw err;
                  if (result.warningCount == 0) {
                    var sql =
                      'INSERT INTO ' + person.id + '(id,vertices) VALUES ?';
                    con_set.query(sql, [data], function (err, fields) {
                      if (err) throw err;
                      con_get.query(
                        'drop table IF EXISTS ' + person.id + '',
                        async function (err, fields) {
                          if (err) throw err;
                        }
                      );
                      con.query(
                        "update faceencodings set status= '" +
                          upd_status +
                          "' where id='" +
                          person.id +
                          "'  ",
                        function (err, fields) {
                          if (err) null;

                          console.log('record updated');
                        }
                      );
                      console.log('record inserted');
                    });
                  }
                }
              );
            }
          }
        );
      }
    }
  });
}
