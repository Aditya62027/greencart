import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import 'dotenv/config';                       
// import { use } from 'react';
import userRouter from './routes/userRoute.js';
import sellerRouter from './routes/sellerRoute.js';
import connectCloudinary from './config/cloudinary.js';
import productRouter from './routes/productRoutes.js';
import cartRouter from './routes/cartRoute.js'; 
import addressRouter from './routes/addressRoute.js';
import orderRouter from './routes/orderRoute.js';
import { stripeWebhooks } from './controllers/orderController.js';

const app = express();
const PORT = process.env.PORT || 4000;

await connectDB()

await connectCloudinary()


const allowedOrigins = ['http://localhost:5173']

app.post('/stripe', express.raw({type: 'application/json'}), stripeWebhooks)


// Middleware Configuration
app.use(express.json());
app.use(cookieParser());
app.use(cors({origin: allowedOrigins, credentials: true}));

app.get('/', (req, res) => res.send("API is Working") );
app.use('/api/user', userRouter) //user related routes
app.use('/api/seller', sellerRouter)
app.use('/api/product', productRouter) //product related routes
app.use('/api/cart', cartRouter) //cart related routes
app.use('/api/address', addressRouter) //address related routes
app.use('/api/order' , orderRouter)


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})

