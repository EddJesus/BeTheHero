import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import logo from '../../assets/logo.svg';


import './styles.css';

function NewIncident(){
    const history = useHistory();

    const ongId = localStorage.getItem('ongId');

    const[title, setTitle] = useState('');
    const[description, setDescription] = useState('');
    const[value, setValue] = useState('');

    async function handleNewIncident(e){
        
        e.preventDefault();

        const data = {
            title,
            description,
            value
        }
        
        try{
            await api.post('incidents', data, {
                headers:{
                    Authorization: ongId,
                }
            });

            alert('Caso cadastrado com sucesso!');

            history.push('/profile')

        }catch(error){
            alert('Ocorreu um erro (' + error + ') ao cadastrar novo caso. Tente novamente!')
        }
    }

    return(
        <div className="new-incident-container">
        <div className="content">
            <section>
                <img src={logo} alt="Be The Hero"/>
                <h1>Cadastrar novo caso</h1>

                <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

                <Link to="/profile" className="back-link"><FiArrowLeft size={16} color="#E02041"></FiArrowLeft> Voltar para home</Link>
            </section>

            <form onSubmit={handleNewIncident}>

                <input placeholder="Título do caso"
                       value={title} 
                       onChange={e => setTitle(e.target.value)}/>

                <textarea placeholder="Descrição do caso"
                       value={description}  
                       onChange={e => setDescription(e.target.value)}/>
                
                <input placeholder="Valor em Reais"
                       value={value}  
                       onChange={e => setValue(e.target.value)}/>

                <button type="submit" className="button"> Cadastrar </button>
            </form>
        </div>
    </div>
    )
}

export default NewIncident;