import styled from "styled-components"

export const TStyleThem = styled.div<{ h: number }>`
    background: linear-gradient(125deg, #021B79, #0575E6);
    color: white;
    height: ${({ h }) => h}px;
    width: 100%;
    padding: 10px;
`

export const ThemLinear = styled.nav`
    background: linear-gradient(125deg, #021B79, #0575E6);
    color: white;
    width: 100%;
    
`

export const TStyleThemAuto = styled.div`
    background: linear-gradient(125deg, #021B79, #0575E6);
    color: white;
    height: 100vh;
    width: 100%;
    padding: 10px;
    .btn_back{
        position: absolute;
        margin-bottom: 650px;
        margin-right: 280px;
    }
    @media only screen and (max-width: 450px) {
        height: 125vh;     
    }
`

export const TStyleButton = styled.button`
    background: linear-gradient(125deg, #021B79, #0575E6);
    color: white;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2), 0 8px 20px rgba(2, 27, 121, 0.5);
    border-radius: 5px;
    font-size: 22px;
    font-weight: 600;

    &:hover{
        transform: scale(1.1);
        transition: 0.4s;
    }
`
