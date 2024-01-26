import "./style.css"
import { IoAdd } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";
import { BsListCheck } from "react-icons/bs";
import { FaUserAltSlash } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Cancion } from "../../interfaces/cancion";
import { GetAllCanciones } from "../../services/cancionService";
import CardCancionAdmin from "./adminCardCancion";



export default function AdminCanciones(){
    const [canciones, setCanciones] = useState<Cancion[]>();

    useEffect(() => {        
        fetchCanciones();        
    },[])

    const fetchCanciones = async () => {
        let vCanciones = await GetAllCanciones();
        setCanciones(vCanciones);
    }

    const renderCanciones = () => canciones?.map((v,i) => <CardCancionAdmin key={i} data={v}></CardCancionAdmin>)

    return(
        <div className="container-fluid">
            <div className="container-fluid d-flex justify-content-between gap-2 my-2 admin__header">
                <div>
                    <button className="btn btn-success" onClick={() => window.location.reload()}><IoAdd></IoAdd> Agregar</button>
                </div>
                <div className="d-flex flex-column gap-2">
                    <button className="btn btn-danger" onClick={() => window.location.reload()}><FaUserAltSlash></FaUserAltSlash> Limpiar</button>
                    <button className="btn btn-primary" onClick={() => window.location.reload()}><BsListCheck></BsListCheck> Todos</button>
                </div>
            </div>
            <section className="canciones__container container-fluid">
                {renderCanciones()}
            </section>
        </div>
    )
}