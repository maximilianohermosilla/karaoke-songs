import { enviroment } from "../interfaces/enviroment";
import { User } from "../interfaces/user";

const BASE_URL: string = enviroment.urlBase() + "Login";
const ENV_DEMO: boolean = enviroment.demo();

export const AutenticarUsuario = async (data: User): Promise<any> => {
    if (ENV_DEMO){
        return 'tokenDemo';
    }
    const url = `${BASE_URL}`;
    let result;

        const response = await fetch(url, {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
                //"Authorization": `Bearer ${JwtToken}`
            },
            body: JSON.stringify(data) 
        })
        
        if (!response.ok){
            let errorResponse = await response.text();            
            throw new Error(errorResponse);        
            //return errorResponse;
        }

        if(response.ok){
            return await response.text();
        }        

}