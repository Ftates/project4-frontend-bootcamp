import "./App.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";

function App(props) {

  // const handleChildEvent = (event) => {
  //   event();
  // };
  const headerRef = useRef()
  const location = useLocation();

  useEffect(() => {
    const header = headerRef.current;
    header.className = "App fade-in";

    return (() => {
      header.className = "App"
    })
  }, [location]);

  const navigate = new useNavigate()

  return (
    <div ref={headerRef} className="App">
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
