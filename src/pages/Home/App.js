import "./App.css";
import { useNavigate } from "react-router-dom";

function App(props) {

  // const handleChildEvent = (event) => {
  //   event();
  // };

  const navigate = new useNavigate()

  return (
    <div className="App">
      <header className="App-header">
        <h1>KoinFu</h1>
        <p>
          Your path towards financial transcendence.
        </p>
        <button
          style={{textDecoration:"none", border:"none", background:"none", color:"white"}}
          onClick={()=>{props.onChildEvent("toLearnMoreView"); navigate("/learnMore")}}
        >
          Learn More
        </button>
      </header>
    </div>
  );
}

export default App;
