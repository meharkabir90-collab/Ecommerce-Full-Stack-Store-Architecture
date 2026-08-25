import { NavLink } from "react-router-dom";
import Image from '../../assets/logoweb.webp'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faXTwitter,
  faYoutube,
  faWhatsapp
} from "@fortawesome/free-brands-svg-icons";
import {
    faLocationDot,
    faPhone,
    faEnvelope,
    faMagnifyingGlass
} from "@fortawesome/free-solid-svg-icons";

import { useState, useEffect } from 'react';
import { getFooter } from '../../Services/FooterSettings';
import { getSetting } from '../../Services/webSettingsService';



function Footer() {

    const [footer, setFooter] = useState([]);
    const [settings, setSettings] = useState(null);
      useEffect(() => {
        const fetchAllData = async () => {
          try {
            const [footerData, settingData] = await Promise.all([
              getFooter(),
              getSetting(),
              
            ]);
            setFooter(footerData.footer)
            setSettings(settingData.settings);
            
          } catch (error) {
            console.log("Failed to load home data:", error);
          }
        };
        fetchAllData();
      });
      
    


    return(
        <div className="flex flex-col w-full bg-zinc-800 items-center justify-between">
        <div className="flex flex-row mb-16 justify-start gap-20">
            <section className="flex flex-col gap-8 mt-12 ml-8 items-center">
                  {settings && (
                    <div key={settings._id}>
                        <img src={settings.logo} alt="Logo Image"
                       className="w-36 h-24"/>

                    </div>

                )}
                {footer && (
                    <div key={footer._id}>
                         <p className="text-white text-md w-96"
                         style={{ fontFamily: "poppins" }}
                        >
                       {footer.aboutText} 
                      </p>

                    </div>
                )

                }
               
                  <div className="flex flex-row gap-4 text-white font-bold"
                >
                     <div className="flex flex-row items-center gap-4">
                       <a href={settings?.facebook}>
                        <FontAwesomeIcon icon={faFacebook} />
                       </a>
                     </div>
                    <div className="flex flex-row items-center gap-4">
                     <a href={settings?.instagram}>
                       <FontAwesomeIcon icon={faInstagram} />
                     </a>
                    </div>
                   <div className="flex flex-row items-center gap-4">
                      <a href={settings?.linkedin}>
                         <FontAwesomeIcon icon={faLinkedin} />
                      </a>
                    </div>
                    <div className="flex flex-row items-center gap-4">
                       <a href={settings?.twitter}>
                         <FontAwesomeIcon icon={faXTwitter} />
                        </a>
                    </div>
                    <div className="flex flex-row items-center gap-4">
                      <a href={settings?.youtube}>
                        <FontAwesomeIcon icon={faYoutube} />
                      </a>
                    </div>                                        
                 
                    

                </div>
            </section>
            <section className="flex flex-col items-center gap-12 mt-12"
            style={{ fontFamily: "poppins" }}>
                <h3 className="font-bold text-xl text-white mr-12">
                    QUICK LINKS
                </h3>
                <div className="flex flex-col gap-4 text-white text-md">
                    {footer?.quickLinks?.map((foot) => (
                    
                    <NavLink to={foot.url} key={foot._id}>
                        {foot.title}
                    </NavLink>
                  
                    ))}

                </div>
                 
            </section>
            <section className="flex flex-col items-center gap-12 mt-12"
            style={{ fontFamily: "poppins" }}>
                <h3 className="font-bold text-xl text-white">
                    CATEGORIES
                </h3>
                <div className="flex flex-col gap-4 text-md text-white">
                    {footer?.categories?.map((foot) => (
                        <div className="flex flex-row items-center gap-4">
                        <NavLink key={foot._id} to={foot.url} >{foot.title}</NavLink>
                     </div> 
                   ))}

                    
                     
                                                            
                </div>
                 
            </section>       
             <section className="flex flex-col items-center gap-8 mt-12
             "style={{ fontFamily: "poppins" }}>
                <h3 className="font-bold text-xl text-white">
                    CONTACT US
                </h3>
                <div className="flex flex-col gap-2 text-md text-white">
                    <div className="flex flex-row items-center gap-4">
                         <FontAwesomeIcon icon={faLocationDot}/>
                         {settings &&  (
                            <div key={settings._id}>
                                <h3>{settings.address1}</h3>
                            </div>

                         )}
                         
                          
                    </div> 
                    <div className="flex flex-row items-center gap-4">
                         <FontAwesomeIcon icon={faLocationDot}/> 
                          {settings &&  (
                            <div key={settings._id}>
                                <h3>{settings.address2}</h3>
                            </div>

                         )}
                    </div> 
                    <div className="flex flex-row items-center gap-4">
                         <FontAwesomeIcon icon={faLocationDot}/> 
                          {settings &&  (
                            <div key={settings._id}>
                                <h3>{settings.address3}</h3>
                            </div>

                         )}
                    </div> 
                    <div className="flex flex-row items-center gap-4">
                        <FontAwesomeIcon icon={faPhone} /> 
                         {settings &&  (
                            <div key={settings._id}>
                                <h3>{settings.phone}</h3>
                            </div>

                         )}


                    </div>  
                    <div className="flex flex-row items-center gap-4">
                         <FontAwesomeIcon icon={faWhatsapp} />
                          {settings &&  (
                            <div key={settings._id}>
                                <h3>{settings.whatsapp}</h3>
                            </div>

                         )}
                        
                    </div>  
                      <div className="flex flex-row items-center gap-4">
                        <FontAwesomeIcon icon={faEnvelope} />
                         {settings &&  (
                            <div key={settings._id}>
                                <h3>{settings.email}</h3>
                            </div>

                         )}
                    </div>
                                                            
                </div>
                <div className="flex items-center gap-2 text-white" >
                  <input
                type="text"
                placeholder="Enter email here"
                className="py-2 bg-white border border-white w-[90%] h-8 text-black " /> 
                    <button className="bg-gray-500 px-4 ">
                        Submit
                    </button>

                </div>
                
                        
                 
            </section>
            
            
        </div>
        <hr className="w-full bg-white mb-4"></hr>
        <div className="flex flex-row">
            <h3 className="text-white text-md mb-4"
            style={{ fontFamily: "poppins" }}>
                Copyright @ 2026 Singhania Industries All rights reserved. Designed & Developed by: Kabeer
            </h3>
        </div>
      </div>
        



    );
}

export default Footer;