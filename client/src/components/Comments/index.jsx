import React, { useState, useEffect } from 'react';
import { BiComment } from 'react-icons/bi';
import api from '../../services/api';
import './style.css';

const Comments = () => {
  const [commentsAll, setCommentsAll] = useState([]);

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
        <div className="container-icon">
          <BiComment size={35} color="#686868"/>
        </div>
        <div className="item-content">
          <p className="address">
            { value.email }
          </p>
          <p className="text-result">
            { value.text }
          </p>
        </div>
      </div>
    );
  });

  return(
    <div className="container-comments">
      <div className="title-comments">
        <p>{result.length} Comentários</p>
      </div>
      <div className="container-result">
        { result }
      </div>
    </div>
  );
}
 
export default Comments;