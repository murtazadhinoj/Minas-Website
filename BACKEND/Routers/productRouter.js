const router = require('express').Router();



// importing controller
const {getAllProduct, getSingleProduct,getProductFilters} = require("../Controllers/productController");



// setting router for all and single product.
router.get('/filters', getProductFilters);
router.get('/:slug', getSingleProduct);
router.get('/', getAllProduct);


module.exports = router;

