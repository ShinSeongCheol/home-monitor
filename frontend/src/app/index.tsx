import '../styles/reset.css'
import {createRoot} from 'react-dom/client'
import {AuthProvider} from "../shared";
import {AppRouter} from "./providers/router";
import {AllCommunityModule, ModuleRegistry} from "ag-grid-community";

ModuleRegistry.registerModules([AllCommunityModule]);

createRoot(document.getElementById('root')!).render(
        <AuthProvider>
            <AppRouter/>
        </AuthProvider>
)
