import { useState } from "react";

function Login(props) {
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
    props.onLogin(email, password);
  }

  return (
    <section className='auth'>
      <h3 className='auth__title'>Вход</h3>
      <form className='auth__form' onSubmit={handleSubmit}>
        <input className='auth__input' type="email" placeholder="Email" value={email} onChange={handleMailInput} required/>
        <input className='auth__input' type="password" placeholder="Пароль" value={password} autoComplete="on" onChange={handlePasswordInput} required/>
        <button className='auth__submit-button' type="submit">Войти</button>
      </form>
    </section>
  );
};

export default Login;
