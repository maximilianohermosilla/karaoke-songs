import "./style.css"
import { useEffect, useState } from 'react'
import { Cancion } from '../../interfaces/cancion'
import { GetAllCanciones } from '../../services/cancionService';
import CardCancion from "./cardCancion";
import { TbRefresh } from "react-icons/tb";
import { FaUser } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";


export default function Inicio() {
    const [canciones, setCanciones] = useState<Cancion[]>();
    const [token, setToken] = useState('');

    useEffect(() => {        
        fetchCanciones();
        getTokenLocalStorage();
    },[])

    const fetchCanciones = async () => {
        let vCanciones = await GetAllCanciones();
        setCanciones(vCanciones);
    }
    
    const getTokenLocalStorage = () => {
        let token = localStorage.getItem("token")? JSON.parse(localStorage.getItem("token")!): undefined;
        if (token){
            setToken(token);
        }
    }
    const renderCanciones = () => canciones?.map((v,i) => <CardCancion key={i} data={v}></CardCancion>)

    return (
    <div className="inicio__container container-fluid d-flex flex-column align-items-center justify-content-center py-2">
        <h2 className="inicio__titulo w-100 d-flex justify-content-center text-light align-items-center p-4">
            Lucas Podesta Karaoke
            <a href="/administracion" className="btn btn-outline-info m-1 mx-3"><FaUser></FaUser></a>
        </h2>
        <div className="container-fluid w-100 d-flex justify-content-center gap-2 my-2">
            <button className="btn btn-outline-warning" onClick={() => window.location.reload()}><TbRefresh></TbRefresh></button>
        </div>
        <section className="canciones__container container-fluid w-100 p-2">
            {renderCanciones()}
        </section>
    </div>
    )
}