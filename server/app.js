require('dotenv').config()
const express = require('express')
const app = express()
const PORT = process.env.PORT




const db = require('./model/db')
db.connect()

const User = require('./model/User')



app.use(express.json())


const cors = require('cors')
app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello World')
})



app.post("/login", async (req, res) => {
    try {
        const { email, pwd } = req.body
        const userdata = await User.findOne({ email: email })

        console.log(userdata);

        if (userdata) {
            if (userdata.pwd === pwd) {
                res.send("Login Successfull")
            } else {
                res.send("Invalid Password")
            }

        }

        console.log(email);
        console.log(pwd);

    } catch (error) {
        console.log(error);


    }


})



app.post('/register', async (req, res) => {
    try {
        const { username, email, pwd } = req.body;


        const userdata = await User.findOne({ email: email })
        if (userdata) {
            if (userdata.email === email) {
                return res.send("Email Already Exist")
            }

        }





        const newUser = await User.create({ username, email, pwd })
        await newUser.save()

        console.log(username);
        console.log(email);
        console.log(pwd);

        res.status(201).send('User added successfully');
    } catch (error) {
        console.error(error);;
    }
});


app.listen(PORT, () => {
    console.log(`Server is Running at:${PORT}`);

})