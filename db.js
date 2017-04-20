const pg = require('pg');

const config = {
    host: 'ec2-54-235-72-121.compute-1.amazonaws.com',
    port: 5432,
    database: 'dads3trapa2una',
    user: 'nwcpbzteqnzdaa',
    password: '7fc0eec484c429224aea6a9523304c6ede2fede8e239e66eb3ebd9bef91e2dc4',
    ssl: true
};

const pool = new pg.Pool(config);


function query(sql, cb) {
    pool.connect((err, client, done) => {
        if (err) return cb(err);
        client.query(sql, (errQuery, result) => {
            if (errQuery) return cb(errQuery);
            cb(undefined, result);
        });
    });
}

module.exports = query;
