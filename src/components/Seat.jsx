import { useState } from "react";
import styled from "styled-components"

export default function Seat(props){

    let {id, name, isAvailable, listaAssentos, setListaAssentos, assentos, setAssentos} = props;

    const [selected, setSelected] = useState(false);

    function selecionar(id, name, isAvailable){
        let newList = [];
        let listaDeAssentos = [];

        if(isAvailable){
            alert("Esse assento não está disponível");
        }else{
            (selected) ? setSelected(false) : setSelected(true);
        
            const index = listaAssentos.indexOf(id);
    
            if(index === -1){
                newList = [...listaAssentos, id]
                setListaAssentos(newList);
                console.log("add",newList);

                listaDeAssentos = [...assentos, name];
                setAssentos(listaDeAssentos);

            }else{
                newList = [...listaAssentos];
                newList.splice(index, 1);
                setListaAssentos(newList);

                listaDeAssentos = [...assentos];
                listaDeAssentos.splice(index, 1);
                setAssentos(listaDeAssentos);

            }

        }
        
    }

    return (
        <SeatItem data-test="seat" onClick={() => selecionar(id, name, isAvailable)}
        isAvailable={isAvailable} selected={selected} >
            {name}
        </SeatItem>
    );
}

const SeatItem = styled.div`
    border: 1px solid ${(p) => corBorda(p) };
    background-color: ${(p) => selecionarCor(p) };
    height: 25px;
    width: 25px;
    border-radius: 25px;
    font-family: 'Roboto';
    font-size: 11px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 5px 3px;
    &:hover {
    cursor: pointer;
    }
`

function selecionarCor(p){
    
    const {isAvailable, selected} = p;
    if(isAvailable === false){
        if(selected === true){
            return "#1AAE9E";
        }else{
            return "#C3CFD9";
        }
    }else{
        return "#FBE192";
    }

}
function corBorda(p){
    const {isAvailable, selected} = p;

    if(isAvailable === false){
        if(selected === true){
            return "#0E7D71";
        }else{
            return "#808F9D";
        }
    }else{
        return "#F7C52B";
    }   
}