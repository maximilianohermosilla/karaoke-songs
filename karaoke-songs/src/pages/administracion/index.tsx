import React, { useEffect, useState } from 'react'
import { ImExit } from "react-icons/im";
import { IoHomeSharp } from "react-icons/io5";
import { AutenticarUsuario } from '../../services/usuarioService';
import FormLogin from './login';
import AdminCanciones from './adminCanciones';
import { confirmAlert } from 'react-confirm-alert';

export default function Administracion() {
    const [token, setToken] = useState('');

    useEffect(() => {
        getTokenLocalStorage();
    }, [])
    
    const getTokenLocalStorage = () => {
        let token = localStorage.getItem("token")? JSON.parse(localStorage.getItem("token")!): undefined;
        if (token){
            setToken(token);
        }
    }
            
    const login = async (formData: any) => {
        let result = '';
        try {
            result = await AutenticarUsuario(formData);    
            if (result){
                //console.log(result);
                localStorage.setItem("token", JSON.stringify(result?.replace(/['"]+/g, '')));
                setToken(result);
            }        
        } catch (error: any) {
            console.log(error.message);
            let response = JSON.parse(error.message);
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
    }
    
    const logOut = () => {
        localStorage.removeItem("token");
        window.location.reload();
    }
    
    return (
    <div className="inicio__container container-fluid d-flex flex-column align-items-center justify-content-center py-2">            
        <h2 className="inicio__titulo w-100 d-flex justify-content-center text-light align-items-center p-4">
            Lucas Podesta Karaoke
            {token != ""?<button className="btn btn-outline-danger m-1 mx-3" onClick={logOut}><ImExit></ImExit></button>:''}
        </h2>
        <div className="container-fluid w-100 d-flex justify-content-center gap-2 my-2">
            <a href="/inicio" className="btn btn-light m-1 mx-3"><IoHomeSharp></IoHomeSharp></a>
        </div>
        {token==''?<FormLogin data={{}} login={login}></FormLogin>: ''}
        {token!=''?<AdminCanciones></AdminCanciones>: ''}
    </div>
    )
}