import {model, Schema} from "mongoose";
const FOOD_CATEGORY_SCHEMA = new Schema(
    {
      categoryName: String,
    },
    { timestamps: true }
  );
  
  // FoodCategoryModel.find
  
  const FoodCategoryModel = model(
    "FoodCategory",
    FOOD_CATEGORY_SCHEMA,
    "food-category"
  );

  export {FoodCategoryModel};
  