import "../index.css"
import { useState } from "react";
import axios from "axios";


function Unos(props) {
    const [formaPodaci, postaviPodatke] = useState({
        ime: "",
        vrsta: "",
        godine: "",
        udomljen: false,
        opis: "",
      });

  const handleSubmit = (event) => {
    event.preventDefault();
    postaviPodatke(formaPodaci);
  };

  function dodajZivotinju(){
    axios.post('http://localhost:3001/zivotinje', formaPodaci)
  .then(rez => console.log(rez))
  }

  if (props.admin === "User") {
    return <h2 style={{color:"red", textAlign:"center", margin:15}}>Morate biti prijavljeni kao administrator</h2>;
  }
  
  return (
    <div style={{margin:50}}>
      <form onSubmit={handleSubmit}>
        <label>
          Ime:
          <input type="text" name="name" required onChange={(event) => postaviPodatke({...formaPodaci, ime: event.target.value})} />
        </label>
        <br />
        <label>
          Tip:
          <select name="type" onChange={(event) => postaviPodatke({...formaPodaci, vrsta: event.target.value})}>
            <option value="pas">Pas</option>
            <option value="mačka">Mačka</option>
            <option value="zec">Zec</option>
            <option value="ptica">Ptica</option>
          </select>
        </label>
        <br />
        <label>
          Godina:
          <input type="number" name="year" required onChange={(event) => postaviPodatke({...formaPodaci, godine: event.target.value})} />
        </label>
        <br />
        <label>
          Udomljen:
          <input type="radio" name="udomljen" value="false" disabled />
        </label>
        <br />
        <label>
          Poruka:
          <textarea name="message" onChange={(event) => postaviPodatke({...formaPodaci, opis: event.target.value})}></textarea>
        </label>
        <br />
        <button type="submit" onClick={dodajZivotinju}>Submit</button>
      </form>
    </div>
  );
}

export default Unos;