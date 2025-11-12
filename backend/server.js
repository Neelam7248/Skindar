const express =require('express');
const app=express();
const cors=require('cors');
const mongoose=require('mongoose')//staring time 8  complet with .env at 9 13am
require ('dotenv').config();
const Product = require("./models/Products");
const products = require("./routes/utils/seedProducts");

// Middleware
app.use(cors());
app.use(express.json({ limit: "10mb" })); // increase as needed
app.use(express.urlencoded({ limit: "10mb", extended: true }));

app.use('/api/auth',require('./routes/authR'));
//manageProducts admin
app.use('/api/products',require('./routes/manageProducts'));
app.use('/api/orders', require('./routes/orderR'));

const PORT=process.env.PORT||5000;
const DATABASE_URL=process.env.DATABASE_URL;


mongoose.connect(DATABASE_URL)
.then(()=>console.log("connected to mogodb"))
.catch(err=>console.error("db connection failed"));


app.get("/", (req, res) => {
  res.send("Gents Fashion Backend Running...");
});app.get("/seed", async (req, res) => {
  try {
    await Product.deleteMany(); // old products delete (optional)
    const createdProducts = await Product.insertMany(products);
    res.send({ message: "Products seeded successfully!", data: createdProducts });
  } catch (error) {
    res.status(500).send({ message: "Seeding failed", error });
  }
});
app.listen (PORT,'0.0.0.0',()=>{
    console.log(`SEver is Running on ${PORT}`);
})