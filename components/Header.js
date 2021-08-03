import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import router from 'next/router'
import Image from 'next/image'

const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
`

const Header = ({
  backBtn,
  focus,
  addTask,
  updateBtn,
  whiteText,
  logoOpacity,
}) => {
  return (
    <HeaderWrapper>
      {backBtn ? (
        <button
          className={whiteText && 'white-text'}
          onClick={() => router.back()}
        >
          back
        </button>
      ) : focus ? (
        <Link href="/">
          <button className={whiteText && 'white-text'}>focus</button>
        </Link>
      ) : (
        <Link href="/list">
          <button className={whiteText && 'white-text'}>view all</button>
        </Link>
      )}
      <Image
        src={logoOpacity ? '/focus-logo-white.svg' : '/focus-logo-black.svg'}
        className={logoOpacity && 'logo-opacity'}
        width={171.87}
        height={44.93}
      />
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
