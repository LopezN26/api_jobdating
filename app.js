/**
 * Job dating application main file
 */

 const express = require('express') //require express
 const app = express() //Pour pouvoir utiliser les methodes express via app

 const connect = require ("./src/db/dbconnect") //require du fichier db connect

 const crud = require("./src/api/crud") //require du crud

// Middleware body-parser 
const parser = require('body-parser')
app.use(parser.urlencoded({extended:true}))
app.use(parser.json())

 const PORT = 5000

 app.listen(PORT,()=> {
     console.log("Api Job-dating listening on Port : "+PORT) // pour dire qu'on listen bien
    //dbconnect
    connect() // utilisation du ficher dbconnect
    .then(()=>{ //si tout se passe bien
        console.log('Connected to mongoDB')
    })
    .catch((e)=>{ //si erreur
        console.log(`fail to connect to mongoDB : +${e}`)
    }) 
 })

 app.get('/', (req,res)=>( //si requete en get avec url see terminant juste par '/', alors han short first
     res.send('Han short first')
 ))

 app.get('/api/doc/:model',crud.getAllByDoc)

 app.get('/api/doc/:model/:id',crud.getOneByDocAndId)

 app.post('/api/create',crud.create)

 app.put('/api/update/:model/:id', crud.update)

 app.delete('/api/delete/:model/:id', crud.delete)

