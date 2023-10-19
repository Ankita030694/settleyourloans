
import "../assets/css/banks.css";
import Header from "./Header";
import SocialHeader from "./socialheader";
import bank1 from "../assets/img/banks/bank1.png";
import bank2 from "../assets/img/banks/bank2.png";
import bank3 from "../assets/img/banks/bank3.png";
import bank4 from "../assets/img/banks/bank4.png";
import bank5 from "../assets/img/banks/bank5.png";
import bank6 from "../assets/img/banks/bank6.png";
import bank7 from "../assets/img/banks/bank7.png";
import bank8 from "../assets/img/banks/bank8.png";
import bank9 from "../assets/img/banks/bank9.png";


import React, { useState } from 'react';
import Slider from 'react-slick';
// function Banks (){
//     return(
//         <>
//         <div className="banks-bg">
//         <div className="banks">
//             <div className="bank-span">
//                 <h3>We have effectively assested our <br />
//                 clients in achieving settlements <br /> 
//                 from</h3>
//             </div>
//             </div>
//             <div className="bank-logos">
//                 <img src={yes} alt="" style={{width: 200, height: 100}}/>
//                 <img src={state} alt="" style={{width: 200, height: 100}}/>
//                 <img src={baroda} alt="" style={{width: 200, height: 100}}/>
//                 <img src={rbl} alt="" style={{width: 200, height: 100}}/>
//                 <img src={kotak} alt="" style={{width: 200, height: 100}}/>
//                 <img src={indusland} alt="" style={{width: 200, height: 100}}/>
//                 <img src={idbi} alt="" style={{width: 200, height: 100}}/>
//                 <img src={hdfc} alt="" style={{width: 200, height: 100}}/>
//                 <img src={axis} alt="" style={{width: 200, height: 100}}/>
//                 <img src={icici} alt="" style={{width: 200, height: 100}}/>
//             </div>

//             </div>

//         </>
//     )
// }
// export default Banks;


const Banks = () => {
    const [settings] = useState({
        // dots: true,

        infinite: true,
        slidesToShow: 5,
        // slidesToScroll: 1,
        autoplay: true,
        arrows: false,
        // speed: 1000,
        // autoplaySpeed: 1000,
        cssEase: 'linear',
    });

    return (


        <div className="banks-bg">
            <div className="banks">
                <div className="bank-span">
                    <h3>We have effectively assested our <br />
                        clients in achieving settlements <br />
                        from</h3>
                </div>
            </div>
            <br />
            <br />
            <Slider {...settings}>
                <img src={bank1} alt="" />
                <img src={bank2} alt="" />
                <img src={bank3} alt="" />
                <img src={bank4} alt="" />
                <img src={bank5} alt="" />
                <img src={bank6} alt="" />
                <img src={bank7} alt="" />
                <img src={bank8} alt="" />
                <img src={bank9} alt="" />

            </Slider>


        </div>

    );
};
export default Banks;