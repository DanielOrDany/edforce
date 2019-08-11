const db = require('../database');

class Owners {
    static retrieveAll (callback){
        db.query('select * from owners', function(err,res) {
            if (err.error){
                console.log('select');
                return callback(err);
            } 
            callback(res);
        });
    }

    static Insert (owner, callback){
        db.query('INSERT INTO owners (id, username, email, password, start_date) VALUES ('+'gen_random_uuid(),'+owner.username+','+owner.email+','+owner.password+','+owner.start_date+')', function(err,res){
            if (err.error){
                console.log('insert');
                return callback(err);
            } 
            callback(res);
        });
    }
}

module.exports = Owners;