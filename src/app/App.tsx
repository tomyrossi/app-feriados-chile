import { useFeriados } from "../hooks/useFeriados";
import "./App.css";

function App() {
  const { feriados, error } = useFeriados(2020);

  return (
    <div className="App">
      <div className="App-title">
        <h1>Feriados del gobierno de Chile</h1>
        <h2>desde el año 2020 en adelante</h2>
      </div>
      {error ? (
        <div>Error: {error}</div>
      ) : (
        <div className="App-body">
          <label>Json response: </label>
          <div className="Json-view">
            <pre>{JSON.stringify(feriados, null, 2)}</pre>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
