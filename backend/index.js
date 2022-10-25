const express=require("express");
const bodyParser= require("body-parser");
const cors=require("cors");
const mongoose =require("mongoose");
const userModel=require("./models");
const User = require("./models");
const { ServerApiVersion } = require("mongodb");
const app=express();
const port=3001;
app.use(cors());
mongoose.connect("",{
    useNewUrlParser:true,
    useUnifiedTopology:true
});
const db=mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"));
db.once("open",function(){
    console.log("Connected Successfully");
})
app.use (bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json()); 
app.post("/",(req,res)=>{
    const user=new User({
        _id:new mongoose.Types.ObjectId,
        name:req.body.name,
        phone:req.body.phone
    })
    user.save()
    .then(result=>{
        res.status(200).json({
            newUser:result
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    });
})
app.get('/',(req,res)=>{
    User.find()
    .then(result=>{
        res.status(200).json({
            AllUsers:result
        });
    })
    .catch(err=>{
        console.log(err);
        res.send(500).json({
            error:err
        })
    });
})
app.get('/:id',(req,res)=>{
    User.findById(req.params.id)
    .then(result=>{
        res.status(200).json({
            user:result
        })
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        })
    });
})
app.delete('/:id',(req,res)=>{
    User.deleteOne({_id:req.params.id})
    .then(result=>{
        res.status(200).json({
            message:'product deleted',
            result:result
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    });
}) 
app.put('/:id',(req,res)=>{
    User.findByIdAndUpdate({_id:req.params.id},{
        $set:{
            name:req.body.name,
            phone:req.body.phone
        }
    })
    .then(result=>{
        res.status(200).json({
            updated_product:result
        })
    })
    .catch(err=>{
        res.status(500).json({
            error:err
        })
    });
})
app.listen(port,()=>console.log(`Hello world listening from port ${port}!`))
