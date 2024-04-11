const express = require("express");
const router = express.Router()
const { login , register} = require("../controllers/auth");


router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    let response = {
        error: 1,
        mensaje: "Datos incompletos"
    }

    if(email && password) {
       response = await login(email, password)
    }
    res.send(response)
});

router.post('/register',  async (req, res) => {
    const { email, password, name, type } = req.body;

    let response = {
        error: 1,
        mensaje: "Datos incompletos"
    }

    if(email && password && name && type) {
       response = await register(email, password, name, type)
    }
    res.send(response)
});


module.exports = router