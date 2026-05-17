import './App.css'
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Main from "./components/Main.jsx";
import DreamTeam from "./components/DreamTeam.jsx";
import Hero from "./components/Hero.jsx";
import Paragraph from "./components/Paragraph.jsx";


function App() {

    return (
        <div className={'container-fluid'}>
            <Header/>
            <Hero/>
            <DreamTeam/>
            <Paragraph/>
            <Main/>
            <Footer/>
        </div>
    )
}

export default App
