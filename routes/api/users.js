const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
const Users = mongoose.model('Users');


//POST new user route (optional, everyone has access)
//We create a new user with email and password this way

router.post('/', auth.optional, (req, res, next) => {
    const { body: { user } } = req;

    // if there is no email
    if(!user.email) {
        return res.status(422).json({
            errors: {
                email: 'is required',
            },
        });
    }

    // if there is no password
    if(!user.password) {
        return res.status(422).json({
            errors: {
                password: 'is required',
            },
        });
    }

    // if the password is too short
    if (user.password.length < 6) {
        return res.status(422).json({
            errors: {
                password: 'too short',
            },
        });
    }

    // if the email has already been registered


    Users.findOne({email: user.email})
        .then(single_user => {
            if (single_user) {
                // user already exists
                return res.status(422).json({
                    errors: {
                        email: 'already registered',
                    },
                });
            } else {
                // user does not exist and make a new user
                const finalUser = new Users(user);

                finalUser.setPassword(user.password);

                return finalUser.save()
                    .then(() => res.json({ user: finalUser.toAuthJSON() }))
                    .catch(err => console.log(err));
            }
        })
        .catch(err => console.error(`Failed to find document: ${err}`));


});

// update single user task list
router.put('/updateUserTasks', auth.required, async (req, res, next) => {
    const { payload: { id } } = req;
    const { body: { user } } = req;
    Users.findOneAndUpdate({ _id: id },
        { $set: {
                tasks: user.tasks }
        }, {upsert: false}, (err, doc) => {
            if (err) {
                return res.status(422).json({
                    errors: {
                        password: 'cannot update',
                    },
                });
            } else {
                return res.json({ user: doc.toAuthJSON() })
            }
        })
})

// update single user building
router.put('/updateUserBuilding', auth.required, async (req, res, next) => {
    const { payload: { id } } = req;
    const { body: { user } } = req;
    Users.findOneAndUpdate({ _id: id },
        { $set: {
                buildings: user.buildings }
        }, {upsert: false}, (err, doc) => {
            if (err) {
                return res.status(422).json({
                    errors: {
                        password: 'cannot update',
                    },
                });
            } else {
                return res.json({ user: doc.toAuthJSON() })
            }
        })
})


// update single user study points
router.put('/updateUserStudy', auth.required, async (req, res, next) => {
    const { payload: { id } } = req;
    const { body: { user } } = req;
    Users.findOneAndUpdate({ _id: id },
        { $set: {
                study_point: user.study_point }
        }, {upsert: false}, (err, doc) => {
            if (err) {
                return res.status(422).json({
                    errors: {
                        password: 'cannot update',
                    },
                });
            } else {
                return res.json({ user: doc.toAuthJSON() })
            }
        })
})

// update single user wellness points
router.put('/updateUserWellness', auth.required, async (req, res, next) => {
    const { payload: { id } } = req;
    const { body: { user } } = req;
    Users.findOneAndUpdate({ _id: id },
        { $set: {
                wellness_point: user.wellness_point }
        }, {upsert: false}, (err, doc) => {
            if (err) {
                return res.status(422).json({
                    errors: {
                        password: 'cannot update',
                    },
                });
            } else {
                return res.json({ user: doc.toAuthJSON() })
            }
        })
})

// update single user challenge
router.put('/updateUserChallenges', auth.required, async (req, res, next) => {
    const { payload: { id } } = req;
    const { body: { user } } = req;
    Users.findOneAndUpdate({ _id: id },
        { $set: {
                challenges: user.challenges }
        }, {upsert: false}, (err, doc) => {
            if (err) {
                return res.status(422).json({
                    errors: {
                        password: 'cannot update',
                    },
                });
            } else {
                return res.json({ user: doc.toAuthJSON() })
            }
        })
})


//PUT existing user route
//We update a user this way
router.put('/update', auth.required, async (req, res, next) => {
    const { payload: { id } } = req;
    const { body: { user } } = req;
    Users.findOneAndUpdate({ _id: id },
        { $set: {
            wellness_point: user.wellness_point,
            study_point: user.study_point,
            buildings: user.buildings,
            tasks: user.tasks,
            challenges: user.challenges,
            gems: user.gems }
        }, {upsert: false}, (err, doc) => {
            if (err) {
                return res.status(422).json({
                    errors: {
                        password: 'cannot update',
                    },
                });
            } else {
                return res.json({ user: doc.toAuthJSON() })
            }
        })

})

//POST login route (optional, everyone has access)
//We get a new token everytime we call this

router.post('/login', auth.optional, (req, res, next) => {
    const { body: { user } } = req;

    if(!user.email) {
        return res.status(422).json({
            errors: {
                email: 'is required',
            },
        });
    }

    if(!user.password) {
        return res.status(422).json({
            errors: {
                password: 'is required',
            },
        });
    }

    return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
        if(err) {
            return next(err);
        }

        if(passportUser) {
            const user = passportUser;
            user.token = passportUser.generateJWT();

            return res.json({ user: user.toAuthJSON() });
        }

        return res.status(400).send(info);
    })(req, res, next);
});

//GET current route (required, only authenticated users have access)
//We only need the token to retrieve the data

router.get('/current', auth.required, (req, res, next) => {
    const { payload: { id } } = req;

    return Users.findById(id)
        .then((user) => {
            if(!user) {
                return res.sendStatus(400);
            }

            return res.json({ user: user.toAuthJSON() });
        });
});

module.exports = router;
