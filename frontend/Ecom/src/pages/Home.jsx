import { NavLink } from "react-router-dom";
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Image1 from '../assets/banner.webp';
import Image2 from '../assets/banner2.webp';
import Image6 from '../assets/banner3.webp';
import Image7 from '../assets/banner4.webp';
import Image3 from '../assets/badge1.webp';
import Image4 from '../assets/badge2.webp';
import Image5 from '../assets/badge3.webp';
import Thumbnail1 from '../assets/tn1.webp';
import Thumbnail2 from '../assets/tn2.webp';
import Thumbnail3 from '../assets/tn3.webp';
import Thumbnail4 from '../assets/tn4.webp';
import Thumbnail5 from '../assets/tn5.webp';
import Thumbnail6 from '../assets/tn6.webp';
import Thumbnail7 from '../assets/com.webp';
import Thumbnail8 from '../assets/tn7.webp';
import Thumbnail9 from '../assets/tn8.webp';
import WebImage from '../assets/Websitepage.webp'
import Post1 from '../assets/post.webp';
import Post2 from '../assets/post2.webp';
import Post3 from '../assets/post3.webp';
import Post4 from '../assets/post4.webp';
import packing from '../assets/packing.webp';
import team from '../assets/team.webp';
import QR from '../assets/qr.webp';
import Delivery from '../assets/delivery.webp';
import product1 from '../assets/product1.webp';
import product2 from '../assets/product2.webp';
import product3 from '../assets/product3.webp';
import product4 from '../assets/product4.webp';
import product5 from '../assets/product5.webp';
import product6 from '../assets/product6.webp';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import { getSlider } from '../Services/sliderService';
import { getIntroduction } from '../Services/IntroductionService';
import { getObjective } from '../Services/objectiveService';
import { getDelivery } from '../Services/deliveryService';
import { getProducts } from '../Services/productService';
import { getPost } from '../Services/postService';






function Home() {

  const [sliders, setSliders] = useState([]);
  const [intro, setIntro] = useState([]);
  const [obj, setObj] = useState([]);
  const [del, setDel] = useState([]);
  const [pro, setPro] = useState([]);
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);

 

