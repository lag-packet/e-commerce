const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require('../models/User');
const { signToken } = require('../helpers/jwt');

const router = express.Router();

router.post('/register', (req, res) => {
    User.findOne({ email: req.body.email }).then((user) => {
        if (user) {
            return res.status(400).json({ email: 'Email already exists' });
        } else {
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then((user) => res.json(user))
                        .catch((err) => console.log(err));
                });
            });
        }
    });
});

router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email }).then((user) => {
        if (!user) {
            return res.status(404).json({ email: 'User not found' });
        }
        bcrypt.compare(password, user.password).then((isMatch) => {
            if (isMatch) {
                const token = signToken(user);
                res.json({
                    success: true,
                    token: 'Bearer ' + token,
                });
            } else {
                return res.status(400).json({ password: 'Incorrect password' });
            }
        });
    });
});

router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
    });
});

module.exports = router;