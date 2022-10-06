const express = require("express");
const { products } = require('../../data/data');
const fs = require("fs")
const router = express.Router();




router.get('/', (req, res) => {
    // console.log(req.query)
    const { price = 9999999 } = req.query;
    const priceNumber = Number(price)
    const resProducts = products.filter((product) => product.price < priceNumber)
    res.json(resProducts)
});

router.get('/:productId', (req, res) => {
    const { productId } = req.params;
    const product = products.find(product => product.id === +productId);
    if (!product) {
      return res.status(404).json(`Product with id: ${productId} does not exist!` );
    }
    return res.json({ success: true, result: product });
  });

  router.post("/", (req, res ) =>{
    const { title, price, thumbnail, description, stock  } = req.body;
    if (!title || !price || !thumbnail || !description || !stock) {
        return res.status(400).json({ succes: false, error: 'Wrong body format' });
      }
      const newProduct = {
        id: products.length + 1,
        title,
        price: +(price),
        thumbnail,
        description,
        stock: +(stock)
      };
      products.push(newProduct);

      return res.json({ success: true, result: newProduct });
      
  })

  router.put('/:productId', (req, res) => {
    const { params: { productId }, body: { title, price, thumbnail, description, stock } } = req;
    if (!title || !price || !thumbnail || !description || !stock) {
      return res.status(400).json({ success: false, error: 'Wrong body format' });
    };
    const productIndex = products.findIndex((product) => product.id === +productId);
    if (productIndex < 0) return res.status(404).json({ success: false, error: `Product with id: ${productId} does not exist!` });
    const newProduct = {
      ...products[productIndex],
      title,
      price: +(price),
      thumbnail,
      description,
      stock: +(stock),
    };
    products[productIndex] = newProduct;
    return res.json({ success: true, result: newProduct });
  });

  router.delete('/:productId', (req, res) => {
    const { productId } = req.params;
    const productIndex = products.findIndex(product => product.id === +productId);
    if (productIndex < 0) return res.status(404).json({ success: false, error: `Product with id ${productId} does not exist!` });
    products.splice(productIndex, 1);
    return res.json({ success: true, result: 'product deleted correctly ' });
  });

module.exports = router;