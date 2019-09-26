import React from 'react';
import { Link as RL } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <RL to="/manage/add">add post</RL>
    </div>
  );
};

export default Home;
