 const express = require('express');
const { createCategoryCtrl, getCategoryByIdCtrl, deleteCategoryCtrl, updateCategoryCtrl } = require('../../controllers/categories/categoriesController');

 const categoriesRouter = express.Router();

//category Post
categoriesRouter.post('/', createCategoryCtrl)
//get category
categoriesRouter.get('/:id', getCategoryByIdCtrl)
//Delete
categoriesRouter.delete('/:id', deleteCategoryCtrl)
//Delete 
categoriesRouter.put('/:id', updateCategoryCtrl)

module.exports = categoriesRouter;