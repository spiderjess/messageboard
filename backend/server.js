const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const boardRoutes = express.Router()
const PORT = 4000;


let Account = require('./accounts.model');
let Post = require('./posts.model');

app.use(cors());
app.use(bodyParser.json());


mongoose.connect('mongodb://127.0.0.1:27017/messageboard', { useNewUrlParser: true, useUnifiedTopology: true  });
const connection = mongoose.connection;

connection.once('open', function () {
    console.log("MongoDB database connection established successfully");
});


// to list all posts on the message board
boardRoutes.route('/').get(function (req, res) {
    Post.find(function (err, posts) {
        if (err) {
            console.log(err)
        } else {
            res.json(posts)
        }
    })
});

// all accounts
boardRoutes.route('/accounts').get(function (req, res) {
    Account.find(function (err, accounts) {
        if (err) {
            console.log(err)
        } else {
            res.json(accounts)
        }
    })
});


// for the password auth
boardRoutes.route('/username/:username/password/:password').get(function (req, res) {
    let userName = req.params.username;
    let passWord = req.params.password;
    Account.findOne({username: userName, password: passWord}, function (err, account) {
        res.json(account)
    })
});



// for login
boardRoutes.route('/:id').get(function (req, res) {
    let userId = req.params.id;
    Account.findById(userId, function (err, account) {
        res.json(account)
    })
});





// to create a new account
boardRoutes.route('/addAccount').post(function (req, res) {
    let account = new Account(req.body);
    account.save()
        .then(account => {
            res.status(200).json({ 'account': 'account added successfully' })
        })
        .catch(err => {
            res.status(400).send('Adding new account failed');
        })
});


// add a post to the message board
boardRoutes.route('/addPost').post(function (req, res) {
    let post = new Post(req.body);
    post.save()
        .then(post => {
            res.status(200).json({ 'post': 'post added successfully' })
        })
        .catch(err => {
            res.status(400).send('Adding new post failed');
        })
});


// add comment to a post
boardRoutes.route('/update/:id').post(function (req, res) {
    let id = req.params.id;
    Post.findById(id, function (err, post) {
        if (!post)
            res.status(404).send('data is not found');
        else

            post.comments = req.body.comments

        post.save().then(post => {
            res.json('Post updated')
        })
            .catch(err => {
                res.status(400).send("Update not possible")
            })
    });
});


// edit account info
boardRoutes.route('/edit/:id').post(function (req, res) {
    let id = req.params.id;
    Account.findById(id, function (err, account) {
        if (!account)
            res.status(404).send('data is not found');
        else

            account.password = req.body.password

        account.save().then(account => {
            res.json('Account updated')
        })
            .catch(err => {
                res.status(400).send("Update not possible")
            })
    });
});

// delete account
boardRoutes.route('/deleteAccount/:id').delete(function (req, res) {
    let accountDelete = req.params.id;
    Account.findByIdAndRemove(accountDelete)
        .exec()
        .then(doc => {
            if (!doc) { return res.status(404).end(); }
            return res.status(204).end();
        })
        .catch(err => next(err))
})

// delete Post
boardRoutes.route('/deletePost/:id').delete(function (req, res) {
    let postDelete = req.params.id;
    Post.findByIdAndRemove(postDelete)
        .exec()
        .then(doc => {
            if (!doc) { return res.status(404).end(); }
            return res.status(204).end();
        })
        .catch(err => next(err))
})



app.use('/messageboard', boardRoutes);

app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});

