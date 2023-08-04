import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";

function Header({products}) {

  const [checked , setChecked] = useState(1)
  const [imgUrl , setImgUrl] = useState("")

  useEffect(() => {
    if(checked === 1){
      setImgUrl("https://cdn.discordapp.com/attachments/1088531111942037534/1105220070856196146/IMG_1498.png")
    }else if(checked === 2){
      setImgUrl("https://cdn.discordapp.com/attachments/1088531111942037534/1105214825249919107/unnamed_2-removebg-preview.png")
    }else if(checked === 3){
      setImgUrl("https://cdn.discordapp.com/attachments/1088531111942037534/1107795553393332367/IMG_1533.png")
    }
  },[checked])

  let product = null

  if(products !== null){
    if(checked === 1){
      product = products.find((item) => item.nameInUrl === 'RhyconCyclone')
    }else if(checked === 2){
      product = products.find((item) => item.nameInUrl === 'badge')
    }else if(checked === 3){
      product = products.find((item) => item.nameInUrl === 'signals')
    }
  }

  return (
    <header>
      <div className="container">
        <div className="header--content">
            <h1 className="header--content__title">
              Master the Art of <span className="purple">Investing:</span>
              <br /> <span className="purple">Professional</span> Tools for{" "}
              <span className="purple">Wealth</span> Building
            </h1>
            <div className="buy-container">
        <div className="buy--content">
          <div className="buy__table">
            <div className="buy__table--bar">
              <button onClick={() => setChecked(1)} className={`table--bar__btn ${checked != 1 && "low-lighted"}`}>Indicator</button>
              <button onClick={() => setChecked(2)} className={`table--bar__btn ${checked != 2 && "low-lighted"}`}>Blue badge</button>
              <button onClick={() => setChecked(3)} className={`table--bar__btn ${checked != 3 && "low-lighted"}`}>Signals</button>
            </div>
            <div className="buy__table--content">
            {
              (product !== null && checked === 1) && product.description
            }
            {
              checked === 3 && (
                <>
                <p>How does 1 week of copying a Pro Traders exact trades for only $10 sound?</p>
                <ul className="buy--list">
                  <li className="buy--list__item">
                   why not try it out today
                     </li>
                </ul>
                </>
              )
            }
             {
              checked === 2 && (
                <>
                <p>A package created to launch you into the trading world with access to...</p>
                <ul className="buy--list">
                  <li className="buy--list__item">
                  Premium Signals 
                  </li>
                  <li className="buy--list__item">
                  The Rhycon Indicator
                  </li>
                  <li className="buy--list__item">
                  Access to all premium channels 
                  </li>
                  <li className="buy--list__item">
                 Premium role on the server
                  </li>
                </ul>
                </>
              )
            }
            </div>
          </div>
          <Link className="buy__link" to={`/products/${product && product.nameInUrl}`}>
            <button className="buy__btn">Buy Now</button>
          </Link>
        </div>
        <div className="buy--img">
          <img src={imgUrl} />
        </div>
      </div>
          </div>
        </div>
    </header>
  );
}

export default Header;
