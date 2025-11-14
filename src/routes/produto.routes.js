const { Router } = require("express");
const {
  getProducts,
  createProduct,
  editProduct,
  deleteProduct,
  getProductById,
} = require("../controllers/produtos.controller");

const router = Router();

// Post
router.post("/", createProduct);

// Put
router.put("/editById/", editProduct);

// Get
router.get("/", getProducts);

// delete
router.delete("/deleteByName/:nome", deleteProduct);

module.exports = router;
