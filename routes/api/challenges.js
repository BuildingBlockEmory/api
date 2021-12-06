const mongoose = require('mongoose');
const router = require('express').Router();
const Challenges = mongoose.model('Challenges');


// POST new challenge route
router.post('/insertOne', (req, res, next) => {
    const { body: { challenge } } = req;
    const finalChallenge = new Challenges(challenge);
    return finalChallenge.save()
        .then(() => res.json({challenge: finalChallenge.toJSON() }))
        .catch(err => console.log(err));
})

// delete challenge route
router.delete('/deleteOne', async (req, res, next) => {
    try {
        const response = await Challenges.deleteOne({id: req.body.id});
        res.json({msg: 'update success'});
    } catch(err) {
        res.json({msg: err});
    }
})

// Update existing challenge
router.put('/updateOne', async (req, res, next) => {
    try {
        const response = await Challenges.updateOne({id: req.body.id}, {
            createUserID: req.body.createUserID,
            taskID: req.body.taskID,
            title: req.body.title,
            description: req.body.description,
            userEnrolled: this.userEnrolled,
            isCompleted: this.isCompleted
        });
        res.json({msg: 'update success'});
    } catch (err) {
        res.json({msg: err});
    }
})

// GET single challenge route
router.get('/getOne', (req, res, next) => {
    const { payload: {id} } = req;

    return Challenges.findById(id)
        .then((cha) => {
            if (!cha) {
                return res.sendStatus(400);
            }
            return res.json({challenge: cha.toJSON()});
        });
});

// GET all challenges route
router.get('/getAll', async (req, res) => {
    try {
        const response = await Challenges.find({});
        res.json(response);
    } catch (error) {
        res.status(400).send(error);
    }
})

module.exports = router;