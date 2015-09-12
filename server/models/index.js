var db = require('../db');


module.exports = {

  messages: {

    get: function (cb) {
      db.query(
        'SELECT messages.id,messages.text, users.username,rooms.roomname FROM messages INNER JOIN users ON messages.user_id = users.id INNER JOIN rooms ON messages.room_id = rooms.id',
        cb
      );
    },
    post: function (data, cb) {
      //query DB for user
        // null => insert, get,save id
          //else => get id
          //cB

      //query for room, same as above
        //cb

      //insert Msg in DB only when both ids above are obtained
      var userId;
      var roomId;
      var insertMessage = function(message){
        db.query('INSERT INTO messages(text, room_id, user_id) VALUES ("' + data.text + '",' + roomId +',' + userId + ")",
          cb          
        );
      };

      var roomCheck = function(room){
        db.query('SELECT id FROM rooms WHERE roomname = "' + data.roomname+'"', function(error, row){
          if(!row.length){
          db.query('INSERT INTO rooms(roomname) VALUES ("' + data.roomname+'")', function(error, result){
            roomId = result.insertId;
            insertMessage();
          });
          
          }else{
            roomId = row[0].id;
            insertMessage();
          }
        });
      };

      db.query('SELECT id FROM users WHERE username = "' + data.username+'"', function(error, row){
        if(!row.length){
          db.query('INSERT INTO users(username) VALUES ("' + data.username+'")', function(error, result){
            userId = result.insertId;
            roomCheck();
          });   
        }else{
          userId = row[0].id;
          roomCheck();
        }
      });
    }
      
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};

