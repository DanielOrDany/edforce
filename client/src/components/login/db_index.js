var { Pool } = require('pg');

const CONNECTION_STRING = process.env.DATABASE_URL || 'postgres://zsztnpbvuacctg:487c7abe7ab689f7d4c38692c25eb7eb0475f4a0a6f7c316308fcc922b948d30@ec2-54-217-234-157.eu-west-1.compute.amazonaws.com:5432/dfuvh4cick4ngf';

class Database {
    constructor () {
          this._pool = new Pool({
            connectionString: CONNECTION_STRING,
            ssl: true
          });

          this._pool.on('error', (err, client) => {
            console.error('Unexpected error on idle PostgreSQL client.', err);
            process.exit(-1);
          });
      
    }
    
    query (query, ...args) {
        this._pool.connect((err, client, done) => {
          if (err) throw err;
          const params = args.length === 2 ? args[0] : [];
          const callback = args.length === 1 ? args[0] : args[1];
    
          client.query(query, params, (err, res) => {
            done();
            if (err) {
              console.log(err.stack);
              return callback({ error: 'Database error.' }, null);
            }
            callback({}, res.rows);
          });
        });
    
    }

    insert_user(username, email, password) {
        this.query("INSERT INTO owners (username, email, password) VALUES ('$1', '$2', '$3')", [username, email, password]);
    }

    end () {
        this._pool.end();

    }
}

module.exports = new Database();