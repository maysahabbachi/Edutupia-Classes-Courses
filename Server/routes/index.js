var express = require('express');
var router = express.Router();
const Group = require('../models/group');
const Project = require('../models/project')
const User = require('../models/user')

/* GET home page. */
router.get('/', async function(req, res, next) {
  // console.log( await User.find())
  // const newProject = new Project({title: 'fshgfdd', topic: 'sdhgfdhghdf', tasks: []})
  // newProject.save()
  // const newGroup = new Group({name: 'outsiders', description: 'ksou7 sa7bi', members: [await User.findById('60620a9e0e90f21b2442790e'), await User.findById('60620a6a0e90f21b2442790d') ]})
  // newGroup.save()
  res.render('index', { title: 'Express' });
});

module.exports = router;
