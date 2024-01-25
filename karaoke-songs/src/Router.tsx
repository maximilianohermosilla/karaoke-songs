import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import { InicioRoute, AdministracionRoute } from "./routes";

export default function Router(){  
    return (
        <BrowserRouter>           
            <Routes>
                <Route index element={<InicioRoute></InicioRoute>}></Route>
                <Route path="/" element={<InicioRoute></InicioRoute>}></Route>                
                <Route path="/inicio" element={<InicioRoute></InicioRoute>}></Route>
                <Route path="/administracion" element={<AdministracionRoute></AdministracionRoute>}></Route>
            </Routes>
        </BrowserRouter>
    )
}