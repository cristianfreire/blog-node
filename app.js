//Carregando módulos
    const express = require('express')
    const handlebars = require('express-handlebars')
    const bodyParser = require('body-parser')
    const app = express()
    const admin = require('./routes/admin')
    const path = require('path')
    const mongoose = require('mongoose')
    const session = require('express-session')
    const flash = require('connect-flash')
//Settings
    //Sessão
        app.use(session({
            secret: 'cursodenode',
            resave: true,
            saveUninitialized: true
        }))
        app.use(flash())
    //middleware
        app.use((req, res, next) =>{
            res.locals.success_msg = req.flash('success_msg')
            res.locals.error_msg = req.flash('error_msg')
            next()  
        })
    //Body Parser
        app.use(bodyParser.urlencoded({extended: true}))
        app.use(bodyParser.json())
    //Handlers
        app.engine('handlebars', handlebars({defaultlayout: 'main'}))
        app.set('view engine', 'handlebars')
    //Mongoose
        mongoose.Promise = global.Promise
        mongoose.connect('mongodb://localhost/blogapp').then(() => {
            console.log('Conectado ao mongo')
        }).catch((err)=>{
            console.log('Erro de conexão com o banco: '+err)
        })
    // Public
        app.use(express.static(path.join(__dirname,'public')))
//Routes
    app.get('/', (req, res) => {
        res.render('index')
    })

    app.get('/post', (req, res) => {
        res.send('Lista Posts')
    })

    app.use('/admin', admin)
//Others
const PORT = 8081
app.listen(PORT, () =>{
    console.log("Servidor rodando")
})