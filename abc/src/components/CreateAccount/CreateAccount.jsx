/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { Icons24PxBlackBasket1 } from "../../icons/Icons24PxBlackBasket1";
import "./style.css";

export const CreateAccount = ({ inputType = "email", inputType1 = "text" }) => {
  return (
    <div className="create-account">
      <div className="CARD">
        <div className="overlap">
          <div className="CREATE-ACCOUNT">
            <div className="DEFAULT">
              <div className="overlap-group">
                <div className="text-wrapper">CREATE ACCOUNT</div>
              </div>
            </div>
          </div>
          <div className="i-AGREE-WITH">
            <div className="object-wrapper">
              <img className="object" alt="Object" src="/img/object.png" />
            </div>
            <p className="i-agree-with-the-pri">
              <span className="span">I agree with the </span>
              <span className="text-wrapper-2">Privacy Policy</span>
            </p>
          </div>
          <div className="div">password strenght:</div>
          <div className="text-wrapper-3">strong</div>
          <div className="PASSWORD">
            <div className="overlap-group-wrapper">
              <div className="overlap-group-2">
                <div className="text-wrapper-4">Password</div>
                <img className="img" alt="Object" src="/img/object-1.png" />
              </div>
            </div>
          </div>
          <div className="EMAIL">
            <div className="overlap-group-wrapper">
              <div className="overlap-group-2">
                <input className="input" placeholder="Email" type={inputType} />
                <img className="object-2" alt="Object" src="/img/object-2.png" />
              </div>
            </div>
          </div>
          <div className="NAME">
            <div className="overlap-group-wrapper">
              <div className="overlap-group-2">
                <input className="input" placeholder="Name" type={inputType1} />
                <img className="object-2" alt="Object" src="/img/object-3.png" />
              </div>
            </div>
          </div>
          <p className="or-sign-up-with-cred">Or sign up with credentials</p>
          <div className="SING-IN-WITH">
            <div className="LINE" />
            <div className="GITHUB">
              <div className="div-wrapper">
                <div className="overlap-group-3">
                  <div className="text-wrapper-5">GITHUB</div>
                  <img className="icon-github" alt="Icon github" src="/img/icon-github.svg" />
                </div>
              </div>
            </div>
            <div className="GOOGLE">
              <div className="DEFAULT-2">
                <div className="overlap-group-4">
                  <div className="text-wrapper-6">GOOGLE</div>
                  <img className="google" alt="Google" src="/img/google.png" />
                </div>
              </div>
            </div>
            <p className="sign-up-with">
              <span className="text-wrapper-7">Sign up wit</span>
              <span className="text-wrapper-8">h</span>
            </p>
          </div>
        </div>
      </div>
      <div className="navigation">
        <div className="text-wrapper-9">Create Account</div>
        <div className="oval-wrapper">
          <img className="oval" alt="Oval" src="/img/oval.svg" />
        </div>
        <Icons24PxBlackBasket1 className="icons-black" color="white" />
        <img className="icons-gray" alt="Icons gray" src="/img/icons-24px-gray-right-copy.png" />
      </div>
    </div>
  );
};

CreateAccount.propTypes = {
  inputType: PropTypes.string,
  inputType1: PropTypes.string,
};
