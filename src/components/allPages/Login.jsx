import React, { useContext, useState } from "react";
import Button from "../Button";
import { createUser, loginUser, getUserId } from "../../API";
import { AuthContext } from "../context";

export const loadJSON = key => key && JSON.parse(localStorage.getItem(key));
const saveJSON = (key, data) => localStorage.setItem(key, JSON.stringify(data));

const Login = () => {
  const {isAuth, setIsAuth} = useContext(AuthContext);
  const [desc, setDesc] = useState("");
  const [mail, setMail] = useState("");
  const [pass, setPass] = useState("");

  const postUserOnServer = async () => {
    await createUser({ "email": mail, "password": pass })
    const authenticated = await loginUser({ "email": mail, "password": pass })
    saveJSON("userName", authenticated)
    setDesc(`Вы успешно зарегистрированны, нажмите кнопку "Войти"`)
  }

  const signIn = async () => {
   const checkUser = await loginUser({ "email": mail, "password": pass })
   if(!checkUser) {
    setDesc(`Пользователь ${mail}  не найден. Проверьте логин или пароль или выполните регистрацию`)
    return;
   } 
   const getAuthenticatedUser = await getUserId( {userId: checkUser.userId, token: checkUser.token} )
   if(getAuthenticatedUser) {
    saveJSON("userName", checkUser)
    setDesc(`Добро пожаловать  ${getAuthenticatedUser.email}`)
    saveJSON("nickName", getAuthenticatedUser.email)
    setIsAuth(true)
   }
  
  }

  return (
    <main className='page'>
      <div className="login__inputs">

         <input 
          className="login__input" 
          type="text" 
          placeholder="email"
          value={mail}
          onChange={(e) => setMail(e.target.value)} 
          />

         <input 
          className="login__input" 
          type="password" 
          placeholder="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)} 
           />
          <div className="card__text">{desc}</div>
      </div>
      <div className="login__btn">
         <Button nameButton='Войти' onClick={signIn} />
         <Button nameButton='Регистрация' onClick={postUserOnServer} />
      </div>
      
    </main>
  );
};

export default Login;
