var express = require('express');
const { redirect } = require('express/lib/response');
var router = express.Router();
var fs=require('fs')

router.get('/', function(req, res, next) {
  fs.readdir('./files',function(err,files){
    res.render('index', { files,filenames:"",data:"" });
  })
});

router.get('/formtext',function(req,res){
  fs.writeFile(`./files/${req.query.fname}`,"",function(err,data){
    if(err)
    res.send(err)
    else
    res.redirect('/')
  })
})

router.get('/delete/%20:user',function(req,res){
  fs.unlink(`./files/${req.params.user}`,function(err,data){
    if(err)
    res.send(req.params.user)
    else
    res.redirect('/')
  })
})

router.get('/screen/%20:user',function(req,res){
  fs.readFile(`./files/${req.params.user}`,'utf8',function(err,data){
    fs.readdir(`./files`,function(err,files){
      res.render('index',{ files,filenames: req.params.user ,data })
    })
  })
})

router.post('/save/:user',function(req,res){
  fs.writeFile(`./files/${req.params.user}`,req.body.tarea,function(err){
    if(err)
    res.send(err)
    else
    res.redirect(`/screen/%20${req.params.user}`)
  })
})

module.exports = router;
