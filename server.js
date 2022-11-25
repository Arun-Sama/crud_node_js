const express = require('express');
const mongoose = require('mongoose');
const BrandName = require("./model");


const app = express();

app.use(express.json())

mongoose.connect('mongodb+srv://ArunSama:Passwordweak@cluster0.fqsw4dt.mongodb.net/?retryWrites=true&w=majority',{
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(
    () =>console.log("Database connected...")
).catch(err => console.log(err))

app.post('/addbrands',async (req,res)=>{
    const {brandname} = req.body;
    try{
        const newData = new BrandName({brandname})
        await newData.save();
        return res.json(await BrandName.find());
    }
    catch(err){
        console.log(err.message);
    }

})

app.get('/getallbrands',async(req,res)=>{
    try{
        const allData = await BrandName.find()
        return res.json(allData)
    }
    catch{
        console.log(err.message);
    }
})

app.get('/getbyid/:id',async(req,res)=>{
    try{
        const getData = await BrandName.findById()
        return res.json(getData)
    }
    catch{
        console.log(err.message);
    }
})

app.delete('/getdeletebyid/:id',async(req,res)=>{
    try{
        const delData = await BrandName.findByIdAndDelete(req.params.id)
        return res.json(delData)
    }
    catch{
        console.log(err.message);
    }
})

app.listen(8000,()=>console.log('server running...'));