const asyncHandler = require('express-async-handler')
const Category = require('../models/categoryModel')
const mongoose = require('mongoose')
const { unlinkfile } = require('../utils/unlinkFile')


// get all categories
const getAllCategories = asyncHandler(async (req, res) => {
    const categories = await Category.find()
    res.status(200).json(categories)
})


// create a category
// const createCategory = asyncHandler(async (req, res) => {
//     const { name } = req.body;
//       if (!name || typeof name !== 'string') {
//         return res.status(400).json({ error: 'Invalid category data. Missing the name of the category.' });
//       }

//     if (!req.file) {
//         return res.status(400).json({ message: 'Image file is required.' });
//       }

//     const image = req.file.filename

//     const newCategory = new Category({
//         name,
//         image,
//       });

//       await newCategory.save();
//       res.status(201).json({ message: 'Category created successfully', category: newCategory });
// })


// get one category
const getCategoryById = asyncHandler(async(req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such category!"})
    }

    const category = await Category.findById(id)
    if (!category){
        return res.status(404).json({error: "No such category!"})
    }

    res.status(200).json(category)
})


// update category
// const updateCategory = asyncHandler(async (req, res) => {
//   const { id } = req.params;
//   const oldCategory = await Category.findById(id);

//   const name = req.body.name ? req.body.name : oldCategory.name
//   const image = req.file.filename ? req.file.filename : oldCategory.image

//   console.log(name, image)

//   const category = {
//     name: name,
//     image: image,
//   };

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(404).json({ error: "No such category!" });
//   }

//   const updatedCategory = await Category.findByIdAndUpdate({ _id: id }, category, {new: true} );
//   if (!updatedCategory) {
//     return res.status(404).json({ error: "No such category!" });
//   }

//   if (req.file.filename){
//     unlinkfile(oldCategory.image)
//   }

//   res.status(200).json(updatedCategory);
// });


// delete category
// const deleteCategory = asyncHandler(async (req, res) => {
//     const { id } = req.params
//     if (!mongoose.Types.ObjectId.isValid(id)){
//         return res.status(404).json({error: "No such category!"})
//     }
//     const deletedCategory = await Category.findOneAndDelete({_id: id})
//     if (!deletedCategory){
//         return res.status(400).json({error: "No such category!"})
//     }
    
//     unlinkfile(deletedCategory.image)
//     res.status(200).json(deletedCategory)
// })

module.exports = {
    getAllCategories,
    getCategoryById,
    // createCategory,
    // updateCategory,
    // deleteCategory
}