useEffect(() => {
  const fetchAllData = async () => {
    try {
      setLoading(true);

      const [
        sliderData,
        introData,
        objData,
        delData,
        proData,
        postData,
        footerData
      ] = await Promise.all([
        getSlider(),
        getIntroduction(),
        getObjective(),
        getDelivery(),
        getProducts(),
        getPost(),
      ]);

      console.log("post:", postData);

      setSliders(sliderData.sliders || []);
      setIntro(introData.introduction);
      setObj(objData.objective);
      setDel(delData.delivery);
      setPro(proData.products || []);
      setPost(postData.post || []);

    } catch (error) {
      console.log("Failed to load home data:", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    }
  };

  fetchAllData();
}, []);

if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-[#dab37a] rounded-full animate-spin"></div>
    </div>
  );
}
    return(
      
    <div>
        <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 4000 }}
      loop={true}
      className="h-screen
       [&_.swiper-button-prev]:text-white bg-transparent
        [&_.swiper-button-next]:text-white bg-transparent
        mb-6"
    >
      {sliders.map((slide) => (
        <SwiperSlide key={slide._id}>
          <img
          src={slide.image}
          className="w-full h-screen object-cover"
          alt="Banner 2"
        />
        </SwiperSlide>
      

    ))}
      
    </Swiper>

    <section className="bg-[#dab37a] flex justify-center divide-x divide-black
     items-center gap-16 px-16 py-8 h-[150px]"style={{ fontFamily: "poppins" }} >
        <div className="flex flex-col items-center w-1/4">
             <img
               src={Image3}
                className="w-12 h-12"      
            />
             <h2 className="font-bold mt-3">
               Top Quality Products
             </h2>
        </div>
        <div>

        </div>

        <div  className="flex flex-col items-center text-center w-1/4">
             <img 
              src={Image4}
              className="w-12 h-12 "   
      
            />
             <h2 className="font-bold mt-3">
                Best Shipping Services
            </h2>

        </div>

        <div className="flex flex-col items-center text-center w-1/4"> 
            <img 
               src={Image5}
               className="w-12 h-12"   
            />
            <h2 className="font-bold mt-3">
            Top-Production
            </h2>
        </div>
       
       
        <div  className="flex flex-col items-center text-center w-1/4">
             <img 
               src={Image4}
               className="w-12 h-12"   
            />
            <h2 className="font-bold mt-3">
                Lowest Wholesale Pricing
            </h2>

        </div>
        
    </section>

    <section className="flex flex-col py-16 px-8">
      
    
      <div className="grid grid-cols-4 gap-x-4 gap-y-6 w-fit mx-auto cursor-pointer">
        <div className="relative w-56 h-56">
          <img
          src={Thumbnail1}
          className="w-full h-full object-cover"
           alt="FOOTBALL WEAR"
         />
         <h3 className="absolute bottom-6 flex items-center justify-center text-white text-xl font-bold">
           FOOTBALL WEAR
          </h3>
     </div>
     <div className="relative w-56 h-56 cursor-pointer">
          <img
          src={Thumbnail2}
          className="w-full h-full object-cover"
           alt="Football"
         />
         <h3 className="absolute bottom-6 flex items-center justify-center text-white text-xl font-bold">
           SPORTS WEAR
          </h3>
     </div>
     <div className="relative w-56 h-56 cursor-pointer">
          <img
          src={Thumbnail3}
          className="w-full h-full object-cover"
           alt="Football"
         />
         <h3 className="absolute bottom-6 flex items-center justify-center text-white text-xl font-bold">
           CASUAL WEAR
          </h3>
     </div>
     <div className="relative w-56 h-56 cursor-pointer">
          <img
          src={Thumbnail4}
          className="w-full h-full object-cover"
           alt="Football"
         />
         <h3 className="absolute bottom-6 flex items-center justify-center text-white text-xl font-bold">
           T-SHIRT | V-NECK & ROUND NECK
          </h3>
     </div>
     <div className="relative w-56 h-56 cursor-pointer">
          <img
          src={Thumbnail5}
          className="w-full h-full object-cover"
           alt="Football"
         />
         <h3 className="absolute bottom-6 flex items-center justify-center text-white text-xl font-bold">
           COACHWEAR
          </h3>
     </div>
     <div className="relative w-56 h-56 cursor-pointer">
          <img
          src={Thumbnail6}
          className="w-full h-full object-cover"
           alt="Football"
         />
         <h3 className="absolute bottom-6 flex items-center justify-center text-white text-xl font-bold">
           TROUSERS
          </h3>
     </div>
     <div className="relative w-56 h-56 cursor-pointer">
          <img
          src={Thumbnail8}
          className="w-full h-full object-cover"
           alt="Football"
         />
         <h3 className="absolute bottom-6 flex items-center justify-center text-white text-xl font-bold">
           CAP FOR CLUBS
          </h3>
     </div>
     <div className="relative w-56 h-56 cursor-pointer">
          <img
          src={Thumbnail9}
          className="w-full h-full object-cover"
           alt="Football"
         />
         <h3 className="absolute bottom-6 flex items-center justify-center text-white text-xl font-bold">
           POLO SHIRTS
          </h3>
     </div>
        
    

      </div>
    </section>

    <section className="flex flex-col items-center  mt-8"
    style={{ backgroundImage: `url(${Thumbnail7})`}}>
      {intro && (
          <div key={intro._id}>

      <div className="bg-no-repeat bg-cover bg-center bg-black/80 flex items-center min-h-[600px]">
        <div className="grid grid-cols-2  min-h-[450px] gap-36">
         <div className="ml-16">
            <img src={intro.image}
            alt={intro.title}
            className="w-full h-full object-cover"
             /> 

          </div>
          <div className="flex flex-col gap-6 mt-10">
            
               <h3  className="text-[#dab37a] text-3xl justify-start"
                style={{ fontFamily: "poppins" }}>
                  {intro.title}
               </h3>
               <p className="text-white text-md line-height-4"
                 style={{ fontFamily: "poppins" }}>
                   {intro.shortDescription} 
               </p>
               <NavLink to='/about-us' className="w-fit border rounded-full text-md bg-[#dab37a] text-black font-bold px-8 py-3
                 hover:bg-black hover:text-white transition">
                 Read More
                </NavLink>     
           
          </div>
          

      </div>

      </div>
     </div>
    )}

    </section>


    <section className="mt-10 flex flex-col">
      <div className="ml-8">
        <h2 className="text-3xl font-bold"
        style={{ fontFamily: "poppins" }}>
          NEW ARRIVAL
        </h2>
        <h3 className="text-xl text-gray-400"
        style={{ fontFamily: "poppins" }}>
          WHEN AN UNKNOWN PRINTER TOOK
        </h3>
      </div>
      
      <div className="mt-10 flex flex-row justify-center px-8">
        <Swiper
  slidesPerView={4}
  spaceBetween={20}
  modules={[Navigation, Pagination, Autoplay]}
  navigation
  pagination={{ clickable: true }}
  autoplay={{
    delay: 3000,
    disableOnInteraction: false,
  }}
  loop={true}
  className="
    [&_.swiper-button-prev]:text-black
    [&_.swiper-button-next]:text-black
    bg-transparent
  "
