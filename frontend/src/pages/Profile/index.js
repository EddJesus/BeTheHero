import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi'

import './styles.css';

import logo from '../../assets/logo.svg'

import api from '../../services/api'


function Profile (){
    const history = useHistory();

    const [incidents, setIncidents] = useState([]);

    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName'); //pegar o item correspondente ao nome passado dentro dos parametros

    useEffect(() => { //o useEffect recebe dois parametros: o primeiro é QUAL função a ser executada e o segundo é QUANDO a função será executada
        api.get('profile', {
            headers: {
                Authorization: ongId,
            }
        }).then(res => {
            setIncidents(res.data); //salva a RESposta da requisição da api no state incidents no formato de um array
        })
    }, [ongId]);


    function handleLogout(){
        localStorage.clear();

        history.push('/');
    }


    async function handleDeleteIncident(id){
        
        try{
            await api.delete(`incidents/${id}`, { //deu a chamada na api na rota incidents passando o id no parametro para deletar o dito cujo
                headers: {
                    Authorization: ongId, //na api se faz necessário passar o Authorization para poder deletar algo
                }
            })

            setIncidents(incidents.filter(incident => incident.id !== id)); //chamou a função .filter dentro dos incidents passando incident como parametro "deixando" apenas aqueles que possuem um id diferente do id do deletado
        }catch(error){
            alert('Erro (' + error + ') ao deletar incident. Tente Novamente!')
        }
    }

    return(
        <div className="profile-container">
            <header>
                <img src={logo} alt="Be the Hero"/>
                <span>Bem vinda, {ongName}</span>

                <Link className="button" to="/incidents/new">Cadastrar novo caso</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041"/>

                </button>
            </header>


            <h1>Casos cadastrados</h1>

            <ul> {/*tem que colocar as {} quando for inserir um jsx.*/}
                {incidents.map(incident => ( //chamou o state incidents e usou o .map para percorrer o array salvo nele
                    <li key={incident.id}> 

                        <strong>Caso:</strong>
                        <p>{incident.title}</p>
                
                        <strong>DESCRIÇÃO:</strong>
                        <p>{incident.description}</p>
                
                        <strong>VALOR:</strong>
                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p> {/* foi usado a função Intl.NumberFormat() para poder fazer a formatação do campo para moeda*/}
                
                        <button onClick={() => handleDeleteIncident(incident.id)} type="button"><FiTrash2 size={20} color="#a8a8b3"/></button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Profile;