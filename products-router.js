var express = require('express');
var router = express.Router();       // get an instance of the express Router

var Product = require('./server/models/product');

// middleware to use for all requests
router.use(function(req, res, next) {
    console.log('Products router');
    next(); // make sure we go to the next routes and don't stop here
});

router.get('/', function(req, res){
    Product.find(function (err, products) {
        if(err) res.send(err);
        res.json(products);
    });
});
router.get('/:id', function(req, res){
    Product.findById(req.params.id, function (err, products) {
        if(err) res.send(err);
        res.json(products);
    });
});
router.post('/', function(req, res){
	var product = new Product();        // create a new instance of the Product model
    product.name = req.body.name;       // set the Products name (comes from the request)
    product.description = req.body.description;
    product.price = req.body.price;

    // save the bear and check for errors
    product.save(function(err) {
        if(err) res.send(err);
        res.json(product);
    });
});
router.put('/:id', function (req, res) {
    Product.findById(req.params.id, function (err, product) {
        product.name = req.body.name;
        product.description = req.body.description;
        product.price = req.body.price;
        product.save(function (err) {
            if(err) res.json({message: err, product: product});
            res.json(product);
        })
    });
});
router.delete('/:id', function (req, res) {
    Product.remove({ 
        _id: req.params.id
    }, function (err, product) {
        if(err) res.send(err);
           res.json({ message: 'Successfully deleted' }); 
    });
});
//export this router to use in our index.js
module.exports = router;