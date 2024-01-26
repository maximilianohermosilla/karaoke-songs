import "./style.css"
import { IoAdd } from "react-icons/io5";
import { FaRegTrashAlt } from "react-icons/fa";
import { BsListCheck } from "react-icons/bs";
import { FaUserAltSlash } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Cancion } from "../../interfaces/cancion";
import { GetAllCanciones, LimpiarCanciones } from "../../services/cancionService";
import CardCancionAdmin from "./adminCardCancion";
import { confirmAlert } from 'react-confirm-alert';
import FormCancion from "./formCancion";


export default function AdminCanciones(){
    const [canciones, setCanciones] = useState<Cancion[]>();

    useEffect(() => {        
        fetchCanciones();        
    },[])

    const fetchCanciones = async () => {
        let vCanciones = await GetAllCanciones();
        setCanciones(vCanciones);
    }

    const selectAll = () => {
        const checkCanciones  = document.querySelectorAll(".cancion__checkbox");
        checkCanciones.forEach((element: any) => {
            element.checked = true;
        });
    }

    const cleanSolicitantes = async () => {
        let ids: string[] = [];
        const checkCanciones  = document.querySelectorAll(".cancion__checkbox");
        checkCanciones.forEach((element: any) => {
            if(element.checked == true){
                ids.push(element.id);
            }            
        });
        let result = await LimpiarCanciones(ids);
        console.log(ids);
    }

    const openModal = () => {
        confirmAlert({
            customUI: ({ onClose }) => {
              return (
                <div className="react-confirm-alert-body">
                    <FormCancion></FormCancion>
                </div>
              );
            }
          });
    }


    const renderCanciones = () => canciones?.map((v,i) => <CardCancionAdmin key={i} data={v}></CardCancionAdmin>)

    return(
        <div className="container-fluid">
            <div className="container-fluid p-0 d-flex justify-content-between gap-2 my-2 admin__header">
                <div>
                    <button className="btn btn-success" onClick={openModal}><IoAdd></IoAdd> Agregar</button>
                </div>
                <div className="d-flex flex-column gap-2">
                    <button className="btn btn-danger" onClick={cleanSolicitantes}><FaUserAltSlash></FaUserAltSlash> Limpiar</button>
                    <button className="btn btn-primary" onClick={selectAll}><BsListCheck></BsListCheck> Todos</button>
                </div>
            </div>
            <section className="canciones__container p-0 container-fluid">
                {renderCanciones()}
            </section>
        </div>
    )
}