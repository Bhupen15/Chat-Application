import React from 'react';
import { Button, ButtonGroup } from '@chakra-ui/react'
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Chat from './Pages/Chat';

function App() {
  return (
    <div className="App">
      <Routes>
     <Route path="/" Component={Home} />
     <Route path="/chat" Component={Chat}/>
     </Routes>
    </div>
  );
}

export default App;
