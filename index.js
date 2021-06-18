const express = require('express');
const app = express();
const cors = require('cors');
const pool = require("./db");

app.use(cors());
app.use(express.json());

app.get("/todo", async (req, res) => {
    try {
        const person = await pool.query("SELECT * FROM register");
        res.json(person.rows);
    }
    catch (err) {
        console.error(err.message);
    }
});

app.get("/error", async (req, res) => {
    const errors = await pool.query("SELECT * FROM error");
    res.json(errors.rows);
});

app.post("/register", async (req, res) => {
    const {name,email,password} = req.body;
    const newRegister = await pool.query("INSERT INTO register(name, email, password) VALUES($1, $2, $3) RETURNING *", [name, email, password]);
    res.json(newRegister.rows);
});

app.post("/login", async (req, res) => {
    const {email, password} = req.body;
    const newLogin = await pool.query("SELECT * FROM register WHERE email = $1 AND password = $2", [email, password]);
    if (newLogin.rowCount != 0 ) {
        console.log("Login Successful");
        res.json(true);
    }
    else {
        console.log("Try again");
        res.json(false);
    }
});

app.listen(5000, () => {
    console.log("Server has started on port 5000.");
});