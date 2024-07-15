const express=require('express');
const app=express()
const mongoose=require('mongoose');
const Product=require('./models/product.model')
app.use(express.json())

app.get('/',(req,res)=>{
    res.send("This is from node i")
})
app.get('/api/products',async (req,res)=>{
    try {
        const products=await Product.find({})
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
})
app.get('/api/product/:id',async (req,res)=>{
    try {
        const {id}=req.params
        const product=await Product.findById(id)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
})

app.delete('/api/product/:id',async (req,res)=>{
    try {
        const {id}=req.params
        const product=await Product.findByIdAndDelete(id)
        if(!product){
            res.status(404).json({message:"product not found"})
        }
        res.status(200).json({message:"Product deleted successfully"})
    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
})


app.put('/api/product/:id',async (req,res)=>{
    try {
        const {id}=req.params
        const product=await Product.findByIdAndUpdate(id,req.body)
        if(!product){
            res.status(404).json({message:"Product not found"})
        }
        const updatedProduct=await Product.findById(id)
        res.status(200).json(updatedProduct)
    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
})
app.post('/api/products',async (req,res)=>{
    try {
        const product=await Product.create(req.body)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message:error.message})
    }
})
mongoose.connect("mongodb+srv://ayubmalik926:mongo2pass@cluster0.fynuevn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(()=>{
    console.log("connected to db")
    app.listen(3000,()=>{
        console.log("This is running on port 3000")
    })

})
.catch(()=>{
    console.log("connection failed")

});