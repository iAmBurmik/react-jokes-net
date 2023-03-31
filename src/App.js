import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import AddJoke from "./pages/AddJoke";
import JokeDetails from "./pages/JokeDetails";
import Jokes from "./pages/Jokes";
import NoJokesFound from "./components/jokes/NoJokesFound";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/jokes"/>} exact/>
          <Route path="/jokes" element={<Jokes/>} exact/>
          <Route path="/jokes/:jokeId/*" element={<JokeDetails/>}/>
          <Route path="/add-joke" element={<AddJoke/>}/>
          <Route path="*" element={<NoJokesFound/>} />
        </Routes>
      </Layout>
    </BrowserRouter>);
}

export default App;
