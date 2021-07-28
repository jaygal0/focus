import React from 'react'
import styled from 'styled-components'

const QuoteMessage = styled.p`
  color: ${({ theme }) => theme.color.white};
  margin-top: 4rem;
  font-weight: 200;
  text-align: center;
`

const Quote = ({ msg }) => {
  return <QuoteMessage>{msg}</QuoteMessage>
}

export default Quote
