
const express = require('express');
const categoriesRouter = express.Router();
const { createCategoryCtrl, getCategoryByIdCtrl, deleteCategoryCtrl, updateCategoryCtrl, getCategoriesCtrl } = require('../../controllers/categories/categoriesController');
const islogin = require('../../middlewares/isLogin');

 //category Post
categoriesRouter.post('/', islogin,createCategoryCtrl)
//get category
categoriesRouter.get('/:id', getCategoryByIdCtrl)
//get categories
categoriesRouter.get('/' ,getCategoriesCtrl)
//Delete
categoriesRouter.delete('/:id', islogin,deleteCategoryCtrl)
//update
categoriesRouter.put('/:id',islogin ,updateCategoryCtrl)

module.exports = categoriesRouter;