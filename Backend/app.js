// require packages used in the project
const express = require('express')
const app = express()
const path = require("path")
const port = process.env.PORT || 3000;
const hbs = require("hbs");
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
app.post('/register', async (req, res) => {
  try {
    const registerEmloyee = new Register({
      firstName: req.body.firstname,
      lastname: req.body.lastname,
      email: req.body.email,
      phone: req.body.phone,
      gender: req.body.gender,
      password: req.body.password
    })
    const resgistered = await registerEmloyee.save();
    res.status(201).render("done")
  } catch (e) {
    // console.log(e);
    res.status(500).send(e)
  }
})
app.listen(port, () => {
  console.log("starting....");
})