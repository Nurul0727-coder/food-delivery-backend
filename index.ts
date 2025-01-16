import { configDotenv } from 'dotenv';
import express, {Request, Response} from 'express';
const mongoose = require ('mongoose')
const cors = require ('cors')


const PORT = 8005;
const app = express ();

app.use(cors());
app.use(express.json());

configDotenv();

const connectMongoDB= async()=> {
    const MONGODB_URI = process.env.MONGODB_URI;
    await mongoose.connect(MONGODB_URI);
};

 const FOOD_CATEGORY_SCHEMA=new mongoose.Schema({
    categoryName:String,
 },
 {timestamps:true}
);

connectMongoDB();   

app.get('/', async (req:Request, res:Response)=>{
    const database=mongoose.db('Food-delivery');
    const collection= database.collection('food-category');

    //Fetch all documdents from the collections
    const results = await collection.find().toArray();
    console.log(results);

    const newItem = await collection.insertOne({
        categoryName: 'Fast Foods'
    })
    const newResults = await collection.find().toArray();
    console.log(newResults);

    res.send('Food');
});

 const FoodCategoryModel=mongoose.model(
    'FoodCategory',
     FOOD_CATEGORY_SCHEMA,
     'food-category')

app.get('/food-category/',async (req: Request, res: Response)=>{
     const data = await FoodCategoryModel.find();
     res.json(data);
});

app.get('.food-category/:id', async (req:Request,res:Response)=>{
    const id=req.params.id;
    const item = await FoodCategoryModel.findbyId
    res.json(item);
});


app.delete('/food-category/:id', async (req:Request, res:Response)=>{
    const deletedItem = await FoodCategoryModel.findByIdAndDelete(req.params.id)
    res.json(deletedItem);
});

app.post('/food-category/', async (req:Request, res:Response)=>{
    const newItem= await FoodCategoryModel.create({
        categoryName: req.body.categoryName,
    });
    res.json({
        message: 'New Food Category created successfully.',
        newItem,
    })
});

app.put('/food-category/:id', async (req:Request, res:Response)=>{
    const updatedItem= await FoodCategoryModel.findByIdAndUpdate(
        req.params.id, 
        {
        categoryName: req.body.categoryName,
    },
    {new: true }
);

    res.json(updatedItem);
});


app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});
