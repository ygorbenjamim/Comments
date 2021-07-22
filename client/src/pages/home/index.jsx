import React from 'react';
import TextBox from '../../components/TextBox';
import Comments from '../../components/Comments';

const Home = () => {
  return (
    <>
      <TextBox
        title="Escrever comentário"
        btnLabel="Enviar"
      />
      <Comments />
    </>
  );
}
 
export default Home;