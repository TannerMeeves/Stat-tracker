const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
const users = require("./users.js");

//
// Stats
//

const User = users.model;
const validUser = users.valid;

// This is the schema for a stat
const statSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User"
    },
    makes: String,
    shottype: String,
    created: {
      type: Date,
      default: Date.now
    },
  });

  // The model for a stat
const Stat = mongoose.model('Stat', statSchema);

// get stats -- will list stats that a user has submitted
router.get('/', validUser, async (req, res) => {
    try {
      let stats = await Stat.find({
        user: req.user
      })
      return res.send({
        stats: stats
      });
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  });

  // create a stat
router.post('/', validUser, async (req, res) => {
    const stat = new Stat({
      user: req.user,
      makes: req.body.makes,
      shottype: req.body.shottype
    });
    try {
      await stat.save();
      return res.send({
        stat: stat
      });
    } catch (error) {
      console.log(error);
      return res.sendStatus(500);
    }
  });

router.delete('/:id', validUser, async (req, res) => {
    try {
      stat = await Stat.deleteOne({
          _id: req.params.id
      });
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
});

router.put('/:id', validUser, async (req, res) => {
    try {
      console.log("4");
      let stat = await Stat.findOne({
          _id: req.params.id
      });
      if (!stat) {
        res.send(404);
        return;
      }
      console.log("5");
      stat.makes = req.body.makes;
      stat.shottype = req.body.shottype;
      await stat.save();
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
});

  module.exports = {
    routes: router
  }
  
  
  

  