import React from "react";
import {BrowserRouter as Router, Route, Routes,Link,Outlet, Switch} from "react-router-dom";


// COMPONENTES PARA LAS RUTAS   

const Home = () => <div className="p-4">Pagina inicio React</div>
const About = () => <div className="p-4">Pagina about React</div>
const Contact = () => <div className="p-4">Pagina contact React</div>


// LAAYOUT PARA LAS RUTAS

const layout = () => {
    return (
        <div className="container mx-auto">
            <nav className="p-4 bg-gray-200">
                <ul className="flex justify-between">
                    <li>
                        <Link to="/app/">Home</Link>
                    </li>
                    <li>
                        <Link to="/app/about">About</Link>
                    </li>
                    <li>
                        <Link to="/app/contact">Contact</Link>
                    </li>
                </ul>
            </nav>
            //OUTLET PARA MOSTRAR EL CONTENIDO DE LAS RUTAS
            <Outlet />
        </div>
    )
}

//COMPONENTE PRINCIPAL QUE CONTIENE LAS RUTAS

export default function App({ basePath ="/app"}) {
    return (
        <Router>
            <Routes>
                <Route element={layout}>
                    <Route index element={<Home />} />
                    <Route path="about" element={<About />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="*" element={<div>Not Found</div>} />
                </Route>
            </Routes>
        </Router>
    )
}