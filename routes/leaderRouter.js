const express = require('express');
const bodyParser = require('body-parser');

const Leaders = require('../models/leaders');

const leaderRouter = express.Router(); //declare dishRouter as an express Router

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.get((req, res, next) =>{
    Leaders.find({})
    .then((leader) =>{
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json')
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next)=>{
    Leaders.create(req.body)
    .then((leader) =>{
        console.log('Leader Created ', leader);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json')
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put((req, res, next)=>{
    res.statusCode = 403;
    res.end('put operation not supported on /leaders');
})
.delete((req, res, next) =>{
    Leaders.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json')
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

//leaders/:leaderId end points
leaderRouter.route('/:leaderId')
.get((req, res, next) =>{
    Leaders.findById(req.params.leaderId)
    .then((leader) =>{
        console.log('Leader Created ', leader);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json')
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post((req, res, next)=>{
    res.statusCode = 403;
    res.end('POST operation not supported on /leaders/'  + req.params.leaderId);
})
.put((req, res, next)=>{
    Leaders.findByIdAndUpdate(req.params.leaderId, {
        $set: req.body
    }, { new:true})
    .then((leader) =>{
        console.log('Leader Created ', leader);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json')
        res.json(leader);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete((req, res, next) =>{
    Leaders.findByIdAndRemove(req.params.leaderId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json')
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = leaderRouter;