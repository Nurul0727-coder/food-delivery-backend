import {Request, Response, Router} from 'express';
import { FoodCategoryModel } from './models/food-category';

export const foodCategoryRouter = Router();

foodCategoryRouter.get('/', async (req, res) => {
    const items = await FoodCategoryModel.find();
  res.json(items);
});

foodCategoryRouter.post(
    '/',
     async (req:Request, res:Response) => {
    const newItem= await FoodCategoryModel.create({
        categoryName: req.body.categoryName,
    });

    res.json({
        message: "New Food Category created successfully",
        newItem,
    });
});

foodCategoryRouter.get("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const item = await FoodCategoryModel.findById(id);
  res.json(item);
});

foodCategoryRouter.put("/:id", async (req: Request, res: Response) => {
    const updatedItem = await FoodCategoryModel.findByIdAndUpdate(
      req.params.id,
      {
        categoryName: req.body.categoryName,
      },
      { new: true }
    );
  
    res.json(updatedItem);
  });

  foodCategoryRouter.delete("/:id", async (req: Request, res: Response) => {
    const deletedItem = await FoodCategoryModel.findByIdAndDelete(req.params.id);
    res.json(deletedItem);
  });






















// app.get("/food/", async (req: Request, res: Response) => {
//     const data = await FoodCategoryModel.find();
//     res.json(data);
//   });
  
//   app.get("/food-category/", async (req: Request, res: Response) => {
//     const data = await FoodCategoryModel.find();
//     res.json(data);
//   });
  
//   app.post("/food-category/", async (req: Request, res: Response) => {
//     const newItem = await FoodCategoryModel.create({
//       categoryName: req.body.categoryName,
//     });
//     res.json({
//       message: "New Food Category created successfully.",
//       newItem,
//     });
//   });
  

