var express = require('express');
var router = express.Router();
var connection =require('../config/connection');
/* GET home page. */
router.get('/', function(req, res, next) {
    connection.query('SELECT*FROM user',function(err,rows){
      if(err) throw err;
      //console.log(rows);
      res.render('index',{users:rows});
    })
    });


router.post('/adduser',function(req,res){
  const userdata={
    fname:req.body.fname,
    lname:req.body.lname,
    email:req.body.email,
    role:req.body.role,
  }
  //console.log(userdata);
  connection.query('INSERT INTO user SET?',userdata,function(err,result){
    if(err) throw err;
    res.redirect('/');
  })
  
});


router.get('/deleteuser/:id',function(req,res){
  var userid=req.params.id;
  connection.query('DELETE FROM user WHERE id= ?',[userid],function(err,result){
    if(err) throw err;
    res.redirect('/');
  })
});

router.get('/updateuser/:id',function(req,res){
  var userid=req.params.id;
  connection.query('SELECT*FROM user WHERE id= ?',[userid],function(err,result){
    if(err) throw err;
    res.render('edit',{users:result});
  })
});

router.post('/edituser/:id',function(req,res){
 
  var  fname=req.body.fname;
  var lname=req.body.lname;
  var email=req.body.email;
  var role=req.body.role;
  var userid=req.params.id;
  //console.log(userdata);
  connection.query('UPDATE user SET fname=?,lname=?,email=?,role=? WHERE id=?',[fname,lname,email,role,userid],function(err,result){
    if(err) throw err;
    res.redirect('../../');
  })
  
});

module.exports = router;
