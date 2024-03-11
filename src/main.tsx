import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import { Toaster } from 'react-hot-toast';


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <BrowserRouter>
    <App />
    <Toaster position="top-right"/>
    </BrowserRouter>
)
