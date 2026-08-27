import {
    faLocationDot,
    faPhone,
    faEnvelope,
    faMagnifyingGlass
} from "@fortawesome/free-solid-svg-icons";
import {
  faWhatsapp
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from 'react';


function About() {
    const [loading, setLoading] = useState(true);
     useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); // 2000ms = 2 seconds

    return () => clearTimeout(timer);
  }, []);

 if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-[#dab37a] rounded-full animate-spin"></div>
    </div>
  );
}
    return(
        <section className="flex flex-col mt-20 px-6 py-6 gap-12"
                style={{ fontFamily: "poppins" }} >
            <div className="flex flex-row justify-between bg-gray-100">
                <span className="text-gray-800">
                  <NavLink to='/' className="cursor-pointer
                     text-gray-400">Home  <span className="ml-2 mr-4 text-md text-gray-400">&gt;</span>
                 </NavLink>
                  About Us
                </span>

                <span className="text-gray-800"><NavLink to='/' className="cursor-pointer">Return to Previous Page</NavLink></span>

            </div>
            <div className=" flex flex-col mt-16 gap-6 text-gray-600 text-lg" >
                <div>
                                              
                 Welcome to Singhania Industries — a trusted international sportswear manufacturing
                 and wholesale partner delivering premium-quality apparel solutions to sports clubs,
                 brands, retailers, and distributors worldwide.
               </div>
               <div>             
                 Established in 2012, Singhania Industries has built a strong reputation for producing high-quality custom sportswear and apparel with a commitment to excellence, reliability, and international manufacturing standards. With offices in Dubai and London, and a fully equipped manufacturing
                 facility in Pakistan, we proudly serve global clients with
                 professional production capabilities and competitive
                 wholesale solutions.
               </div>

            </div>

            <div className="flex flex-col gap-2 font-bold text-gray-700">
                <div className="flex flex-row items-center gap-4">
                    <FontAwesomeIcon icon={faLocationDot}/><h3>Paris Road, Sialkot</h3>
                </div>
                <div className="flex flex-row items-center gap-4">
                       <FontAwesomeIcon icon={faLocationDot}/><h3>UK, London</h3>
                </div>
                <div className="flex flex-row items-center gap-4">
                    <FontAwesomeIcon icon={faLocationDot}/><h3>USA, California</h3>
                </div>     
                <div className="flex flex-row items-center gap-4">
                    <FontAwesomeIcon icon={faPhone}/><h3>+923330000000</h3>
                </div>  
                <div className="flex flex-row items-center gap-4">
                    <FontAwesomeIcon icon={faWhatsapp}/><h3>+923330000000</h3>
                </div>
                <div className="flex flex-row items-center gap-4">
                    <FontAwesomeIcon icon={faEnvelope}/><h3>WebExcel@gmail.com</h3>
                </div>         
                
            </div>
            
        </section>



    );
}
export default About;