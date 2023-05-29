import axios, { Axios } from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import styled from "styled-components"
import Seat from "../../components/Seat";

export default function SeatsPage({assentos, setAssentos, user, setUser}) {

    const parametros = useParams();
    const navigate = useNavigate();

    const URL = `https://mock-api.driven.com.br/api/v8/cineflex/showtimes/${parametros.idSessao}/seats`
    const URLPUSH = `https://mock-api.driven.com.br/api/v8/cineflex/seats/book-many`;

    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [listaAssentos, setListaAssentos] = useState([]);
    const [sessao, setSessao] = useState(undefined);
    
    let seats = undefined;

    useEffect(() => {
        const promisse = axios.get(URL);
        promisse.then((resp) => {
            setSessao(resp.data);
        })
        promisse.catch(erro => console.log(erro.response.data));
        setAssentos([]);
    }, []);

    if (sessao === undefined) {
        return <div>carregando</div>
    } else {
        seats = sessao.seats;
    }

    function reservarAssentos(e) {
        e.preventDefault();

        if (listaAssentos.length !== 0) {
            const newIngresso = {
                ids: listaAssentos,
                name: nome,
                cpf: cpf
            }
            console.log("ENVIO", newIngresso);
            axios.post(URLPUSH, newIngresso)
                .then((response) => {
                    console.log(response);
                    console.log("Enviado com sucesso");
                    navigate('/sucesso');
                })
                .catch((error) => {
                    console.error(error);
                });
            
            setUser({nome:nome, cpf: cpf})
        } else {
            console.log("Selecione algum assento");
        }
    }

    return (
        <PageContainer>
            Selecione o(s) assento(s)

            <SeatsContainer>
                {(seats) && seats.map((seat) => (
                    <Seat key={seat.id}
                        name={seat.name} id={seat.id} isAvailable={seat.isAvailable}
                        listaAssentos={listaAssentos} setListaAssentos={setListaAssentos}
                        assentos={assentos} setAssentos={setAssentos} />
                ))}
            </SeatsContainer>

            <CaptionContainer>
                <CaptionItem>
                    <CaptionCircle cor={"#1AAE9E"} borda={"#0E7D71"} />
                    Selecionado
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle cor={"#C3CFD9"} borda={"#7B8B99"} />
                    Disponível
                </CaptionItem>
                <CaptionItem>
                    <CaptionCircle cor={"#FBE192"} borda={"#F7C52B"} />
                    Indisponível
                </CaptionItem>
            </CaptionContainer>

            <FormContainer onSubmit={reservarAssentos} >

                <label htmlFor="campoNome">Nome do Comprador:</label>
                <input data-test="client-name" id="campoNome" type="text" placeholder="Digite seu nome..." required
                    value={nome} onChange={(e) => setNome(e.target.value)} />

                <label htmlFor="campoCpf">CPF do Comprador:</label>
                <input data-test="client-cpf" id="campoCpf" type="text" placeholder="Digite seu CPF..." required
                    value={cpf} onChange={(e) => setCpf(e.target.value)} />

                <button data-test="book-seat-btn" type="submit">Reservar Assento(s)</button>

            </FormContainer>

            <FooterContainer  data-test="footer">
                <div>
                    <img src={sessao.movie.posterURL} alt="poster" />
                </div>
                <div>
                    <p>{sessao.movie.title}</p>
                    <p>{sessao.day.weekday} - {sessao.name}</p>
                </div>
            </FooterContainer>

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
    padding-bottom: 120px;
    padding-top: 70px;
`
const SeatsContainer = styled.div`
    width: 330px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`
const FormContainer = styled.form`
    width: calc(100vw - 40px); 
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin: 20px 0;
    font-size: 18px;
    button {
        align-self: center;
    }
    input {
        width: calc(100vw - 60px);
    }
`
const CaptionContainer = styled.div`
    display: flex;
    flex-direction: row;
    width: 300px;
    justify-content: space-between;
    margin: 20px;
`
const CaptionCircle = styled.div`
    border: 1px solid ${(p) => p.borda};         // Essa cor deve mudar
    background-color: ${(p) => p.cor};    // Essa cor deve mudar
    height: 25px;
    width: 25px;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
`
const CaptionItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 12px;
`

const FooterContainer = styled.div`
    width: 100%;
    height: 120px;
    background-color: #C3CFD9;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    position: fixed;
    bottom: 0;

    div:nth-child(1) {
        box-shadow: 0px 2px 4px 2px #0000001A;
        border-radius: 3px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        margin: 12px;
        img {
            width: 50px;
            height: 70px;
            padding: 8px;
        }
    }

    div:nth-child(2) {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        p {
            text-align: left;
            &:nth-child(2) {
                margin-top: 10px;
            }
        }
    }
`