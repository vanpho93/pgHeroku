const express = require('express');
const session = require('express-session');

const app = express();

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.listen(process.env.PORT || 3000, () => console.log('Server start!'));

app.get('/', (req, res) => res.send('Still alive!!!'));

app.get('/user', (req, res) => {
    require('./db')('SELECT * FROM "User"', (err, result) => {
        if (err) return res.send('LOI: ' + err);
        res.send(result.rows);
    });
});

app.get('/muave', (req, res) => {
    req.session.daMuaVe = true;
    res.send('Ban da mua ve');
});

app.get('/vaorap', (req, res) => {
    if (req.session.daMuaVe) {
        res.send('Moi xem phim');
    } else {
        res.send('Ban phai mua ve truoc');
    }
});
