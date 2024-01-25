import "./style.css"
import { useForm } from "react-hook-form";
import { User } from "../../interfaces/user";

interface UsuarioProps{
    data?: User,
    login: any
}

export default function FormLogin({data, login}: UsuarioProps) {

    const { register, formState: {errors}, watch, handleSubmit, setValue } = useForm({
        defaultValues: {
            login: data?.login || '',
            password: data?.password || ''
        }
    });

    const ingresar = async (formData: any) => {
        formData = {
            ...formData,            
            passwordNew: "",            
            idSistema: 4
        }

        let result = await login(formData);
        console.log(result)
    }

    return (
        <div className="container login__container pt-5 h-100" style={{}}>
            <div className="w-100 border border-secondary rounded-4 bg-dark">
                <div>
                    <h1 className="title text-info px-3 py-3 mb-0 text-center">Login</h1>
                    <h3 className="title text-warning p-3 text-center">Iniciar sesión</h3>                    
                </div>   

                <div className="container text-light">
                    <form onSubmit={handleSubmit(ingresar)}>
                        <div className="container my-3">
                            <label className="text-left">Usuario</label>   
                            <input type="login" placeholder="Usuario" className="form-control rounded-0" 
                            {...register("login", {required: true})} id="login"/>
                            {errors.login?.type === 'required' && <span className="text-danger"> El campo email es requerido</span>}
                        </div>
                        <div className="container my-3">
                            <label className="text-left">Contraseña</label>   
                            <input type="password" placeholder="Contraseña" className="form-control rounded-0"
                            {...register("password", {required: true})} id="password"/>    
                            {errors.password?.type === 'required' && <span className="text-danger"> El campo contraseña es requerido</span>}
                        </div>
                        <div className="container text-light w-100 d-flex align-items-center justify-content-center my-5 p-1">
                            <button type="submit" className="btn btn-success" id="btnLoginSubmit">Ingresar</button>    
                        </div>                         
                    </form>
                </div> 
            </div>
        </div>
    );
}