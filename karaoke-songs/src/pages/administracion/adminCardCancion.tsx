import "./style.css"
import { useEffect, useState } from "react";
import { Cancion } from "../../interfaces/cancion";
import { CiEdit } from "react-icons/ci";
import { InsertCancion, UpdateCancion } from "../../services/cancionService";
import { useForm } from "react-hook-form";
import { confirmAlert } from 'react-confirm-alert'; // Import

interface CancionProps{
    data?: Cancion;
}

export default function CardCancionAdmin({data}: CancionProps) {
    const [cancion, setCancion] = useState(data);

    useEffect(() => {
        setCancion(data);
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
            solicitante: false
        }

        let response = await UpdateCancion(formData);

        if (response.message){
            alert(response.message)
        }

        if (response.response && response.response.statusCode && response.response.statusCode == 200){
            window.location.reload();
        }
    }

    const deleteSolicitante = () => {
        confirmAlert({
        title: cancion?.nombre,
        message: `¿Desea eliminar a ${cancion?.nombreSolicitante} de la canción?`,
        buttons: [
            {
            label: 'Cancelar',
            className: "btn btn-danger",
            onClick: () => alert('Click No')
            },
            {
            label: 'Confirmar',
            className: "btn btn-primary",
            onClick: () => alert('Click Si')
            }
        ]
        });
      };

    return(
        <div>
            <div className={`card__cancion border border-secondary rounded my-3 text-light d-flex justify-content-between`}>
                <div className="cancion__data">
                    <div className="d-flex gap-2">
                        <label htmlFor="" className="text-secondary">Nombre: </label>
                        <h6>{cancion?.nombre}</h6>
                    </div>
                    <div className="d-flex gap-2">
                        <label htmlFor="" className="text-secondary">Autor: </label>
                        <p className="cancion__autor text-warning">{cancion?.autor}</p>
                    </div>
                    <div className="d-flex gap-2">
                        <label htmlFor="" className="text-secondary">URL: </label>
                        <p className="cancion__autor text-link">{cancion?.url}</p>
                    </div>
                    <div className="d-flex gap-2">
                        <label htmlFor="" className="text-secondary">Cantante: </label>
                        <p className="cancion__autor text-primary">{cancion?.nombreSolicitante}</p>
                    </div>
                </div>
                <div className="d-flex flex-column justify-content-between gap-3">
                    <button className="btn btn-success"><CiEdit></CiEdit></button>
                    {cancion?.nombreSolicitante != ""?                
                        <input type="checkbox" className="cancion__checkbox mb-2"/>
                    :''}
                </div>              
            </div>

            {/* Modal */}
            <div className="modal fade" id={`modal-update-admin-cancion_${cancion?.id}`} aria-labelledby="exampleModalLabel" aria-hidden="true">                
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
                            <button type="button" className="btn btn-outline-danger" data-bs-toggle="modal" data-bs-target={`#modal-update-admin-cancion_${cancion?.id}`}>Cancelar</button>
                            <button type="submit" className="btn btn-outline-primary">Guardar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}