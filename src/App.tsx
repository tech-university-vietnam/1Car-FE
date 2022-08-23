import React, { useEffect } from "react";
import './App.css';
import { BrowserRouter } from 'react-router-dom';
import AppRouters from './Routes';
import ErrorBoundary from './components/ErrorBoundary';

function App() {
  useEffect(() => {

  });
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <AppRouters />
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
