import { useState, useEffect } from "react";
import axios from "axios";
import { Button, Card } from "react-bootstrap";



function Informacije(props){
    const [formaPodaci, postaviPodatke] = useState({
        naslov: "",
        datum: new Date().toLocaleDateString(),
        tekst: "",
        vazno: false,
      });
      const [obavijesti, setObavijesti] = useState([]);
      const [odabraniId, birajId] = useState(0);
      const [showForm, setShowForm] = useState(false);



      useEffect(() => {
        axios.get("http://localhost:3001/obavijesti").then((response) => {
          setObavijesti(response.data);
        }).then(obavijesti.sort((a, b) => new Date(b.datum.split('/').reverse().join('/')) - new Date(a.datum.split('/').reverse().join('/')))
        );
      }, []);

    
  const handleSubmit = (event) => {
    event.preventDefault();
    postaviPodatke(formaPodaci);
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3001/obavijesti/${id}`).then((response) => {
      setObavijesti(obavijesti.filter((obavijest) => obavijest.id !== id));
    });
  };

  function brisi(id){
    birajId(id);
    handleDelete(id)

    }
  
    function dodajObavijest(){
    axios.post('http://localhost:3001/obavijesti', formaPodaci).then(
  axios.get("http://localhost:3001/obavijesti").then((response) => {
    setObavijesti(response.data);}))
    setShowForm(false)
  }

  if (props.admin === "User") {
    return(
    <div>
    {obavijesti.sort((a, b) => new Date(b.datum.split('/').reverse().join('/')) - new Date(a.datum.split('/').reverse().join('/'))).map((obavijest) => (
      <Card key={obavijest.id}  style={{margin:30}}>
        <Card.Body>
          <Card.Title style={obavijest.vazno ? {color:"#fe0000"}:{color:"#288734"}}>{obavijest.naslov}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{obavijest.datum}</Card.Subtitle>
          <Card.Text>{obavijest.tekst}</Card.Text>
        </Card.Body>
      </Card>
    ))}
  </div>)
  }
  
  return (
<div>
    
    <div style={{margin:50}}>

        {
            showForm ? (
                
      <form onSubmit={handleSubmit}>
      <label>
        Naslov:
        <input type="text" name="naslov" required onChange={(event) => postaviPodatke({...formaPodaci, naslov: event.target.value})} />
      </label>
      <br />
      <label>
        Tekst:
        <input type="text" name="tekst" required onChange={(event) => postaviPodatke({...formaPodaci, tekst: event.target.value})} />
      </label>
      <br />
      <div style={{marginLeft:10}}>
          Važno:<label style={{marginRight:20}}>
        <input type="checkbox" name="važno" checked={formaPodaci.vazno}
onChange={(event) => postaviPodatke({...formaPodaci, vazno: event.target.checked})
}/>
      </label>
      <button type="submit" onClick={dodajObavijest}>Spremi</button>

      </div>
  
    </form>
            ) : (
                <Button style={{margin:10, backgroundColor:"#999999", borderColor:"#999999"}} onClick={()=>setShowForm(true)}>Nova obavijest</Button>

            )
        }

<h4 style={{margin:10}}>Obavijesti:</h4>
      <div>
    {obavijesti.sort((a, b) => new Date(b.datum.split('/').reverse().join('/')) - new Date(a.datum.split('/').reverse().join('/'))).map((obavijest) => (
      <Card key={obavijest.id}  style={{margin:10}}>
      <Card.Body>
        <Card.Title style={obavijest.vazno ? {color:"#fe0000"}:{color:"#288734"}}>{obavijest.naslov}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{obavijest.datum}</Card.Subtitle>
        <Card.Text>{obavijest.tekst}</Card.Text>
        <Button style={{backgroundColor:"#979797", borderColor:"#999999", fontSize:12, fontWeight:"bold"}} onClick={() => brisi(obavijest.id)}>
  Delete
</Button>
      </Card.Body>
      
    </Card>
    ))}
  </div>
    </div>
    </div>);
}

export default Informacije;