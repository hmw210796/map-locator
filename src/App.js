import "./App.css";
import Maps from "./components/Maps";
import Search from "./components/Search";

function App() {
  return (
    <div className="App">
      <div className="map">
        <Maps />
      </div>
      <Search />
    </div>
  );
}

export default App;
