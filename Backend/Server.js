const dotenv = require('dotenv');
dotenv.config();

const sliderRoutes = require('./routes/sliderRoutes');
const productRoutes = require('./routes/productRoutes');
const footerRoutes = require('./routes/footerRoutes');
const settingRoutes = require('./routes/settingRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const newsLetterSubscriber = require('./routes/newsLetterRoutes');
const introductionRoutes = require('./routes/introductionRoutes');
const objectiveRoutes = require('./routes/objectiveRoutes');
const deliveryRoutes = require('./routes/deliveryRoutes');
const postRoutes = require('./routes/postRoutes');
const menuRoutes = require('./routes/menuRoutes');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require("./routes/adminRoutes");


const express = require('express');
const app = express();

const dbConnect = require('./config/db');
dbConnect();


app.use(express.json());

const cors = require('cors');
app.use(cors({
    origin: [
        "http://localhost:5173",
        "https://ecommerce-system-architecture.vercel.app"
    ],
    credentials: true
}));




// Routes
app.use('/api/slider', sliderRoutes);
app.use('/api/product', productRoutes);
app.use('/api/footer', footerRoutes);
app.use('/api/settings', settingRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/newsLetter', newsLetterSubscriber);
app.use('/api/intro', introductionRoutes);
app.use('/api/objective', objectiveRoutes);
app.use('/api/menu', menuRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/delivery', deliveryRoutes);
app.use('/api/post', postRoutes);
app.use("/api/admin/dashboard", adminRoutes);
app.use("/api/order", orderRoutes);


app.use('/', (req, res) => {
    res.send("Ecommerce Store Backend");

}

);

const PORT = process.env.PORT || 5000;

if (process.env.VERCEL !== '1') {
    app.listen(PORT, () => {
        console.log(`Server is running on ${PORT}`);
    });
}



module.exports = app;




