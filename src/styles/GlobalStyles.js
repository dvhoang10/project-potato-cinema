import { createGlobalStyle } from "styled-components";
import { Breakpoints } from "./Breakpoint";

export const GlobalStyles = createGlobalStyle`
    :root{
        --color-primary: #423F57;
        --color-secondary: rgba(51, 51, 51, 0.7);
        --color-light-blue: #a5abbd;
        --color-nav: rgba(33, 33, 33, 0.98);
        --color-footer: rgba(19, 18, 20, 0.98);
        --color-red: #ca4242;
        --light-red: #dea3a3;
        --deep-peach: #FFC5A3;
        --blue-magenta: #483f5e;
        --vampire-black: #080808;
        --rgba-blue-magenta: rgba(66, 63, 87, 0.8);
        --border: 1px solid hsl(0, 0%, 18.82%);
        --color-magenta: #715d70;
        --text-light: hsla(0, 100%, 100%, 0.88);
        --light: hsla(0, 100%, 100%, 0.88);
        --dark: hsla(248, 14%, 11%, 0.88);
        --shadow-light: 0 4px 8px 0 #ffffff4d;
        --shadow-dark: 0 4px 8px 0 #00000040;
        --dark-gray:#696969 ;
        --dark-blue: #4b4762;
        --dark-pink: #713758;
        --color-lumber: #FFDFD3;
    }
    html, body {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-size: 16px;
        height: inherit;
        color: var(--text-light);
        font-family: 'Khand', sans-serif;
    }
    a{
        color: var(--text-light);
        :hover{
            color: var(--color-red);
        }
        text-decoration: none;
    }
    h1, h2, h3, h4{
        margin: 0;
        color: var(--text-light);
    }
    p, span {
        margin: 0;
        font-size: 1rem;
        font-family: 'Poppins', sans-serif;
        ${Breakpoints.md}{
            font-size: 1rem;
        }
    }
    .logo {
        user-select: none;
    }
    @keyframes fade-in {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
            transform: none;
        }
    } 
`;
