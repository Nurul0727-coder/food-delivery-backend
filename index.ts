import { configDotenv } from 'dotenv';
import express, {Request, Response} from 'express';
// import { MongoClient } from 'mongodb';/
const mongoose = require ('mongoose')

const PORT = 8000;
const app = express ();
app.use(express.json());

configDotenv();
 const URI=process.env.MONGODB_URI;
// console.log(URI);

let cluster:any=null;

 const connectMongoDB= async()=>{
    const MONGODB_URI=process.env.MONGODB_URI;
    if(!MONGODB_URI){
        throw new Error(
            'Database Connection URI is not  defined in environment variables.'
        )
    }

    try {
        await mongoose.connect(MONGODB_URI)
   

        console.log('Succesfully connected to the MongoDB database.')
    }
    catch(error) {
        console.error('Failed to connect to the MongoDB database.',error)
    };
 };
 
 const FOOD_CATEGORY_SCHEMA=new mongoose.Schema({
    categoryName:String,
 });

 const FoodCategoryModel=mongoose.model('FoodCategory', FOOD_CATEGORY_SCHEMA,'food-category')

connectMongoDB();

app.put('/food-category/:id', async (req:Request, res:Response)=>{
    res.json({
        message: "One Food Category updated successfully."
    });
});

app.delete('/food-category/:id', async (req:Request, res:Response)=>{
    res.json({
        message: "One Food Category deleted successfully."
    });
});

app.get('/food-category/:id', async (req:Request, res:Response)=>{
    res.json({
        message: "One Food Category ."
    });
});

app.delete('/food-category/:id', async (req:Request, res:Response)=>{
    res.json({
        message: "Deleted Food Category"
    });
});

app.post('/food-category/:id', async (req:Request, res:Response)=>{
    const newItem= await FoodCategoryModel.create({
        categoryName: "New Food Category cteated successfilly."
    });
});

app.get('/create', async (req:Request, res:Response)=>{
    const newItem= await FoodCategoryModel.create({
        categoryName: "Main dishes"
    });

    res.send({
        message:'New Food Category created successfully.',
        newItem,
    })
});

app.get('/', async (req:Request, res:Response)=>{
    const database=cluster.db('Food-delivery');
    const collection= database.collection('users')
    res.send('Hello from backend');
});

app.get('/', async (req:Request, res:Response)=>{
    const FoodCategory= await FoodCategoryModel.find();
    res.send('hello from backend');
});

app.listen(PORT,()=>{
    console.log(` Server is running on http://localhost:${PORT}`);
});


