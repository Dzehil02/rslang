import React from "react";

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer__top _container'>
        <div>
          <div className='footer__label'>
            <a href="https://rs.school/" target='blank'>
              <img
              className='footer__logo-rs'
              src={require("../assets/rs_png.png")}
              alt='RS_school'
            ></img>
            </a>
            
          </div>
        </div>
        <div>
          <div className='footer__label year'>2022</div>
        </div>
        <div className='footer__github-list'>
          <div className='footer__label footer__github-item'>
            <a target='blank' href='https://github.com/Dzehil02' className='menu__link'>
              Dzehil02
            </a>
          </div>
          <div className='footer__label footer__github-item'>
            <a target='blank' href='https://github.com/Fespis' className='menu__link'>
            Fespis
            </a>
          </div>
          <div className='footer__label footer__github-item'>
            <a target='blank' href='https://github.com/Evgeniy37529' className='menu__link'>
            Evgeniy37529
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
