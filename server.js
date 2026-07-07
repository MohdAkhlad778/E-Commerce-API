const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const app = express();
app.use(express.json());
const SECRET_KEY = 'your-secret-key-change-this';

mongooose.connect('mongodb.srv://krxakhlad_db_user:TKHSi5AjEZwt7hTh@cluster0.hettjmi.mongodb.net/ecommerce?retryWrites=true&w=majority')
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.log('Eroor:', err));

const userSchema = new mongoose.Schema({
    email: String,
    password: String
});
const User = new mongoose.model('user', userSchema);

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    sotck: Number,
    createdAt: {type: Date, default: Date.now}
});

const Product = mongoose.model('Product', productSchema);
const cartSchema = new mongoose.Schema({
    userId: String,
    items: [
        {
            productId: String,
            quantity: Number,
            price: Number 
        }
    ]
});

const Cart = mongoose.model('Cart', cartSchema);

const orderSchema = new mongoose.Schema({
    userId: String,
    items: Array,
    total: Number,
    status: String,
    createdAt: {type: Date, default: Date.now }
});

const Order = new mongoose.model('Order', orderSchema);

function verifyToken(req,res,next) {
    const token = req.headers['authorization'];
    if(!token) {
        return res.json({error: 'No token provided'});
    }
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
        if(err) {
            return res.json({error: 'Invalid Token'});
        }
        req.userId = decoded.userId;
        next();
    });
}

app.listen(3000, () => {
    console.log('Server running at https://localhost:3000');
});
