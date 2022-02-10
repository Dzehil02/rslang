import React from "react";

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer__top _container'>
        <div>
          <div className='footer__label'>
            <img
              className='footer__logo-rs'
              src={require("../assets/rs_png.png")}
              alt='RS_school'
            ></img>
          </div>
        </div>
        <div>
          <div className='footer__label year'>2022</div>
        </div>
        <div className='footer__github-list'>
          <div className='footer__label footer__github-item'>
            <a href='#/' className='menu__link'>
              Github_1
            </a>
          </div>
          <div className='footer__label footer__github-item'>
            <a href='#/' className='menu__link'>
              Github_2
            </a>
          </div>
          <div className='footer__label footer__github-item'>
            <a href='#/' className='menu__link'>
              Github_3
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
