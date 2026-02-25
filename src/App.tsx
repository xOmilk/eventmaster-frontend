import { Toaster } from 'react-hot-toast';
import '../src/css/App.css';
import { AppRouter } from './routes/AppRouter';

function App() {
    return (
        <>
            <Toaster position="bottom-right" />
            <AppRouter />
        </>
    );
}

export default App;
