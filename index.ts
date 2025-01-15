// import { configDotenv } from 'dotenv';
// import express, {Request, Response} from 'express';
// const mongoose = require ('mongoose')
// const cors = require ('cors')


// const PORT = 8005;
// const app = express ();

// app.use(cors());
// app.use(express.json());

// configDotenv();


// //  const connectMongoDB= async()=>{
// //     const MONGODB_URI=process.env.MONGODB_URI;
// //     if(!MONGODB_URI){
// //         throw new Error(
// //             'Database Connection URI is not  defined in environment variables.'
// //         )
// //     }

// //     try {
// //         await mongoose.connect(MONGODB_URI)
   

// //         console.log('Succesfully connected to the MongoDB database.')
// //     }
// //     catch(error) {
// //         console.error('Failed to connect to the MongoDB database.',error)
// //     };
// //  };
 
// const connectMongoDB= async()=> {
//     const MONGODB_URI = process.env.MONGODB_URI;
//     await mongoose.connect(MONGODB_URI);
// };

//  const FOOD_CATEGORY_SCHEMA=new mongoose.Schema({
//     categoryName:String,
//  },
//  {timestamps:true}
// );

// connectMongoDB();   

// app.get('/', async (req:Request, res:Response)=>{
//     const database=mongoose.db('Food-delivery');
//     const collection= database.collection('food-category');

//     //Fetch all documdents from the collections
//     const results = await collection.find().toArray();
//     console.log(results);

//     const newItem = await collection.insertOne({
//         categoryName: 'Fast Foods'
//     })
//     const newResults = await collection.find().toArray();
//     console.log(newResults);

//     res.send('Food');
// });

//  const FoodCategoryModel=mongoose.model(
//     'FoodCategory',
//      FOOD_CATEGORY_SCHEMA,
//      'food-category')

// app.get('/food-category/',async (req: Request, res: Response)=>{
//      const data = await FoodCategoryModel.find();
//      res.json(data);
// });

// app.get('.food-category/:id', async (req:Request,res:Response)=>{
//     const id=req.params.id;
//     const item = await FoodCategoryModel.findbyId
//     res.json(item);
// });


// app.delete('/food-category/:id', async (req:Request, res:Response)=>{
//     const deletedItem = await FoodCategoryModel.findbyIdAndDelete(req.params.id)
//     res.json(deletedItem);
// });

// app.get('/food-category/:id', async (req:Request, res:Response)=>{
//     res.json({
//         message: "One Food Category ."
//     });
// });

// // app.delete('/food-category/:id', async (req:Request, res:Response)=>{
// //     res.json({
// //         message: "Deleted Food Category"
// //     });
// // });

// app.post('/food-category/', async (req:Request, res:Response)=>{
//     const newItem= await FoodCategoryModel.create({
//         categoryName: req.body.categoryName,
//     });
//     res.json({
//         message: 'New Food Category created successfully.',
//         newItem,
//     })
// });

// app.put('/food-category/:id', async (req:Request, res:Response)=>{
//     const updatedItem= await FoodCategoryModel.findByIdAndUpdated(
//         req.params.id, 
//         {
//         categoryName: req.body.categoryName,
//     },
//     {new: true }
// );

//     res.json(updatedItem);
// });

// app.get('/create', async (req:Request, res:Response)=>{
//     const newItem= await FoodCategoryModel.create({
//         categoryName: "Main dishes"
//     });

//     res.send({
//         message:'New Food Category created successfully.',
//         newItem,
//     })
// });

// app.get('/', async (req:Request, res:Response)=>{
//     const FoodCategory= await FoodCategoryModel.find();
//     res.send('hello from backend');
// });

// app.listen(PORT,()=>{
//     console.log(` Server is running on http://localhost:${PORT}`);
// });



import { configDotenv } from 'dotenv';
import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

const PORT = 8005;
const app = express();

app.use(cors());
app.use(express.json());

configDotenv();

// MongoDB холболтыг хийх
const connectMongoDB = async () => {
    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) {
        throw new Error('MongoDB URI is not defined in environment variables.');
    }

    try {
        await mongoose.connect(MONGODB_URI, {
            // useNewUrlParser: true,  // Заавал хэрэггүй болсон
            // useUnifiedTopology: true  // Заавал хэрэггүй болсон
        });
        console.log('Successfully connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

// Food Category схемийг тодорхойлох
const FOOD_CATEGORY_SCHEMA = new mongoose.Schema(
    {
        categoryName: String
    },
    { timestamps: true }
);

const FoodCategoryModel = mongoose.model(
    'FoodCategory',
    FOOD_CATEGORY_SCHEMA,
    'food-category'
);

// MongoDB холболтыг хийх
connectMongoDB();

// Food category-г авах
app.get('/food-category', async (req: Request, res: Response) => {
    try {
        const categories = await FoodCategoryModel.find();
        res.json(categories);
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).send('Error fetching categories');
    }
});

// One food category-ийг авах
app.get('/food-category/:id', async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        const item = await FoodCategoryModel.findById(id);
        res.json(item);
    } catch (error) {
        console.error('Error fetching the category:', error);
        res.status(500).send('Error fetching the category');
    }
});

// Food category-ийг устгах
app.delete('/food-category/:id', async (req: Request, res: Response) => {
    try {
        const deletedItem = await FoodCategoryModel.findByIdAndDelete(req.params.id);
        res.json(deletedItem);
    } catch (error) {
        console.error('Error deleting the category:', error);
        res.status(500).send('Error deleting the category');
    }
});

// Шинэ food category үүсгэх
app.post('/food-category', async (req: Request, res: Response) => {
    try {
        const newItem = await FoodCategoryModel.create({
            categoryName: req.body.categoryName
        });
        res.json({
            message: 'New Food Category created successfully.',
            newItem
        });
    } catch (error) {
        console.error('Error creating the category:', error);
        res.status(500).send('Error creating the category');
    }
});

// Food category-ийг шинэчлэх
app.put('/food-category/:id', async (req: Request, res: Response) => {
    try {
        const updatedItem = await FoodCategoryModel.findByIdAndUpdate(
            req.params.id,
            {
                categoryName:req.body.categoryName
            },
            { new: true }
        );
        res.json(updatedItem);
    } catch (error) {
        console.error('Error updating the category:', error);
        res.status(500).send('Error updating the category');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
