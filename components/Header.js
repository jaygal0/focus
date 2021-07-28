import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import router from 'next/router'

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`

const Header = ({ backBtn, homeBtn, addTask, updateBtn, whiteText }) => {
  return (
    <HeaderWrapper>
      {backBtn ? (
        <button
          className={whiteText && 'white-text'}
          onClick={() => router.back()}
        >
          back
        </button>
      ) : homeBtn ? (
        <Link href="/">
          <button className={whiteText && 'white-text'}>home</button>
        </Link>
      ) : (
        <Link href="/list">
          <button className={whiteText && 'white-text'}>view all</button>
        </Link>
      )}
      <div>logo</div>
      {addTask ? (
        <button
          className={whiteText && 'white-text'}
          type="submit"
          form="taskForm"
        >
          add
        </button>
      ) : updateBtn ? (
        <button
          className={whiteText && 'white-text'}
          type="submit"
          form="taskFormEdit"
        >
          update
        </button>
      ) : (
        <Link href="/new">
          <button className={whiteText && 'white-text'}>new task</button>
        </Link>
      )}
    </HeaderWrapper>
  )
}

export default Header
