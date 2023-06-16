import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  *,
*::before,
*::after {
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
}

* {
  margin: 0;
  outline: transparent;
  border: none;
  color: #0c1517;
}

html {
  font-size: 62.5%;
  scroll-behavior: smooth;
  overflow: hidden;
  font-family: 'Poppins';
}

html,
body {
  height: 100vh;
  background-color: #f5f9fa;
}

body {
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}

img,
picture,
video,
canvas,
svg {
  display: block;
  max-width: 100%;
}

input,
button,
textarea,
select {
  font: inherit;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
}

#root,
#__next {
  isolation: isolate;
}

a {
  color: inherit;
  text-decoration: none;
}

@font-face {
  font-family: 'Poppins';
  font-weight: 400;
  src:url('/src/fonts/poppins-regular-webfont.woff2') format('woff2'),
      url('/src/fonts/poppins-regular-webfont.woff')format('woff');
}

`;

export default GlobalStyle;
