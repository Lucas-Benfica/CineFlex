import { Link } from "react-router-dom";
import styled from "styled-components"

export default function Session(props){
    
    const {day} = props;
    console.log("dia",day);
    
    let times = day.showtimes;
    console.log(times);
    
    return (

        <SessionContainer>
            {day.weekday} - {day.date}
            <ButtonsContainer>
                {times.map( time => (
                        <Link to={`/assentos/${time.id}`} key={time.id}>
                            <button>{time.name}</button>
                        </Link>
                    ))}
            </ButtonsContainer>
        </SessionContainer>        

    );
}

const SessionContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-family: 'Roboto';
    font-size: 20px;
    color: #293845;
    padding: 0 20px;
`
const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 20px 0;
    button {
        margin-right: 20px;
        width: 83px;
        height: 43px;
        background: #E8833A;
        border-radius: 3px;    
        border: none;
        color: white;    
    }
    a {
        text-decoration: none;
    }
`