import Navbar from "./Navbar";
import './index.css';
import Home from "./components/home";
import Informacije from "./components/Informacije";
import Popis from "./components/Popis";
import Donacije from "./components/Donacije";
import Unos from "./components/Unos";
import TemaContext from "./kontekst";
import { useState } from "react";


function App() {
  const [tema, postaviTemu] = useState("User");


  let component
  switch(window.location.pathname){
    case "/":
      component = <Home></Home>
      break
    case "/informacije":
      component = <Informacije admin={tema}></Informacije>
      break
    case "/popis":
      component = <Popis admin={tema}></Popis>
      break
    case "/donacije":
      component = <Donacije admin={tema}></Donacije>
      break
    case "/unos":
      component = <Unos admin={tema}></Unos>
      break
  }


   
  function promjenaTeme(){
    postaviTemu(tema == "User" ? "Admin" : "User");
  }
 

  return (
    <>
  

     <div className="nav">
      Azil za životinje 
     <TemaContext.Provider value={tema}>
      </TemaContext.Provider>
     
     <button onClick={promjenaTeme} className="admin">{tema}</button> 
      </div>

    <Navbar></Navbar>
    {component}
    </>
  );
}

export default App;






