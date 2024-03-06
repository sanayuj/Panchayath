import React from 'react'
import "./Footer.css"
import { Link } from 'react-router-dom'
function Footer() {

  return (
    <div>  
    <footer className="site-footer ">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <h6>About</h6>
            <p className="text-justify">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. </p>
          </div>

          <div className="col-xs-6 col-md-3">
            <h6>Categories</h6>
            <ul className="footer-links">
              <li><Link className='text-decoration-none' >new Project</Link></li>
              <li><Link className='text-decoration-none' >About Us</Link></li>
              <li><Link className='text-decoration-none'>Contact Us</Link></li>
              <li><Link className='text-decoration-none'>Contribute</Link></li>
              <li><Link className='text-decoration-none'>Privacy Policy</Link></li>
              <li><Link className='text-decoration-none'>map</Link></li>
            </ul>
          </div>

          <div className="col-xs-6 col-md-3">
            <h6>Quick Links</h6>
            <ul className="footer-links">
              <li><Link className='text-decoration-none'>About Us</Link></li>
              <li><Link className='text-decoration-none'>Contact Us</Link></li>
              <li><Link className='text-decoration-none'>Contribute</Link></li>
              <li><Link className='text-decoration-none'>Privacy Policy</Link></li>
              <li><Link className='text-decoration-none'>map</Link></li>
            </ul>
          </div>
        </div>
        <hr/>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-sm-6 col-xs-12">
            <p className="copyright-text">Copyright &copy; 2024 All Rights Reserved by 
         <a > Sanay</a>.
            </p>
          </div>

          
        </div>
      </div>
</footer></div>
  )
}

export default Footer