var express = require('express');
var Owners = require('../models/owners');

var router = express.Router();

router.get('/', function(req,res){
    Owners.retrieveAll(function(err, owners){
        if(err) return res.json(err);
        return res.json(owners);
    });
});

router.post('/', function(req,res){
    var owner = req.body.owner;

    Owners.Insert(owner, function(err,res){
        if(err) return res.json(err);
        return res.json(owners);
    });
});

module.exports = router;