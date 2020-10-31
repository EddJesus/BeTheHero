import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';

import api from '../../services/api'

import logoImg from '../../assets/logo.png'

import styles from './styles'

function Incidents(){

    const navigation = useNavigation();
    const [incidents, setIncidents] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    function navigateToDetail(incident){
        navigation.navigate('Detail', { incident });
    }

    async function loadIncidents(){

        if(loading){
            return;
        }

        if(total > 0 && incidents.length === total){
            return;
        }

        setLoading(true);

        const res = await api.get('incidents',{
            params: { page }
        });

        setIncidents([... incidents, ...res.data]); //forma de anexar 2 vetores dentro do react
        setTotal(incidents.length);
        setPage(page + 1)

        setLoading(false);
    }

    useEffect(() => {
        loadIncidents();
    }, []);

    return(
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg}></Image>
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} casos.</Text> 
                </Text>
            </View>

            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia!</Text>


            <FlatList //o FlatList é usado para deixar a interface com o atributo de rolagem, usada principalmente para listas.
            style={styles.incidentList}
            data={incidents} //aqui recebe um array que indica quais valores essa lista recebe
            keyExtractor={incident => String(incident.id)} //igual a key do ReactJS
            showsVerticalScrollIndicator = {false} //tirar o scroll 'visual' da tela, deixando ainda a funcionaldiade de scroll
            onEndReached={loadIncidents} //quando chegar ao final da página essa propriedade chamará a função que eu desejar
            onEndReachedThreshold={0.2} //essa propriedade passa a porcetagem de distância que o usuário tem q estar do final da lista para a onEndReached ser chamada (valores vão de 0 a 1 em porcentagem, exemplo: 0.1 = 10%, 0.2 = 20%, etc.)
            renderItem={( { item: incident } ) => ( //dentro dessa propriedade deve-se passar uma função que receba um JSX         
            
            <View style={styles.incident}>
                <Text style={styles.incidentProperty}>ONG:</Text>
                <Text style={styles.incidentValue}>{incident.name}</Text>
                
                <Text style={styles.incidentProperty}>CASO:</Text>
                <Text style={styles.incidentValue}>{incident.title}</Text>

                <Text style={styles.incidentProperty}>VALOR:</Text>
                <Text style={styles.incidentValue}>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</Text>

                <TouchableOpacity 
                    style={styles.detailsButton} 
                    onPress={() => navigateToDetail(incident)}>
                    <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                    <Feather name="arrow-right" size={16} color="#E02041"/>
                </TouchableOpacity>
            </View>)}/>

        </View>
    )
}

export default Incidents;