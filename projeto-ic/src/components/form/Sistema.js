import React from 'react';
import './style.css';
import { useForm } from "react-hook-form";

const SistemaAluno = () => {
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
                <label>Qual o domínio do sofware?</label>
                <select
                    className={errors?.domain && "input-error"}
                    defaultValue="0"
                    {...register("domain", { validate: (value) => value !== "0" })}                >
                    <option value="0">Selecione opção...</option>
                    <option value="business">Négocio</option>
                    <option value="academic">Acadêmico</option>
                    <option value="hospital">Hospital</option>
                    <option value="real-time-game">Jogo em tempo real</option>
                    <option value="web-conference-stream">Webconferência/Stream(áudio-vídeo)</option>
                    <option value="outher">Outro</option>
                </select>
                {errors?.domain?.type === "validate" && (
                    <p className="error-message">Campo obrigatório.</p>
                )}
            </div>
            <div className="formGroup">
                <label>Este sofware tem características de uma aplicação distribuída?</label>
                <select
                    className={errors?.application && "input-error"}
                    defaultValue="0"
                    {...register("application", { validate: (value) => value !== "0" })}>
                    <option value="0">Selecione opção...</option>
                    <option value="yes">Sim</option>
                    <option value="no">Não</option>
                    <option value="dont-know">Não sei</option>
                </select>
                {errors?.application?.type === "validate" && (
                    <p className="error-message">Campo obrigatório.</p>
                )}
            </div>

            <div className="formGroup">
                <label>O número de usuários aos quais o sofware deve atender é um
                    número conhecido ou o sistems prevê resiliência e escalabilidade, isto é,
                    capacidade de modificação na quantidde de recursos providos a partir de demanda
                    variante ?</label>
                <select
                    className={errors?.numberUser && "input-error"}
                    defaultValue="0"
                    {...register("numberUser", { validate: (value) => value !== "0" })}>
                    <option value="0">Selecione opção...</option>
                    <option value="yes">Sim</option>
                    <option value="no">Não</option>
                    <option value="dont-know">Não sei</option>
                </select>
                {errors?.numberUser?.type === "validate" && (
                    <p className="error-message">Campo obrigatório.</p>
                )}
            </div>

            <div className="formGroup">
                <label>A equipe que desenvolverá o sofware
                    já possui expertise em alguma tecnologia?</label>
                <select
                    className={errors?.technologicalExp && "input-error"}
                    defaultValue="0"
                    {...register("technologicalExp", { validate: (value) => value !== "0" })}>
                    <option value="0">Selecione opção...</option>
                    <option value="php">PHP</option>
                    <option value="c">C</option>
                    <option value="java">Java</option>
                    <option value="python">Python</option>
                    <option value="react-native">React Native</option>
                    <option value="none">Nenhum</option>
                </select>
                {errors?.technologicalExp?.type === "validate" && (
                    <p className="error-message">Campo obrigatório.</p>
                )}
            </div>

            <div className="formGroup">
                <label>A equipe que desenvolverá o sofware
                    já possui expertise em que tipo de banco de dados?</label>
                <select
                    className={errors?.dataBaseExp && "input-error"}
                    defaultValue="0"
                    {...register("dataBaseExp", { validate: (value) => value !== "0" })}>
                    <option value="0">Selecione opção...</option>
                    <option value="sql">SQL</option>
                    <option value="nosql">NoSQL</option>
                    <option value="bother">Ambos</option>
                </select>
                {errors?.dataBaseExp?.type === "validate" && (
                    <p className="error-message">Campo obrigatório.</p>
                )}
            </div>

            <div className="formGroup">
                <label>O sofware deve realizar interação(ões) com outro(s) sofware?</label>
                <select
                    className={errors?.interactionsUsers && "input-error"}
                    defaultValue="0"
                    {...register("interactionsUsers", { validate: (value) => value !== "0" })}>
                    <option value="0">Selecione opção...</option>
                    <option value="yes">Sim</option>
                    <option value="no">Não</option>
                    <option value="dont-know">Não sei</option>
                </select>
                {errors?.interactionsUsers?.type === "validate" && (
                    <p className="error-message">Campo obrigatório.</p>
                )}
            </div>

            <div className="formGroup">
                <label>No que tange aos dados que serão transmitidos para outro
                    sofware: os tipos de dados seguem regras estritas de tipagem
                    e validação? </label>
                <select
                    className={errors?.transmission && "input-error"}
                    defaultValue="0"
                    {...register("transmission", { validate: (value) => value !== "0" })}>
                    <option value="0">Selecione opção...</option>
                    <option value="yes">Sim</option>
                    <option value="no">Não</option>
                    <option value="dont-know">Não sei</option>
                </select>
                {errors?.transmission?.type === "validate" && (
                    <p className="error-message">Campo obrigatório.</p>
                )}
            </div>

            <div className="formGroup">
                <label>Com relação à disponibilidade, caso haja indisponibilidade
                    temporáaria do sofware, os usuários podem correr risco,serem feridos
                    ou terem perdas financeiras ou de outra natureza?
                </label>
                <select
                    className={errors?.availability && "input-error"}
                    defaultValue="0"
                    {...register("availability", { validate: (value) => value !== "0" })}>
                    <option value="0">Selecione opção...</option>
                    <option value="yes">Sim</option>
                    <option value="no">Não</option>
                    <option value="dont-know">Não sei</option>
                </select>
                {errors?.availability?.type === "validate" && (
                    <p className="error-message">Campo obrigatório.</p>
                )}
            </div>

            <div className="formGroup">
                <label>Com relação à manutenibilidade do sofware, há perspectivas de
                    mudanças/ evoluções frequentes no sistema?
                </label>
                <select
                    className={errors?.maintainability && "input-error"}
                    defaultValue="0"
                    {...register("maintainability", { validate: (value) => value !== "0" })}>
                    <option value="0">Selecione opção...</option>
                    <option value="yes">Sim</option>
                    <option value="no">Não</option>
                    <option value="dont-know">Não sei</option>
                </select>
                {errors?.maintainability?.type === "validate" && (
                    <p className="error-message">Campo obrigatório.</p>
                )}
            </div>

            <div className="formGroup">
                <label>Com relação à segurança, o sofware armazenará dados importantes
                    de interesse de terceiros?
                </label>
                <select
                    className={errors?.security && "input-error"}
                    defaultValue="0"
                    {...register("security", { validate: (value) => value !== "0" })}>
                    <option value="0">Selecione opção...</option>
                    <option value="yes">Sim</option>
                    <option value="no">Não</option>
                    <option value="dont-know">Não sei</option>
                </select>
                {errors?.security?.type === "validate" && (
                    <p className="error-message">Campo obrigatório.</p>
                )}
            </div>

            <div className="formGroup">
                <label>Com relação à usuabilidade, o sofware possui necessidade
                    de eficiência do usuário com relação a auto-aprendizagem,
                    minimização do impacto de erros ou relacionado?
                </label>
                <select
                    className={errors?.usability && "input-error"}
                    defaultValue="0"
                    {...register("usability", { validate: (value) => value !== "0" })}>
                    <option value="0">Selecione opção...</option>
                    <option value="yes">Sim</option>
                    <option value="no">Não</option>
                    <option value="dont-know">Não sei</option>
                </select>
                {errors?.usability?.type === "validate" && (
                    <p className="error-message">Campo obrigatório.</p>
                )}
            </div>

            <div className="formGroup">
                <label>A elasticidade da base de dados, ou seja, capacidade do
                    sofware escalar sua tecnologia de armazenamento bem como
                    os dados armazenados, é um fator importante?
                </label>
                <select
                    className={errors?.elasticity && "input-error"}
                    defaultValue="0"
                    {...register("elasticity", { validate: (value) => value !== "0" })}>
                    <option value="0">Selecione opção...</option>
                    <option value="yes">Sim</option>
                    <option value="no">Não</option>
                    <option value="dont-know">Não sei</option>
                </select>
                {errors?.elasticity?.type === "validate" && (
                    <p className="error-message">Campo obrigatório.</p>
                )}
            </div>

            <div className="formGroup">
                <button onClick={() => handleSubmit(onSubmit)()}>SUBMETER</button>
            </div>

        </div>

    );
};

export default SistemaAluno;