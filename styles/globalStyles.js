import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
html,
body {
  font-family: 'Inter', sans-serif;
  font-size: 62.5%;
  font-weight: 400;
  letter-spacing: 0.05rem;

  &.black {
    background: ${({ theme }) => theme.color.black}
  }
}

header {
  max-width: 92.8rem;
  margin: 0 auto;
  margin-top: 28vh;
  margin-bottom: 3.2rem;

}
main {
  max-width: 92.8rem;
  margin: 0 auto;
}
footer {
}

h1 {
  font-size: ${({ theme }) => theme.font.desktop.h1};
  line-height: ${({ theme }) => theme.lineHeight.desktop.h1};
  color: ${({ theme }) => theme.color.black};
  text-transform: capitalize;
  font-weight: 900;

  @media screen and (max-width: ${({ theme }) =>
    theme.breakPoint.phoneMedium}) {
  font-size: ${({ theme }) => theme.font.phone.h1};
  line-height: ${({ theme }) => theme.lineHeight.phone.h1};
  }
}
 
h2 {
  font-size: ${({ theme }) => theme.font.desktop.h2};
  line-height: ${({ theme }) => theme.lineHeight.desktop.h2};
  text-transform: capitalize;
  color: ${({ theme }) => theme.color.black};
  font-weight: bold;
  
  @media screen and (max-width: ${({ theme }) =>
    theme.breakPoint.phoneMedium}) {
  font-size: ${({ theme }) => theme.font.phone.h2};
  line-height: ${({ theme }) => theme.lineHeight.phone.h2};
  margin-bottom: 1.6rem;
  }
}

h3 {
    font-size: ${({ theme }) => theme.font.desktop.h3};
    line-height: ${({ theme }) => theme.lineHeight.desktop.h3};
    color: ${({ theme }) => theme.color.black};
    text-transform: capitalize;
    font-weight: bold;

  @media screen and (max-width: ${({ theme }) =>
    theme.breakPoint.phoneMedium}) {
  font-size: ${({ theme }) => theme.font.phone.h3};
  line-height: ${({ theme }) => theme.lineHeight.phone.h3};
  }
}

h4 {
  font-size: ${({ theme }) => theme.font.desktop.h4};
  line-height: ${({ theme }) => theme.lineHeight.desktop.h4};
  margin-bottom: 1.6rem;
  color: ${({ theme }) => theme.color.black};
  font-weight: 700;
  text-transform: capitalize;
}

p {
  font-size: ${({ theme }) => theme.font.body};
  line-height: ${({ theme }) => theme.lineHeight.body};
}

button {
  font-size: ${({ theme }) => theme.font.button};
  line-height: ${({ theme }) => theme.lineHeight.button};
  text-transform: capitalize;
  background: transparent;
  border: none;

  &.white-text {
    color: ${({ theme }) => theme.color.white}
  }

  &:hover {
    cursor: pointer;
  }
  &:active {}
}

a {
  color: ${({ theme }) => theme.color.hotPink};
  text-decoration: none;
  &:hover {
  color: ${({ theme }) => theme.color.black};
  }
}

input {
  font-size: ${({ theme }) => theme.font.desktop.p};
  border-radius: 3.2rem;
  outline:none;
  border: none;
  padding: .8rem 2.4rem;
  width: 100%;
::-webkit-input-placeholder {
  color: black;
  opacity: .7;
  }
}

blockquote {
  background: ${({ theme }) => theme.color.grey};
  padding: 2.4rem;
  margin-bottom: 2.4rem;
}

blockquote p {
  margin-bottom: 1.6rem;
}

ul {
  margin-bottom: 3.2rem;
}

ul li {
font-size: ${({ theme }) => theme.font.body};
line-height: ${({ theme }) => theme.lineHeight.body};
  @media screen and (max-width: ${({ theme }) => theme.breakPoint.tablet}) {
    list-style: none;
      }
}

// To create the hover effect on the cards. This will show and hide the options
#card:hover #options {
  display: flex;
}
#card:hover #time {
  display: none;
}

`

export default GlobalStyle
