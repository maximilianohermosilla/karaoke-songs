import { useEffect, useState } from "react";
import { Cancion } from "../../interfaces/cancion"
import { useForm } from "react-hook-form";
import { InsertCancion, UpdateCancion } from "../../services/cancionService";
import { confirmAlert } from "react-confirm-alert";

interface FormCancionProps{
    data?: Cancion;
}

export default function FormCancion({data}: FormCancionProps){
    const [cancion, setCancion] = useState<Cancion>();

    useEffect(() => {
        setCancion(data);
    },[])

    const { register, formState: {errors}, watch, handleSubmit } = useForm({
        defaultValues: {
            Nombre: data?.nombre || "",
            Autor: data?.autor || "",
            Url: data?.url || "",
            NombreSolicitante: data?.nombreSolicitante || '',
            Habilitado: data?.habilitado || false
        }
    });
    
    const insertOrUpdateCancion = async (formData: any) => {
        formData = {
            ...formData,
            id: cancion?.id,
            solicitante: false
        }

        let response: any;

        if(cancion?.id && cancion?.id > 0){
            console.log("update")
            response = await UpdateCancion(formData);
        }
        else{
            console.log("insert")
            response = await InsertCancion(formData);
        }

        console.log(response);
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
            //window.location.reload();
        }
    }
    
    return(
        <form className="container-fluid form__cancion__container" onSubmit={handleSubmit(insertOrUpdateCancion)}>
            <div className="form__cancion__header">
                <h5>{data? 'Editar Canción': 'Nueva Canción'}</h5>
            </div>
            <div className="form__cancion">
                <div className="mb-3">
                    <label className="form-check-label mx-2" htmlFor="Nombre">
                        Nombre
                    </label>
                    <input className="form-control" type="text" {...register("Nombre", { required: true,  maxLength: { value: 25, message: "Longitud máxima de 25 carácteres" } })}/>
                                    {errors.Nombre?.type === "required" && (<p className="text-danger m-0"> El campo nombre es requerido</p>)}
                                    {errors.Nombre?.type === "maxLength" && (<p className="text-danger m-0">{errors.Nombre?.message}</p>)}
                </div>
                <div className="mb-3">
                    <label className="form-check-label mx-2" htmlFor="Autor">
                    Autor
                    </label>
                    <input className="form-control" type="text" {...register("Autor", { required: false,  maxLength: { value: 25, message: "Longitud máxima de 25 carácteres" } })}/>
                                    {errors.Autor?.type === "maxLength" && (<p className="text-danger m-0">{errors.Autor?.message}</p>)}
                </div>
                <div className="mb-3">
                    <label className="form-check-label mx-2" htmlFor="Url">
                        Url
                    </label>
                    <input className="form-control" type="text" {...register("Url", { required: false })} />
                </div>
                <div className="mb-3">
                    <label className="form-check-label mx-2" htmlFor="NombreSolicitante">
                        Nombre Solicitante
                    </label>
                    <input className="form-control" type="text" {...register("NombreSolicitante", { required: false,  maxLength: { value: 25, message: "Longitud máxima de 25 carácteres" } })}/>
                                    {errors.NombreSolicitante?.type === "maxLength" && (<p className="text-danger m-0">{errors.NombreSolicitante?.message}</p>)}
                </div>
                <div className="mb-3">
                    <label className="form-check-label mx-2" htmlFor="Habilitado">
                        Habilitado
                    </label>
                    <input className="form-check-input" type="checkbox" {...register("Habilitado", { required: false })} />
                </div>                
            </div>
            <div className="form__cancion__footer d-flex justify-content-end gap-2">
                <button type="button" className="btn btn-outline-danger" onClick={() => window.location.reload() }>Cancelar</button>
                <button type="submit" className="btn btn-outline-primary">Guardar</button>
            </div>
        </form>
    )
}