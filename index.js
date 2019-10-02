const express = require('express');
var app = express();
const bodyParser = require('body-parser');
var jwt = require('jsonwebtoken');
//var request = require("request");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const axios = require('axios');
const headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
 
//var token = '11b0d4027d7d18bdcaeeb4e250aee033';  
<<<<<<< HEAD
var token = 'bcc5d67b2692bd1bfa5ec95eadcb42e0';  

=======
>>>>>>> 04d29779fc357cf53cf992785bdd583915677bf3
var funcionCreate = 'core_user_create_users';
var moodleformat = 'json';
var username = 'liamneeson2';
var password = 'li@amR0cks!2';
var firstname = 'Liam2';
var lastname = 'Neeson2';
var email = 'est118891500@correo.com';
var respuesta="";

var funcionConsultar = 'core_user_get_users';
var criteriakey = 'username';
//nombre del usuario que desea hacer login

const createUser = () => {
  try {
      /*
    return axios.post('http://localhost/moodle/webservice/rest/server.php', {
        wstoken:'bcc5d67b2692bd1bfa5ec95eadcb42e0',
        wsfunction: 'core_user_create_users',
        moodlewsrestformat: 'json',
        users: [{username: 'liamneeson1',password: 'li@amR0cks!1', firstname: 'Liam1', lastname: 'Neeson1', email: 'liamneeson1@correo.com'}]
    }, {headers: headers})*/
    var urlCrearUsuario = 'http://localhost/moodle/webservice/rest/server.php?wstoken=' + token + "&wsfunction=" + funcionCreate 
    + "&moodlewsrestformat=" + moodleformat + "&users[0][username]=" + username +  "&users[0][password]=" + password + 
    "&users[0][firstname]=" + firstname +  "&users[0][lastname]=" + lastname + "&users[0][email]=" + email;
    console.log("url de crear usaurio: "  + urlCrearUsuario);
    return axios.post(urlCrearUsuario)
  } catch (error) {
    console.error(error)
  }
}

const getUser = () => {
    try{
      var urlGetUsuario = 'http://localhost/moodle/webservice/rest/server.php?wstoken=' + token + "&wsfunction=" + funcionConsultar 
      + "&moodlewsrestformat=" + moodleformat + "&criteria[0][key]=" + criteriakey +  "&criteria[0][value]=" + username;

      return axios.post(urlGetUsuario)
    } catch (error) {
      console.error(error)
    }
  }

<<<<<<< HEAD
const decodeToken = async (token) => {
  var result = ""
  jwt.verify(token, 'URL01.*', function(err, decoded) {
    result = decoded
    console.log("resutlado fun: " + decoded)
=======
const decodeToken = (token) => {
  var result = ""
  jwt.verify(token, 'URL01.*', function(err, decoded) {
    result = decoded
>>>>>>> 04d29779fc357cf53cf992785bdd583915677bf3
  });
  return result;
}

const conectarPortalAuxiliar = async () => {
    const usuario = getUser()
    .then(response => {
        /*console.log(
            response.config
        )
        console.log(
            response.data
        )*/
        if (response.data.users.length) {
            console.log(
                "Bienvenido " + username
            )
        }
        else{
            console.log(
                "Se creara nuevo usuario " + username
            )
            createUser();
        }
    })
    .catch(error => {
        console.log(error)
    })	
}

//conectarPortalAuxiliar();
var router = express.Router();


app.get('/conectar', function (req, res) {
  return res.send('Hello world');
 });
 
 app.get('/conectar/:nombre', function (req, res) {
  return res.send('Hello world', {output: req.params.nombre});
 });

var router = express.Router();

app.post('/detokenizer', function (req, res) {
  result = ""
  if(!req.body.user || !req.body.token) {
    res = {
     error: true,
     codigo: 502,
     mensaje: 'Se necesita token y usuario'
    };
   } else {
      username=req.body.user
      token = req.body.token

      decode = decodeToken(token)
      result = decode
      console.log("this is the decoded token: ")
      console.log(decode)
   }
   
   res.send(decode);
 });

 app.post('/login', function (req, res) {
  result = ""
  if(!req.body.user || !req.body.token) {
    respuesta = {
     error: true,
     codigo: 502,
     mensaje: 'Se necesita token y usuario'
    };
    res.send(respuesta);
   } else {
      username=req.body.user
      tokenEncriptado = req.body.token
      const decode = decodeToken(tokenEncriptado)
      password = decode.password,
      email = decode.email,
      console.log("this is the decoded token: "),
      console.log(decode),
      console.log(decode.password),
      usuario  = conectarPortalAuxiliar(username, req.body.token)
      .then(
        respuesta = {
          error: false,
          codigo: 200,
          mensaje: username,
          }
          ,console.log(
            "se consumio por el usuario:   " + username
          ),
          console.log(
            'url de redireccionamiento: http://localhost/moodle/login/index.php?username=est1188915&password='+ encodeURIComponent(password) + '&Submit=Login'
          ),
        res.redirect('http://localhost/moodle/login/index.php?username=est1188915&password='+ encodeURIComponent(password) + '&Submit=Login')
      )
      
      
   }
   
   //res.send(respuesta);
  });

  app.post('/prueba3', function (req, res) {
   res.redirect('/conectar');
  });

 app.listen(process.env.PORT || 3003);

/*
<form action="http://your.moodle.net/moodle/login/index.php" method="post" name="form" id="form">
  <p><input type="text" name="username" size="15" /></p>
  <p><input type="password" name="password" size="15" /></p>
  <p><input type="submit" name="Submit" value="Login" /></p>
</form>

*/ 
