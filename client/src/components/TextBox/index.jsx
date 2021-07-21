import React, { useEffect, useState } from 'react';
import {
  BiText,
  BiCheckCircle,
  BiComment
} from 'react-icons/bi';
import './style.css';
import api from '../../services/api';

const TextBox = ( props ) => {

  const [msgStatus, setMsgStatus] = useState('none');
  const [msgColor, setMsgColor] = useState('#eee');
  const [msg, setMsg] = useState('');
  const [text, setText] = useState('');
  const [commentsAll, setCommentsAll] = useState([]);

  function closeMsg(){
    setMsgStatus('none');
  }

  async function send(){
    if(text === ''){
      setMsgColor('#ff6961');
      setMsgStatus('flex');
      setMsg('Houve algum erro, tente novamente.');
      setText('');
      return;
    }
    const data = { text: text };
    const response = await api.post('/comments/insert', data);
    console.log('A request was made to create a comment.');
    if(response.status === 200){
      setMsgColor('#228b22');
      setMsgStatus('flex');
      setMsg('O seu comentário foi enviado.');
      setText('');
      selectAll();
    } else{
      setMsgColor('#ff6961');
      setMsgStatus('flex');
      setMsg('Houve algum erro, tente novamente.');
      setText('');
    };
  }

  async function selectAll(){
    const response = await api.get('/comments');
    console.log('A request was made to fetch all comments.');
    setCommentsAll(response.data);
  }

  useEffect(() => {
    selectAll();
  }, []);

  const result = commentsAll.map((value) => {
    return(
      <div className="items" key={ value._id }>
        <div>
          <BiComment size={35} color="#686868"/>
        </div>
        <p className="text-result">
          { value.text }
        </p>
      </div>
    );
  });

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
        value={text}
        onChange={e => setText(e.target.value)}
      ></textarea>
      <div className="container-button">
        <button onClick={send}>{props.btnLabel}</button>
      </div>
      <div className="container-comments">
        <div className="title-comments">
          <p>{result.length} Comentários</p>
        </div>
        <div className="container-result">
          { result }
        </div>
      </div>
    </div>
  );
}
 
export default TextBox;