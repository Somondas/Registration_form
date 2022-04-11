// require packages used in the project
const express = require('express')
const app = express()
const path = require("path")
const port = process.env.PORT || 3000;
const hbs = require("hbs");
const bcrypt = require("bcrypt");
// register model-----------------
const Register = require('./models/register');
const { urlencoded } = require('express');
// require packages used in the project------------------------------------
app.use(express.json());
app.use(urlencoded({ extended: false }))


const static_path = path.join(__dirname, "./public");
const template_path = path.join(__dirname, "./templates/views")
// console.log(template_path);

app.use(express.static(static_path));
app.set("view engine", "hbs")
// for setting the views path 
app.set("views", template_path);
require("./db/conn");
// setting partials----------
const partials_path = path.join(__dirname, "./templates/partials")
hbs.registerPartials(partials_path)
// routes setting
app.get('/', (req, res) => {
  res.render("index")
})
app.get('/login', (req, res) => {
  res.render("login")
})



app.post('/register', async (req, res) => {
  const passwordhash = await bcrypt.hash(req.body.password, 10)
  try {
    const registerEmloyee = new Register({
      firstName: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      phone: req.body.phone,
      gender: req.body.gender,
      password: passwordhash
    })
    const resgistered = await registerEmloyee.save();
    res.status(201).render("done")
  } catch (e) {
    // console.log(e);
    res.status(500).send(e)
  }
})
app.post('/login', async (req, res) => {  
  try {
    const email = req.body.email
    const password = req.body.password
    const userinfo = await Register.findOne({ email: email })
    console.log(userinfo.password)
    // res.send(userinfo.
    const passwordVerify = await bcrypt.compare(userinfo.password, password)
    console.log(passwordVerify);
    if (passwordVerify) {
      res.status(201).render("done")
    } else {
      res.status(401).send("invalid")
    }
  } catch (e) {
    res.status(401).send(e)
  }

})
app.listen(port, () => {
  console.log("starting....");
})