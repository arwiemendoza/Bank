import React from "react";
import gif from '../components/animated.gif'
import '../css/Loading.css'


function Contact() {
    return (
        <div className="contact">
        <div class="container">
          <img src={gif}/>
        </div>
        </div>
    );
}

export default Contact;