import '../styles/reset.css'
import App from './App.tsx'
import { createRoot } from 'react-dom/client'
import {AuthProvider} from "../shared";

createRoot(document.getElementById('root')!).render(
    <AuthProvider>
        <App />
    </AuthProvider>
)
