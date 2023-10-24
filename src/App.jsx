import './App.css';
import Entrance from './components/entrance/Entrance';
import Footer from './components/footer/Footer';
import Header from './components/header/Header';
import ProjectList from './components/project-list/ProjectList';

function App() {
  return (
    <div className="main">
        <Header />
        <Entrance />
        <ProjectList />
        <Footer />
    </div>
  );
}

export default App;