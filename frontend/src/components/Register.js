import { useState } from "react";
import { Link } from "react-router-dom";

function Register(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleMailInput(evt) {
    setEmail(evt.target.value);
  }

  function handlePasswordInput(evt) {
    setPassword(evt.target.value);
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    props.onRegister(email, password);
  }

  return (
    <section className='auth'>
      <h3 className='auth__title'>Регистрация</h3>
      <form className='auth__form' onSubmit={handleSubmit}>
        <input className='auth__input' type="email" placeholder="Email" value={email} onChange={handleMailInput} required/>
        <input className='auth__input' type="password" placeholder="Пароль" value={password} autoComplete="on" onChange={handlePasswordInput} required/>
        <button className='auth__submit-button' type="submit">Зарегистрироваться</button>
      </form>
      <p className='auth__btn-caption'>Уже зарегистрированы? <Link to="/signin" className='auth__link'>Войти</Link></p>
    </section>
  );
};

export default Register;
