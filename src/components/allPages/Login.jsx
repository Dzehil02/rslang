import React from "react";
import Button from "../Button";



const Login = () => {

  return (
    <main className='page'>
      <div className="login__inputs">

         <input 
          className="login__input" 
          type="text" 
          placeholder="email"

          />

         <input 
          className="login__input" 
          type="text" 
          placeholder="password"

           />
      </div>
      <div className="login__btn">
         <Button nameButton='Войти'  />
         <Button nameButton='Регистрация'  />
      </div>
      
    </main>
  );
};



export default Login;
