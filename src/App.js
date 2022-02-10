import MainPage from "./components/MainPage";
import TextBook from "./components/allPages/TextBook";
import About from "./components/allPages/About";
import AudioGame from "./components/allPages/AudioGame";
import SprintGame from "./components/allPages/SprintGame";
import Statistics from "./components/allPages/Statistics";
import Layout from "./components/Layout/Layout";
import { Routes, Route } from "react-router-dom";
import "./styles/App.css";

export default function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout />}>
        <Route index element={<MainPage />}></Route>
        <Route path='/textbook' element={<TextBook />}></Route>
        <Route path='/sprintgame' element={<SprintGame />}></Route>
        <Route path='/audiogame' element={<AudioGame />}></Route>
        <Route path='/statistics' element={<Statistics />}></Route>
        <Route path='/about' element={<About />}></Route>
      </Route>
    </Routes>
  );
}
