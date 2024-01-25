import React, { useEffect, useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { IoHomeSharp } from "react-icons/io5";
import { AutenticarUsuario } from '../../services/usuarioService';
import FormLogin from './login';
import AdminCanciones from './adminCanciones';

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
            //setMessage(error.message);
            let btnConfirmar = document.getElementById(`btnModalError`);
            btnConfirmar?.click();
        }    
    }
    
    return (
    <div className="inicio__container container-fluid d-flex flex-column align-items-center justify-content-center py-2">            
        <h2 className="inicio__titulo w-100 d-flex justify-content-center text-light align-items-center p-4">
            Lucas Podesta Karaoke
            <a href="/administracion" className="btn btn-outline-info m-1 mx-3"><FaUser></FaUser></a>
        </h2>
        <div className="container-fluid w-100 d-flex justify-content-center gap-2 my-2">
            <a href="/inicio" className="btn btn-light m-1 mx-3"><IoHomeSharp></IoHomeSharp></a>
        </div>
        {token==''?<FormLogin data={{}} login={login}></FormLogin>: ''}
        {token!=''?<AdminCanciones></AdminCanciones>: ''}
    </div>
    )
}