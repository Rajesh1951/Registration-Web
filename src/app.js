const express = require('express');
const hbs = require('hbs');
const ejs = require('ejs');
const path = require('path');

require("./db/conect");
const Register = require('./models/regis')
const port = process.env.PORT || 8000;

const app = express();
const staticpath = path.join(__dirname, "../public");
const temppath = path.join(__dirname, "../templates/views");
const partpath = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(staticpath));
// app.set('view engine', 'hbs');
app.set('view engine', 'ejs');
app.set('views', temppath);
hbs.registerPartials(partpath);
app.get('/', (req, res) => {
    // res.send('hi from express');
    res.render('index')
})
app.post('/', async (req, res) => {
    try {
        // console.log(req.body.Name)
        // res.send(req.body.Name)
        const registerstud = new Register({
            name: req.body.Name,
            phone: req.body.Phone,
            age: req.body.Age,
            gender: req.body.Gender,
            cgpa: req.body.CGPA,
            branch: req.body.Branch,
        })
        const result = await registerstud.save();
        res.status(201).render('index')
    }
    catch (err) {
        res.send('<h1>Phone number entered was already used</h1>');
    }
})

app.get('/loginpage', (req, res) => {
    res.render('login')
})

app.post('/search', (req, res) => {
    const search_name = req.body.searchname;
    const getdoc = async () => {
        const v=new RegExp(search_name,'gi');
        const result = await Register.find({ name:{$regex: v }} )
        res.render('list', { data: result })
    }
    getdoc();
})
app.post('/loginpage', (req, res) => {
    // const logid=(req.body.loginid);
    const pass = req.body.password;
    if (pass === 'Rajesh@2001') {
        // Register.find((req,resp)=>{
        //     const result=resp;
        //     console.log(result)
        // })
        const getdoc = async () => {
            const result = await Register.find().sort({ name: 1 })
            // console.log(result)
            res.render('list', { data: result })
        }
        getdoc();
    }
    else {
        res.send('Wrong Password')
    }
})
app.get('/delete/:id', (req, res) => {
    const id = req.params.id;
    Register.deleteOne({ _id: id })
        .then(() => {
            const getdoc = async () => {
                const result = await Register.find().sort({ name: 1 })
                res.render('list', { data: result })
            }
            getdoc();
        })
        .catch(err => {
            console.log(err, 'delete fail')
        })
})

app.get('/update/:id', (req, res) => {
    const ID = req.params.id;
    const getname = async () => {
        const result = await Register.find({ _id: ID });
        res.render('update', { id: ID, student: result[0]['name'] })
    }
    getname();
})
app.post('/update/:id', (req, res) => {
    const ID = req.params.id;
    const offinp = req.body.offers || 69;
    const reminp = req.body.remarks;
    Register.updateOne({ _id: ID }, { $set: { offers: offinp, remarks: reminp } })
        .then(() => {
            const getdoc = async () => {
                const result = await Register.find().sort({ name: 1 })
                res.render('list', { data: result })
            }
            getdoc();
        })
        .catch(err => console.log('update fail', err))
})
app.listen(port, () => console.log('listening'))