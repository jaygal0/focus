import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  color: ${({ theme }) => theme.color.black};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 4rem;
`
const Message = styled.p`
  text-align: center;
  margin-bottom: 1.6rem;
`
const Author = styled.p`
  text-align: center;
  font-size: ${({ theme }) => theme.font.meta};
`

const Quote = () => {
  return (
    <Wrapper>
      <Message>“Focusing is about saying No.”</Message>
      <Author>Steve Jobs </Author>
    </Wrapper>
  )
}

export default Quote
