const cors = require('cors');
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
var Bcrypte = require("bcrypt-nodejs");
const {google} = require('googleapis');
const {OAuth2} = google.auth;

const jwt = require("jsonwebtoken");
var nodemailer = require("nodemailer");
var async = require("async");
var crypto = require("crypto");

// Load input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");
// Load User model
const User = require("../models/user");
const client = new OAuth2(process.env.googleClientID)
// @route POST api/users/register
// @desc Register user
// @access Public
router.use(cors());
// router.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3001"); // update to match the domain you will make the request from
//   res.header("Access-Control-Allow-Credentials : true")
//   res.header("Access-Control-Allow-Methods : GET, POST, OPTIONS")
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });
router.post("/register_professor", (req, res) => {
    // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        return res.status(400).json({ email: "Email already exists" });
      } else {
        const newUser = new User({
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email,
          password: req.body.password,
          role:  "professor"  
        });
  // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    });
  });
  router.post("/register", (req, res) => {
    // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  User.findOne({ email: req.body.email }).then(user => {
      if (user) {
        return res.status(400).json({ email: "Email already exists" });
      } else {
        const newUser = new User({
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          email: req.body.email,
          password: req.body.password,
           
        });
  // Hash password before saving in database
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            newUser.password = hash;
            newUser
              .save()
              .then(user => res.json(user))
              .catch(err => console.log(err));
          });
        });
      }
    });
  });
  // @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
    // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  const email = req.body.email;
    const password = req.body.password;
  // Find user by email
    User.findOne({ email }).then(user => {
      // Check if user exists
      if (!user) {
        return res.status(404).json({ emailnotfound: "Email not found" });
      }
  // Check password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // User matched
          // Create JWT Payload
          const payload = {
            id: user.id,
            firsname: user.firstname
          };
  // Sign token
          jwt.sign(
            payload,
            process.env.secretOrKey,
            {
              expiresIn: 31556926 // 1 year in seconds
            },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
        } else {
          return res
            .status(400)
            .json({ passwordincorrect: "Password incorrect" });
        }
      });
    });
  });
  router.get("/allstudent",  (req, res) => {
    User.find({role:"student"}, (err, u) => {
        res.json(u)    })

})
router.get("/allprofessor",  (req, res) => {
  User.find({role:"professor"}, (err, u) => {
      res.json(u)    })

})
router.get("/nbStudent",  (req, res) => {
  User.find({role:"student"}, (err, u) => {
      res.json(u.length);
  })
})
router.get("/nbprofessor",  (req, res) => {
  User.find({role:"professor"}, (err, u) => {
      res.json(u.length);
  })
})
router.get("/:id", (req, res) => {
  var x = true


  User.findById({_id: req.params.id}, (err, c) => {
    console.log(c);

  res.json(c);

})
})
router.post('/forgot', function(req, res, next) {
  async.waterfall([
    function(done) {
      crypto.randomBytes(20, function(err, buf) {
        var token = buf.toString('hex');
        done(err, token);
      });
    },
    function(token, done) {
      User.findOne({ email: req.body.email }, function(err, user) {
        if (!user) {
          res.status(401).json("email n'existe pas")
        }
        user.resetPasswordToken = token;

        user.save(function(err) {
          done(err, token, user);
        });
      });
    },
    function(token, user, done) {
      var smtpTransport = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'meetopiaa@gmail.com',
          pass: 'Meetopiaa1.'
        }
      });
      //https://myaccount.google.com/lesssecureapps
      var mailOptions = {
        to: user.email,
        from: 'meetopiaa@gmail.com',
        subject: 'Node.js Password Reset',
        text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
            'Please click on the following link http://localhost:3001/auth/reset, and paste this code in the token placeholder that is in your browser to complete the process:\n\n'
            + token + '\n\n' +
            'If you did not request this, please ignore this email and your password will remain unchanged.\n'
      };
      smtpTransport.sendMail(mailOptions, function(err) {
        res.status(200).json("An e-mail has been sent to " + user.email + "with further instructions.")
        console.log('mail sent');
      });
    }
  ], function(err) {
    if (err) return next(err);
    res.redirect('/forgot');
  });
});
router.post('/reset', (req, res) =>{
  console.log("eee"+req.body.token )

  User.findOne({resetPasswordToken: req.body.token} ,(err,user)=> {
    if (!user) {
      res.status(401).json("email n'existe pas")
    }
    user.password= Bcrypte.hashSync(req.body.password, Bcrypte.genSaltSync(10));
    console.log("reset tttttttt "+user);
    user.save();
    res.status(200).json("c bon")

  });
}
);
router.post('/accepter', function(req, res, next) {
  User.findOne({email: req.body.email} , function (err,u) {
      async.waterfall([
          function() {
              var smtpTransport = nodemailer.createTransport({
                  service: 'Gmail',
                  auth: {
                      user: 'meetopiaa@gmail.com',
                      pass: 'Meetopiaa1.'
                  }
              });
              var mailOptions = {
                  to: req.body.email,
                  from: 'meetopiaa@gmail.com',
                  subject: 'Acceptation',
                  text: 'votre demande a été accepter vous pouvez maintenant connecté .\n\n'+
                      "utliser votre mail et mot de passe pour s'authentifier"
              };
              smtpTransport.sendMail(mailOptions, function(err) {
                  console.log('mail sent');

              });
          }])
      u.etat=true;
      u.save();

      res.status(200).json("vous pouvez maintenant connecter")
         });

});
router.post('/refuser', function(req, res, next) {
  User.findOne({email: req.body.email} , function (err,u) {
      async.waterfall([
          function() {
              var smtpTransport = nodemailer.createTransport({
                  service: 'Gmail',
                  auth: {
                      user: 'meetopiaa@gmail.com',
                      pass: 'Meetopiaa1.'
                  }
              });
              var mailOptions = {
                  to: req.body.email,
                  from: 'meetopiaa@gmail.com',
                  subject: 'Réfuse',
                  text: '\n' +
                      'your request has been rejected by the administrator please contact the administration.\n\n'
              };
              smtpTransport.sendMail(mailOptions, function(err) {
                  console.log('mail sent');

              });
          }])
      u.remove(u);

      res.status(200).json("votre demande refuser")
  });

});
router.post('/google_login', async (req, res) => {
  try {
    
      const {tokenId} = req.body
      console.log({tokenId});
      const verify = await client.verifyIdToken({idToken: tokenId, audience: process.env.googleClientID})
      console.log(verify);
      const {email_verified, email, given_name,family_name} = verify.payload
      console.log ({email_verified, email, given_name,family_name});

      const password = email + process.env.google_secret

      const passwordHash = await bcrypt.hash(password, 12)

      if(!email_verified) return res.status(400).json({msg: "Email verification failed."})

      const user = await User.findOne({ email: email })
         console.log("ddddd"+user);
      if(user){
        
          const isMatch = await bcrypt.compare(password, user.password)
          console.log("ddd"+isMatch);
          if(!isMatch) return res.status(400).json({msg: "Password is incorrect."})
          const payload = {
            id: user.id,
            firsname: user.firstname
          };
          jwt.sign(
            payload,
            process.env.secretOrKey,
            {
              expiresIn: 31556926 // 1 year in seconds
            },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
              });
            }
          );

          
      }else{
          const newUser = new User({
              firstname: given_name,lastname:family_name, email, password: passwordHash,
          })
          console.log("ffff"+newUser);

          await newUser.save().then(user => res.json(user))
          .catch(err => console.log(err));
          const payload = {
            id: newUser.id,
            firsname: newUser.firstname
          };
          jwt.sign(
            payload,
            process.env.secretOrKey,
            {
              expiresIn: 31556926 // 1 year in seconds
            },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
              });
            }
          );

          
      }


  } catch (err) {
      return res.status(500).json({msg: err.message})
  }
});



 module.exports = router;