import React from 'react'
import Guide from './guide'
import { BrowserRouter } from 'react-router-dom'

function TeamderApp() {
  return (
    <BrowserRouter>
      <Guide />
    </BrowserRouter>
  );
}

export default TeamderApp;
