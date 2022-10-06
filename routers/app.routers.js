const express = require("express");
const productsRoutes = require("./products/products.routes")
const filesRoutes = require ("./files/files.routes")


const router = express.Router();
router.use("/products", productsRoutes);
router.use(filesRoutes)

module.exports = router;
