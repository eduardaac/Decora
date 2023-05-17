import React from 'react';
import './style.css';
import { useForm } from "react-hook-form";
import { isEmail } from "validator";

const LoginP = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const onSubmit = (data) => {
        console.log(data);
    };
    console.log("RENDER");

    return (

        <div className="form">

            <div className="formGroup">
                <label>E-mail</label>
                <input
                    className={errors?.email && "input-error"}
                    type="email"
                    placeholder="Insira seu e-mail"
                    {...register("email", {
                        required: true,
                        validate: (value) => isEmail(value),
                    })}
                />
                {errors?.email?.type === "required" && (
                    <p className="error-message">O e-mail é necessário.</p>
                )}

                {errors?.email?.type === "validate" && (
                    <p className="error-message">O e-mail é inválido.</p>
                )}
            </div>

            <div className="formGroup">
                <label>Senha</label>
                <input
                    className={errors?.password && "input-error"}
                    type="password"
                    placeholder="Insira sua senha"
                    {...register("password", { required: true, minLength: 7 })}
                />

                {errors?.password?.type === "required" && (
                    <p className="error-message">A senha é necessária.</p>
                )}

                {errors?.password?.type === "minLength" && (
                    <p className="error-message">
                        A senha precisa ter pelo menos 7 caracteres.
                    </p>
                )}
            </div>

            <div className="formField">
                <input
                    type="checkbox"
                    name="checkbox"
                />
                <label htmlFor="textbox">Lembrar-me</label>
                <a href=' '>Esqueceu sua senha?</a>
            </div>

            <div className="formGroup">
                <button onClick={() => handleSubmit(onSubmit)()}>ENTRAR</button>
            </div>

        </div>

    );
};

export default LoginP;