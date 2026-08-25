const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('../Backend/config/db');
const Product = require('../Backend/models/Product');
const Slider = require('../Backend/models/Slider');
const Footer = require('../Backend/models/Footer');
const websiteSettings = require('../Backend/models/websiteSettings');
const Menu = require('../Backend/models/Menu');
const Introduction = require('../Backend/models/Introduction');
const Objective = require('../Backend/models/Objective');
const Delivery = require('../Backend/models/Delivery');
const Post = require('../Backend/models/Post');

const Products = require('../Backend/seed/Products');
const Banners = require('../Backend/seed/Banner'); 
const footerData = require('../Backend/seed/Footer');
const settingsData = require('../Backend/seed/Settings');
const menuData = require('../Backend/seed/Menu');
const introData = require('../Backend/seed/Introduction');
const objectiveData = require('../Backend/seed/objectiveData');
const deliveryData = require('../Backend/seed/deliveryData');
const postData = require('../Backend/seed/postData');

dotenv.config()

const seedData = async () => {
  try {

        await connectDB();

       await Product.deleteMany();   // clear old data
       await Product.insertMany(Products);

       await Slider.deleteMany();            //clear old data
       await Slider.insertMany(Banners);

       await Footer.deleteMany();            //clear old data
       await Footer.insertMany(footerData);

       await websiteSettings.deleteMany();            //clear old data
       await websiteSettings.insertMany(settingsData);

        await Menu.deleteMany();            //clear old data
       await Menu.insertMany(menuData);

        await Introduction.deleteMany();            //clear old data
       await Introduction.insertMany(introData);

        await Objective.deleteMany();            //clear old data
       await Objective.insertMany(objectiveData);

       console.log("Post seed data:", postData);
        await Delivery.deleteMany();            //clear old data
       await Delivery.insertMany(deliveryData);

        await Post.deleteMany();            //clear old data
       await Post.insertMany(postData);

  

       console.log("Database Name:", mongoose.connection.db.databaseName);
       console.log("✅ Data seeded successfully");

       process.exit();


  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

seedData(); 