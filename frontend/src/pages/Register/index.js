import  React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import logo from '../../assets/logo.svg';
import './styles.css';

function Register(){

    const [name, setName] = useState(''); //criando estados para poder salvar os inputs dentro dessas constantes
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');

    const history = useHistory(); //salvando a função do React-Router-Dom que faz mudança de rotas


    async function handleRegister(e){ //recebe como parametro o evento padrão de submit do formulário
        e.preventDefault(); //função usada para prevenir o recarregamento da pagina quando houver envio de formulário

        const data = { //salvando os dados das constantes dentro do array data
            name,
            email,
            whatsapp,
            city,
            uf
        }

        try{
            const response = await api.post('ongs', data); //enviando o array para a api através da função 'post()' 
            alert(`Seu ID de acesso: ${response.data.id}`);
            history.push('/'); //usando uma função do React-Router-Dom para poder fazer a mudança de rota
        }catch (error){
            alert('Houve um erro (' + error + ') no seu cadastro, tente novamente!');
        }
        
    }

    return (
        <div className="register-container">
            <div className="content">

                <section>
                    <img src={logo} alt="Be The Hero"/>
                    <h1>Cadastro</h1>

                    <p>Faça seu cadastro, entre na plataforma e ajuda pessoas a encontrarem casos da sua ONG.</p>

                    <Link to="/" className="back-link"><FiArrowLeft size={16} color="#E02041"></FiArrowLeft> Voltar para logon</Link>
                </section>

                <form onSubmit={handleRegister}>

                    <input placeholder="Nome da Ong" 
                           value={name} 
                           onChange={e => setName(e.target.value)}/> {/* chamando uma arrow function passando 'e' que é o evento e dentro dessa chamando a função do useState para poder salvar o valor do input   */}

                    <input type="email" placeholder="E-mail" 
                           value={email} 
                           onChange={e => setEmail(e.target.value)}/> {/* chamando uma arrow function passando 'e' que é o evento e dentro dessa chamando a função do useState para poder salvar o valor do input   */} 

                    <input placeholder="WhatsApp" 
                           value={whatsapp} 
                           onChange={e => setWhatsapp(e.target.value)}/> {/* chamando uma arrow function passando 'e' que é o evento e dentro dessa chamando a função do useState para poder salvar o valor do input   */}

                    <div classvalue="input-group">
                        
                        <input placeholder="Cidade" 
                           value={city} 
                           onChange={e => setCity(e.target.value)}/> {/* chamando uma arrow function passando 'e' que é o evento e dentro dessa chamando a função do useState para poder salvar o valor do input   */}

                        <input placeholder="UF" style={{ width: 80 }} 
                           value={uf} 
                           onChange={e => setUf(e.target.value)}/> {/* chamando uma arrow function passando 'e' que é o evento e dentro dessa chamando a função do useState para poder salvar o valor do input   */}
                    </div>

                    <button type="submit" className="button"> Cadastrar </button>
                </form>
            </div>
        </div>
    );
}

export default Register;