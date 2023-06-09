import axios from "axios"
import { useState } from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import styled from "styled-components"
import HomePage from "./pages/HomePage/HomePage"
import SeatsPage from "./pages/SeatsPage/SeatsPage"
import SessionsPage from "./pages/SessionsPage/SessionsPage"
import SuccessPage from "./pages/SuccessPage/SuccessPage"



export default function App() { 

    axios.defaults.headers.common['Authorization'] = 'qyljPJJpi4WtoJbGgD9q72Bk';
    const [user, setUser] = useState(undefined);
    const [movie, setMovie] = useState(undefined);
    const [assentos, setAssentos] = useState([]);


    return (
        <>
        <NavContainer>CINEFLEX</NavContainer>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/sessoes/:idFilme" element={<SessionsPage setMovie={setMovie} />} />
                <Route path="/assentos/:idSessao" element={<SeatsPage assentos={assentos} setAssentos={setAssentos} user={user} setUser={setUser}/>}/>
                <Route path="/sucesso" element={<SuccessPage movie={movie} assentos={assentos} user={user} />} />
            </Routes>
        </BrowserRouter>
        </>
    )
}

const NavContainer = styled.div`
    width: 100%;
    height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #C3CFD9;
    color: #E8833A;
    font-family: 'Roboto', sans-serif;
    font-size: 34px;
    position: fixed;
    top: 0;
    left: 0;
    a {
        text-decoration: none;
        color: #E8833A;
    }
`
