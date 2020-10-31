import React, { useState } from 'react';
import {FiLogIn} from 'react-icons/fi';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import './styles.css';
import heroesImg from '../../assets/heroes.png';
import logo from '../../assets/logo.svg';

function Logon (){

    const [id, setId] = useState('');

    const history = useHistory();

    async function handleLogin(e){
        e.preventDefault();

        try{
            const response = await api.post('/sessions', { id });
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);

            history.push('/profile');
        }catch{
            alert('Falha no login! Tente Novamente!');
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logo} alt="Be The Hero"/>

                <form onSubmit={handleLogin}>
                    <h1>Faça seu Logon</h1>

                    <input type="text" placeholder="Seu id"
                           value={id}
                           onChange={e => setId(e.target.value)}/>
                    <button className="button" type="submit">Entrar</button>

                    <Link to="/register" className="back-link"><FiLogIn size={16} color="#E02041"></FiLogIn> Não tenho cadastro</Link>
                </form>
            </section>

            <img src={heroesImg} alt="heroes"/>
        </div>
    )
}


export default Logon;