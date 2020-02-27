/**
 * Crud operation on db
 */

 const usersModel = require ('../db/users.model') //require model1
 const meetingModel = require ('../db/meeting.model') //require model2

 exports.create = async(req,res)=>{ //creation method create
     if(!req.body){
         return res.status(400).json({
             message: "No data sent to record in database"
         })
     }

     let model = req.body.model

     if(model && model==='users') //si existe et si c'est model users
     {
         //const record =new usersModel({ //on créé un record dans le documents users
            //name:req.body.name, //on met dans name, ce qu'il y a dans le body de la requete apres name :
            //email:req.body.email,
            //pro:req.body.pro,
        //})

        //précédentes lignes remplacées par create
            await usersModel.create({
                name:req.body.name,
                email:req.body.email,
                pro:req.body.pro,
            }).then(()=>{
                res.json({
                    message : `Sucess : Users with name ${req.body.name} added`
                })
            })
            .catch((err)=>{
                res.status(500).json({
                    message : `Error, a problem occured ${err}`
                })
            })
         
     }else if(model && model==="meeting"){ // si existe et si c'est l'autre
         //const rec = new meetingModel({ //on créé un record dans le documents meeting
          //  time:req.body.time, //on met dans time, ce qu'il y a dans le body de la requete apres time :
          //  place:req.body.place,
          //  participants: req.body.participants
        // })

        //précédentes lignes remplacées par create
        await meetingModel.create({
            time:req.body.time,
            pParticipant:req.body.pParticipant,
            sParticipant:req.body.sParticipant,
            place:req.body.place,
        }).then(()=>{
            res.json({
                message : `Sucess : Meeting at place : ${req.body.place} added`
            })
        })
        .catch((err)=>{
            res.status(500).json({
                message : `Error, a problem occured ${err}`
            })
        })

     }else{
         return res.status(400).json({
            message : `Wrong model parameter specified or missing model parameter`
         })
     }

    // await rec.save() //save=enregistre rec dans mon doc, await = code non bloquant 
      //  .then(()=>{
       //     message :`Suucess : user with name ${this.name} added`
      //  }) // si tout se passe bien
       // .catch((err)=>{
         //   res.status(500).json({
           //     message: `Error : a problem occured ... ${err}`
            //})
        //}) 
     
        ///////////////// .save() inclus dans le .create
 }



exports.getAllByDoc = async(req,res)=>{
    if(!req.params.model){
        return res.status(400).json({
            message: "You need to specify which document you want to see"
        })
    }

    let model = req.params.model //PARAAAAAAAAAAAAAAAAAMAS LES FLOTS

    if(model && model==='users') //si existe et si c'est model users
    {
        await usersModel.find()
        .exec()
        .then((rec)=>{
            if(!rec || rec.length===0)
            {
                res.send("This doc is empty").status(204)
            }
            res.status(200).send(rec)
        })
        .catch((err)=>{
            res.status(500).json({
                message : `Error, a problem occured ${err}`
            })
        })
    }

    if(model && model==='meeting') //si existe et si c'est model users
    {
        await meetingModel.find()
        .populate( 'pParticipant sParticipant')
        .exec()
        .then((rec)=>{
            if(!rec || rec.length===0)
            {
                res.send("This doc is empty")
            }
            else{
                res.status(200).send(rec).status(204)
            }
                
            }
        )
        .catch((err)=>{
            res.status(500).json({
                message : `Error, a problem occured ${err}`
            })
        })
    }

}

