
import React from 'react';
import Main from './Pages/MainPage';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import './App.css';
import Formulario from './Pages/FormPage';
import Lista from './Pages/ListPage';
import ErroPage from './Pages/Erro';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='' element={<Main/>}/>
        <Route path='/Form' element={<Formulario/>}/>
        <Route path='/List' element={<Lista/>}/>
        <Route path='/*' element={<ErroPage/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
