const mongoose = require('mongoose');
const router = require('express').Router();
const Challenges = mongoose.model('Challenges');


// POST new challenge route
router.post('/post', (req, res, next) => {
    const { body: { challenge } } = req;
    const finalChallenge = new Challenges(challenge);
    return finalChallenge.save()
        .then(() => res.json({challenge: finalChallenge.toJSON() }))
        .catch(err => console.log(err));
})

// delete challenge route
router.delete('/delete', (req, res, next) => {

})

// GET challenge route
router.get('/get', (req, res, next) => {
    const { payload: {id} } = req;

    return Challenges.findById(id)
        .then((cha) => {
            if (!cha) {
                return res.sendStatus(400);
            }
            return res.json({challenge: cha.toJSON()});
        });
});

module.exports = router;