import './App.css';
import { BrowserRouter } from 'react-router-dom';
import LangRouter from './components/LangRouter';

function App() {
    return (
        <BrowserRouter>
            <LangRouter />
        </BrowserRouter>
    );
}

export default App;