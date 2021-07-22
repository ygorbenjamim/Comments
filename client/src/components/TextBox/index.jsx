import React, { useState } from 'react';
import {
  BiText,
  BiCheckCircle
} from 'react-icons/bi';
import './style.css';
import api from '../../services/api';

const TextBox = ( props ) => {

  const [email, setEmail] = useState('');
  const [msgStatus, setMsgStatus] = useState('none');
  const [msgColor, setMsgColor] = useState('#eee');
  const [msg, setMsg] = useState('');
  const [text, setText] = useState('');

  function closeMsg(){
    setMsgStatus('none');
    window.location = '/';
  }

  async function send(){
    if(text === '' || email === ''){
      setMsgColor('#ff6961');
      setMsgStatus('flex');
      setMsg('Houve algum erro, tente novamente.');
      setText('');
      return;
    }
    const data = { email: email, text: text };
    const response = await api.post('/comments/insert', data);
    console.log('A request was made to create a comment.');
    if(response.status === 200){
      setMsgColor('#228b22');
      setMsgStatus('flex');
      setMsg('O seu comentário foi enviado.');
      setText('');
      setEmail('');
    } else{
      setMsgColor('#ff6961');
      setMsgStatus('flex');
      setMsg('Houve algum erro, tente novamente.');
      setText('');
      setEmail('');
    };
  }

  return (
    <div className="container">
      <div
        className="msg"
        style={{
          display: msgStatus,
          backgroundColor: msgColor
        }}
      >
        <p>{msg}</p>
        <button className="msg-button" onClick={closeMsg}>
          <BiCheckCircle size={54} color="#eee"/>
        </button>
      </div>
      <div className="conatiner-header">
        <p>{props.title}</p>
        <BiText size={24} color='#686868'/>
      </div>
      <textarea
        value={ text }
        onChange={ e => setText(e.target.value) }
      ></textarea>
      <div className="identification">
        <p className="identification-title">Comentar como convidado</p>
        <input
          className="email"
          placeholder="Email"
          value={ email }
          onChange={(value) => setEmail(value.target.value)}
        />
      </div>
      <div className="container-button">
        <button onClick={send}>{props.btnLabel}</button>
      </div>
    </div>
  );
}
 
export default TextBox;