exports.getOneByDocAndId= async(req,res)=>{ //req = requete envoyée, res = réponse http renvoyée

    let model = req.params.model
    let id = req.params.id


    if (model==="users")
    {
            await usersModel.findById(id)
            .then ((rec)=>{ //rec = resultat de findbyid
                if(!rec){ //si retour de requete false
                    return res.status(404).json({
                        message: "record not found with ID" + id
                    })
            }
            res.json(rec); //recupere et affiche le résultat
        })
        .catch((err)=>{
            if(err.kind === 'ObjectId') //si erreur se produit sur l'id de l'objet
            {
                return res.status(404).json({
                    message: "record not found with ID" + id
                })
            }
        })
    }
    if (model==="meeting")
    {
            await meetingModel.findById(id)
            .populate('pParticipant sParticipant')
            .then ((rec)=>{ //rec = resultat de findbyid
                if(!rec){ //si retour de requete false
                    return res.status(404).json({
                        message: "record not found with ID" + id
                    })
            }
            res.json(rec); //recupere et affiche le résultat
        })
        .catch((err)=>{
            if(err.kind === 'ObjectId') //si erreur se produit sur l'id de l'objet
            {
                return res.status(404).json({
                    message: "record not found with ID" + id
                })
            }
        })
    }
    
}

exports.update = async(req,res)=>{
    // On vérifie si les données existe
  if (!req.params.id)
  {
      return res.status (400).json({
          message: "No ID specified..."
      })
  }

  let model = req.params.model
  let id = req.params.id

  if (model==="users")
    {
        await usersModel.findByIdAndUpdate(id, {
            name: req.body.name,
            email: req.body.email,
            pro: req.body.pro
        })
        .then ((retUpd)=>{ 
            if(!retUpd){ //si retour de requete false
                return res.status(404).json({
                    message: "record not found with ID" + id
                })
            }
            res.json(retUpd); //recupere et affiche l'objet a modifier avant modif
        })
        .catch((err)=>{
            if(err.kind === 'ObjectId')
            {
                return res.status(404).json({
                    message: "record not found with ID" + id
                })
            }
            return res.status(500).json({
                message: "Error updating record with ID" + id
            })
        })
    }

    if (model==="meeting")
    {
        await meetingModel.findByIdAndUpdate(id, {
            time: req.body.time,
            place: req.body.place,
            participants: req.body.participants
        })
        .then ((retUpd)=>{ 
            if(!retUpd){ //si retour de requete false
                return res.status(404).json({
                    message: "record not found with ID" + id
                })
            }
            res.json(retUpd); //recupere et affiche l'objet a modifier avant modif
        })
        .catch((err)=>{
            if(err.kind === 'ObjectId')
            {
                return res.status(404).json({
                    message: "record not found with ID" + id
                })
            }
            return res.status(500).json({
                message: "Error updating record with ID" + id
            })
        })
    }
}

exports.delete = async(req,res)=>{
    // On vérifie si les données existe
  if (!req.params.id)
  {
      return res.status (400).json({
          message: "No ID specified..."
      })
  }

  let model = req.params.model
  let id = req.params.id

  if (model==="users")
    {
        await usersModel.findByIdAndDelete(id)
        .then ((retUpd)=>{ 
            if(!retUpd){ //si retour de requete false
                return res.status(404).json({
                    message: "record not found with ID" + id
                })
            }
            res.json(retUpd); //recupere et affiche l'objet a effacer
        })
        .catch((err)=>{
            if(err.kind === 'ObjectId') //si erreur sur id object
            {
                return res.status(404).json({
                    message: "record not found with ID" + id
                })
            }
            return res.status(500).json({
                message: "Error updating record with ID" + id
            })
        })
    }

    if (model==="meeting")
    {
        await meetingModel.findByIdAndDelete(id)
        .then ((retUpd)=>{ 
            if(!retUpd){ //si retour de requete false
                return res.status(404).json({
                    message: "record not found with ID" + id
                })
            }
            res.json(retUpd); //recupere et affiche l'objet a effacer
        })
        .catch((err)=>{
            if(err.kind === 'ObjectId')
            {
                return res.status(404).json({
                    message: "record not found with ID" + id
                })
            }
            return res.status(500).json({
                message: "Error updating record with ID" + id
            })
        })
    }
}