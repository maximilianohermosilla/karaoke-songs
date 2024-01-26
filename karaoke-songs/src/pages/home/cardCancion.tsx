import "./style.css"
import { useEffect, useState } from "react";
import { Cancion } from "../../interfaces/cancion";
import { FaUserCheck } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { InsertCancion, LimpiarCanciones, UpdateCancion } from "../../services/cancionService";
import { useForm } from "react-hook-form";
import { confirmAlert } from 'react-confirm-alert';

interface CancionProps{
    data?: Cancion;
}

export default function CardCancion({data}: CancionProps) {
    const [cancion, setCancion] = useState(data);
    const [token, setToken] = useState('');

    useEffect(() => {
        setCancion(data);
        getTokenLocalStorage();
    },[])

    const { register, formState: {errors}, watch, handleSubmit } = useForm({
        defaultValues: {
            NombreSolicitante: '',
        }
    });

    const updateCancion = async (formData: any) => {
        formData = {
            ...formData,
            id: cancion?.id,
            nombre: cancion?.nombre,
            autor: cancion?.autor,
            url: cancion?.url,            
            habilitado: cancion?.habilitado,
            solicitante: token == ""
        }

        let response = await UpdateCancion(formData);

        if (response.message){
            confirmAlert({            
                message: response.message,
                buttons: [{
                    label: 'Aceptar',
                    className: "btn btn-outline-primary",
                    onClick: () => window.location.reload()
                    }],
                willUnmount: () => {window.location.reload()}
            });
        }

        if (response.response && response.response.statusCode && response.response.statusCode == 200){
            window.location.reload();
        }
    }
    
    const getTokenLocalStorage = () => {
        let token = localStorage.getItem("token")? JSON.parse(localStorage.getItem("token")!): undefined;
        if (token){
            setToken(token);
        }
    }

    const deleteSolicitante = () => {
        if(token != ""){
            confirmAlert({
            title: cancion?.nombre,
            message: `¿Desea eliminar a ${cancion?.nombreSolicitante} de la canción?`,
            buttons: [
                {
                label: 'Cancelar',
                className: "btn btn-outline-danger",
                },
                {
                label: 'Confirmar',
                className: "btn btn-outline-primary",
                onClick: () => cleanSolicitante()
                }
            ]
            });
        }
    };
    
    const cleanSolicitante = async () => {
        let ids: string[] = [];    
        ids.push(cancion?.id?.toString() || "");
        console.log(ids)
        let result = await LimpiarCanciones(ids);
        console.log(result);
        confirmAlert({            
            message: result.message,
            buttons: [{
                label: 'Aceptar',
                className: "btn btn-outline-primary",
                onClick: () => window.location.reload()
                }],
            willUnmount: () => {window.location.reload()}
        });
    }

    return(
        <div>
            <div className={`card__cancion w-100 border border-secondary rounded my-3 text-light d-flex justify-content-between ${cancion?.nombreSolicitante != ""?'cancion__selected':''}`}>
                <div className={`${cancion?.nombreSolicitante != ""?'d-flex card__nombre__solicitante':'d-none'}`} onClick={deleteSolicitante}>
                    <span>{cancion?.nombreSolicitante}</span>
                </div>
                <div>
                    <h6>{cancion?.nombre}</h6>
                    <p className="cancion__autor text-warning">{cancion?.autor}</p>
                </div>
                <div className="cancion__container__button h-50">
                    {cancion?.url != "" && token != ""?
                        <button className="btn btn-danger rounded-0" onClick={() => window.open(`${cancion?.url}`,'name','width=600,height=400')}><FaYoutube></FaYoutube></button>                
                    :''}
                    {cancion?.nombreSolicitante == ""?                
                        <button type="button" className="btn btn-outline-info h-50" data-bs-toggle="modal" data-bs-target={`#modal-update-cancion_${cancion?.id}`}
                            disabled={cancion?.nombreSolicitante != ""}><FaUserCheck></FaUserCheck></button>                
                    :''}
                </div>              
            </div>

            {/* Modal */}
            <div className="modal fade" id={`modal-update-cancion_${cancion?.id}`} aria-labelledby="exampleModalLabel" aria-hidden="true">                
                <div className="modal-dialog modal-lg modal-dialog-centered modal__cancion">
                    <form className="modal-content" onSubmit={handleSubmit(updateCancion)}>  
                        <div className="modal-header">
                            <h5 className="modal-title text-light" id="exampleModalLabel">{cancion?.nombre}</h5>
                            <button type="button" className="btn-close bg-light" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>                                  
                        <div className="modal-body d-flex w-100 justify-content-center gap-3 py-5">
                            <label className="text-light" htmlFor="nombre-solcitante">Nombre: </label>
                            <div>
                                <input type="text" {...register("NombreSolicitante", { required: true,  maxLength: { value: 25, message: "Longitud máxima de 25 carácteres" } })} 
                                    placeholder="* Nombre"/>
                                {errors.NombreSolicitante?.type === "required" && (<p className="text-danger m-0"> El campo nombre es requerido</p>)}
                                {errors.NombreSolicitante?.type === "maxLength" && (<p className="text-danger m-0">{errors.NombreSolicitante?.message}</p>)}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target={`#modal-update-cancion_${cancion?.id}`}>Cancelar</button>
                            <button type="submit" className="btn btn-outline-primary">Guardar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
