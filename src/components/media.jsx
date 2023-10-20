import React from "react";
import AliceCarousel from 'react-alice-carousel';
import media1 from '../assets/img/media/midday.jpg'
import media5 from '../assets/img/media/mint.jpg'
import media3 from '../assets/img/media/media3.svg'
import media2 from '../assets/img/media/media2.png'
import media4 from '../assets/img/media/media4.svg'

function Media() {
  return (
    <div className="media_main">
      {/* <div class="feature__section-box text-center pb-40">
        <h4 class="section-subtitle title-anim">
          You stay in control, we do the work for you.
        </h4>
      </div> */}

      <div className="media">
        <img src={media3} alt="" />
        <img src={media2} alt="" />
        <img src={media4} alt="" />
        <img src={media1} alt="" />
        <img src={media5} alt="" />
      </div>
    </div>
  )
}

export default Media