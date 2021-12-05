const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const { Schema } = mongoose;

const TaskSchema = new mongoose.Schema( {
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        enum: ['study', 'wellness'],
        required: true,
    },
    difficulty: {
        type: String,
        enum: ['high', 'medium', 'low'],
        required: true,
    },
    isCompleted: {
        type: Boolean,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
});

const BuildingSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    cost: {
        type: Number,
        required: true,
    },
    xValue: {
        type: Number,
        required: true,
    },
    yValue: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    },
});

const ChallengeSchema = new Schema({
    createUserID: Number,
    taskID: Number,
    title: String,
    description: String,
    userEnrolled: [Number],
    isCompleted: Boolean,
    date: Date,
});

const UsersSchema = new Schema({
    email: String,
    hash: String,
    salt: String,
    buildings: [BuildingSchema],
    tasks: [TaskSchema],
    challenges: [ChallengeSchema],
    date: Date,
    wellness_point: Number,
    study_point: Number,
    gems: Number
});



UsersSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

UsersSchema.methods.validatePassword = function(password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    return this.hash === hash;
};

UsersSchema.methods.generateJWT = function() {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    return jwt.sign({
        email: this.email,
        id: this._id,
        exp: parseInt(expirationDate.getTime() / 1000, 10),
    }, 'secret');
};

UsersSchema.methods.toAuthJSON = function() {
    return {
        _id: this._id,
        email: this.email,
        token: this.generateJWT(),
        date: this.date,
        wellness_point: this.wellness_point,
        study_point: this.study_point,
        buildings: this.buildings,
        tasks: this.tasks,
        challenges: this.challenges,
        gems: this.gems
    };
};

ChallengeSchema.methods.toJSON = function () {
    return {
        _id: this._id,
        createUserID: this.createUserID,
        taskID: this.taskID,
        title: this.title,
        description: this.description,
        userEnrolled: this.userEnrolled,
        isCompleted: this.isCompleted,
        date: this.date
    }
}


mongoose.model("Challenges", ChallengeSchema);
mongoose.model('Users', UsersSchema);