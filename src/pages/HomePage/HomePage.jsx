import styled from "styled-components"
import Movie from "../../components/Movie"
import axios, { Axios } from "axios"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
    const URL = 'https://mock-api.driven.com.br/api/v8/cineflex/movies';
    
    const [listaFilmes, setListaFilmes] = useState([])

    useEffect( () => {
        const promisse = axios.get(URL);
        promisse.then((resp) => {
            console.log(resp);
            setListaFilmes(resp.data);
        })
        promisse.catch( erro => console.log(erro.response.data));
    }, []);

    

    return (
        <PageContainer>
            Selecione o filme

            <ListContainer>
                
                {listaFilmes.map((filme => (
                    <Link to={`/sessoes/${filme.id}`} key={filme.id}>
                        <Movie posterURL={filme.posterURL} />
                    </Link>
                )))}
                
            </ListContainer>

        </PageContainer>
    )
}

const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: 'Roboto';
    font-size: 24px;
    text-align: center;
    color: #293845;
    margin-top: 30px;
    padding-top: 70px;
`
const ListContainer = styled.div`
    width: 330px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    padding: 10px;
`
