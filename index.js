const express = require('express');
const session = require('express-session');

const app = express();

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 7000 }
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
    req.session.a ? req.session.a++ : req.session.a = 1;
    console.log(req.session.a);
    if (req.session.daMuaVe) return res.send('Moi xem phim');
    res.send('Ban phai mua ve truoc');
});

const requireSignIn = (req, res, next) => {
    if (req.session.daMuaVe) return next();
    res.send('Ban phai mua ve truoc');
};