>
  {pro
    // Show only top-level products
    .filter((product) => !product.parent)
    .map((product) => (
      <SwiperSlide key={product._id}>
        <Link
          to={`/product/${product._id}`}
          className="flex flex-col items-center mt-8 gap-4"
        >
          {/* IMAGE */}
          <img
            src={product.image}
            alt={product.title}
            className="w-[270px] h-[280px] object-cover"
          />

          {/* PRODUCT INFO */}
          <div className="mt-4 flex flex-col items-center gap-2">

            {/* CATEGORY */}
            {product.category && (
              <span className="text-xs uppercase tracking-wider text-gray-400">
                {product.category}
              </span>
            )}

            {/* SUBTITLE */}
            {product.subTitle && (
              <h3 className="text-gray-500">
                {product.subTitle}
              </h3>
            )}

            {/* TITLE */}
            <h2 className="text-black font-semibold">
              {product.title}
            </h2>

            {/* PRICE */}
            <div className="flex flex-row gap-2 items-center">
              {product.discountPrice &&
              product.discountPrice < product.price ? (
                <>
                  <span className="line-through text-gray-500">
                    {product.price}
                  </span>

                  <span className="text-[#dab37a]">
                    {product.discountPrice}
                  </span>
                </>
              ) : (
                <span className="text-[#dab37a]">
                  {product.price}
                </span>
              )}
            </div>

          </div>
        </Link>
      </SwiperSlide>
    ))}
</Swiper>
      </div>
    </section>

    <section className=" mt-36  w-[100%] gap-56 bg-white">
      {obj && (
      <div className="flex flex-row" key={obj._id}>
        <div className="ml-16 w-fit w-[80%]">
        <h3 className="text-black text-4xl
        "style={{ fontFamily: "poppins" }}>
          {obj.whyChooseUs?.title1}
          
        </h3>
        <h3 className="text-yellow-500 text-4xl"
        style={{ fontFamily: "poppins" }}
        >
          {obj.whyChooseUs?.title2}
          
        </h3>
        <p className="text-black text-md"style={{ fontFamily: "poppins" }}>
          {obj.whyChooseUs?.points?.map((point, index) => (
          <li key={point._id}>{point.description}</li>
        ))}
        </p>
        <h4 className="text-xl text-gray-600 font-bold">
          {obj.mission?.title}
  
        </h4>
        <p className="text-black text-md"style={{ fontFamily: "poppins" }}>
          {obj.mission?.description}
        </p>
        <h4 className="text-xl text-gray-600 font-bold">
          {obj.vision?.title}
        </h4>
        <p className="text-black text-md w-96"style={{ fontFamily: "poppins" }}>
          {obj.vision?.description}
        </p>
        {obj.vision?.points?.map((point, index) => (
          <li key={point._id}>{point.description}</li>
        ))}
        <div className="mt-6">
         <img src={obj.image2} 
          className="w-96 h-36" />
         <img src={obj.image3}
          className="w-96 h-56" />
        </div>

       </div>
      
      <div className=" mt-16">
          <img src={obj.image1}
          className="w-[100%] h-[40%]"
           />      
      </div>

    </div>
      )}
      
    
    </section>

    <section className=" flex justify-center items-center bg-black  mt-16 w-[100%] h-[510px]">
      {del && (
        <div className=" flex flex-row gap-4  items-center" key={del._id}>
          <div className="w-[500px] h-1/3 object-cover">
           <img src={del.image1}
            className="w-full h-full" />
          </div>
          <div className="w-[500px] h-1/3 object-cover">
            <h3 className=" flex justify-center text-2xl bg-white font-bold"> Follow Us On Social Media</h3>
           <img src={del.image2}
            className="w-full h-full"  />
          </div>

        </div>
      )

      }
      
    </section>

    <section className="mt-36">
      <div className="flex flex-row justify-center">
        <Swiper
        slidesPerView={4}
        spaceBetween={20}
         modules={[Navigation, Pagination, Autoplay]}
         navigation
         pagination={{ clickable: true }}
         autoplay={{ delay: 4000 }}
         loop={true}
         className="w-full py-8 gap-8
         [&_.swiper-button-prev]:text-white bg-transparent
         [&_.swiper-button-next]:text-white bg-transparent
         mb-16"
        
        >
          {post?.Images?.map((img) => (
             <SwiperSlide key={img._id}>
            <img src={img}
            className="w-96 h-[90%] object-cover"/>
             </SwiperSlide>

          ))}
           
        </Swiper>
       

      </div>
      
    </section>
    



    </div>

    



    );
}

export default Home;