import { Cancion } from "../interfaces/cancion";
import { enviroment } from "../interfaces/enviroment";
import { MockCanciones } from "../mocks/canciones";

const BASE_URL: string = enviroment.urlBase() + "Cancion";
const ENV_DEMO: boolean = enviroment.demo();

export const GetAllCanciones = async (): Promise<Cancion[]> => {
    if (ENV_DEMO){
        return MockCanciones;
    }
    const url = `${BASE_URL}`;
    try {
        const response = await fetch(url);
        if (!response.ok){
            throw new Error(response.statusText);
        }
        const data: Cancion[] = await response.json();
        return data;        
    } catch (error) {
        return [];
    }
}

export const InsertCancion= async (data: any): Promise<any> => {
    if (ENV_DEMO){
        return 0;
    }
    const url = `${BASE_URL}`;
    //const JwtToken = localStorage.getItem("token")?.replace(/['"]+/g, '');
    let result;
    try {
        const response = await fetch(url, {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
                //"Authorization": `Bearer ${JwtToken}`
            },
            body: JSON.stringify(data) 
        })
        
        if (!response.ok){
            throw new Error(response.statusText);        
        }
        
        result = await response.json();
        if(response.ok && response.status == 201){
            return result;
        }        
    } catch (error) {
        return undefined;
    }
}

export const UpdateCancion = async (data: any): Promise<any> => {
    console.log(data)
    if (ENV_DEMO){
        return 0;
    }
    const url = `${BASE_URL}`;    
    //const JwtToken = localStorage.getItem("token")?.replace(/['"]+/g, '');
    let result;
    try {
        const response = await fetch(url, {
            method: "PUT",
            headers:{
                "Content-Type": "application/json",
                //"Authorization": `Bearer ${JwtToken}`
            },
            body: JSON.stringify(data) 
        })
               
        if (!response.ok){
            throw new Error(response.statusText);
        }
        result = await response.json();
        if(response.ok && response.status == 200){
            return result;
        }        
    } catch (error) {
        return undefined;
    }
}

export const DeleteCancion = async (CancionId: number): Promise<any> => {
    if (ENV_DEMO){
        return 0;
    }
    const url = `${BASE_URL}/${CancionId}`;    
    //const JwtToken = localStorage.getItem("token")?.replace(/['"]+/g, '');
    let result;
    try {
        const response = await fetch(url, {
            method: "DELETE",
            headers:{
                "Content-Type": "application/json",
                //"Authorization": `Bearer ${JwtToken}`
            },
            body: JSON.stringify(CancionId) 
        })
        
        if (!response.ok){
            throw new Error(response.statusText);        
        }   
        
        if(response.ok && response.status == 201){
            return response;
        }     
    } catch (error) {
        return undefined;
    }    
}