import "./style.css"
import { IoAdd } from "react-icons/io5";


export default function AdminCanciones(){

    return(
        <div>
            <div className="container-fluid w-100 d-flex justify-content-center gap-2 my-2">
            <button className="btn btn-success" onClick={() => window.location.reload()}><IoAdd></IoAdd> Agregar</button>
            </div>
        </div>
    )
}