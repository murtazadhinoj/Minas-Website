const Product = require('../Models/product');


// get all the product

// const getAllProduct = async (req, res) =>{

//     try {
        
//         const products = await  Product.find();

//         res.status(200).json({
//             success:true,
//             count:products.length,
//             products: products,
//         });

//     } catch (error) {
//         res.status(500).json({
//             success:false,
//             message: "failed to get products",
//             error : error.message,
//         })
//     }

// }

const getAllProduct = async (req, res) => {
  try {
    const queryObject = {};

    if (req.query.category) {
      queryObject.category = new RegExp(`^${req.query.category}$`, 'i');
    }
    if (req.query.metal) {
  queryObject.metal = req.query.metal;
}

if (req.query.collection) {
  queryObject.collectionName = req.query.collection;
}

if (req.query.minPrice || req.query.maxPrice) {
  queryObject.price = {};

  if (req.query.minPrice) {
    queryObject.price.$gte = Number(req.query.minPrice);
  }

  if (req.query.maxPrice) {
    queryObject.price.$lte = Number(req.query.maxPrice);
  }
}

if (req.query.inStock === "true") {
  queryObject.stock = { $gt: 0 };
}

    const products = await Product.find(queryObject);

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "failed to get products",
      error: error.message,
    });
  }
};



// get the single product by slug.

const getSingleProduct = async (req, res) =>{

    try {

        const { slug } = req.params;
        const product = await Product.findOne({ slug });

        if (!product){
            return res.status(404).json({
                success: false,
                message: 'product not found',
            });
        }

        res.status(200).json({
            success: true,
            product,
        });
        
    } catch (error) {
        
        res.status(500).json({
            success: false,
            message:'failed to fetch product',
            error: error.message,
        });

    }

}

// const getProductFilters = async (req, res) => {
//   try {
//     const categories = await Product.distinct('category');
//     const collections = await Product.distinct('collectionName');

//     res.status(200).json({
//       success: true,
//       data: {
//         categories: categories.sort(),
//         collections: collections.sort()
//       }
//     });
//   } catch (error) {
//     res.status(500).json({ success: false, error: error.message });
//   }
// };

const getProductFilters = async (req, res) => {
  try {
    const categories = (await Product.distinct('category')).filter(Boolean);
    const collections = (await Product.distinct('collectionName')).filter(Boolean);
    const metals = (await Product.distinct('metal')).filter(Boolean);

    res.status(200).json({
      success: true,
      data: {
         metals: metals.sort(),
        categories: categories.sort(),
        collections: collections.sort(),
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// GET /api/products/new
const getNewProducts = async (req, res) => {
  try {
    const DAYS = Math.min(Number(req.query.days) || 30, 90); // hard cap
    const LIMIT = Math.min(Number(req.query.limit) || 24, 100);

    const fromDate = new Date();
    fromDate.setDate(fromDate.getDate() - DAYS);

    const products = await Product.find({
      createdAt: { $gte: fromDate },
    })
      .sort({ createdAt: -1 })
      .limit(LIMIT)
      .lean();

    res.status(200).json({
      success: true,
      meta: {
        days: DAYS,
        limit: LIMIT,
        returned: products.length,
      },
      products,
    });

  } catch (error) {
    console.error("NEW PRODUCTS ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Unable to fetch new products",
    });
  }
};



module.exports = {
    getAllProduct,
    getSingleProduct,
    getProductFilters
}