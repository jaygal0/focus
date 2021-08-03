import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import moment from 'moment'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'

const CardWrapper = styled.div`
  max-width: 92.8rem;
  width: 100%;
  height: min-content;
  padding: 4.8rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: black;
  border-radius: 0.8rem;
  border: 0.5px solid ${({ theme }) => theme.color.white};
  margin-bottom: 1.6rem;
`
const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
`
const CheckboxWrapper = styled.div`
  margin-right: 1.6rem;
  width: min-content;
  height: min-content;
`
const TextWrapper = styled.div``
const Header = styled.h2`
  color: white;
  margin-bottom: 0.8rem;
`
const Desc = styled.p`
  color: white;
  font-weight: 300;
`
const Time = styled.p`
  color: white;
  font-size: ${({ theme }) => theme.font.meta};
  font-weight: 300;
`
const OptionsWrapper = styled.div`
  display: none;
`
const Meta = styled.p`
  color: white;
  font-size: ${({ theme }) => theme.font.meta};
  font-weight: 300;
  margin-left: 0.8rem;

  &:hover {
    cursor: pointer;
  }

  &.margin-right {
    margin-right: 1.6rem;
  }
`
const InputHidden = styled.input`
  display: none;
`
const InputRedesign = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 300%;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all ease 0.9s;

  &.checkmark {
    &:after {
      content: '';
      background-image: url('check-white.svg');
      background-size: 32px 32px;
      height: 32px;
      width: 32px;
    }
  }

  &:hover {
    &:after {
      content: '';
      background-image: url('check.svg');
      background-size: 32px 32px;
      height: 32px;
      width: 32px;
    }
  }
`

const Card = ({ id, title, desc, date }) => {
  const [checkmark, setCheckmark] = useState(false)
  const router = useRouter()
  const handleDelete = async () => {
    try {
      const deleted = await fetch(
        `https://focus-one.vercel.app/api/todos/${id}`,
        // `http://localhost:3000/api/todos/${id}`,
        {
          method: 'DELETE',
        }
      )

      if (router.route === '/') {
        router.push('/')
      } else if (router.route === '/list') {
        router.push('/list')
      }
    } catch (error) {
      console.log(error)
    }
  }

  const checked = async () => {
    setCheckmark(!checkmark)
    setTimeout(async function () {
      try {
        const deleted = await fetch(
          `https://focus-one.vercel.app/api/todos/${id}`,
          // `http://localhost:3000/api/todos/${id}`,
          {
            method: 'DELETE',
          }
        )

        if (router.route === '/') {
          router.push('/')
        } else if (router.route === '/list') {
          router.push('/list')
        }
      } catch (error) {
        console.log(error)
      }
    }, 1000)
  }

  return (
    <CardWrapper id="card">
      <ContentWrapper>
        <CheckboxWrapper>
          <InputHidden
            id="input-hidden"
            type="checkbox"
            checked={checkmark && true}
            readOnly
          />
          <InputRedesign
            id="input-redesign"
            onClick={() => checked()}
            className={checkmark && 'checkmark'}
          ></InputRedesign>
        </CheckboxWrapper>
        <TextWrapper>
          <Header>{title}</Header>
          <Desc>{desc}</Desc>
        </TextWrapper>
      </ContentWrapper>
      <Time id="time">{`Added ${moment(date).fromNow()}`}</Time>
      <OptionsWrapper id="options">
        <Image
          src="/remove-icon.svg"
          width={16}
          height={16}
          onClick={handleDelete}
        />
        <Meta className="margin-right" onClick={handleDelete}>
          Remove
        </Meta>
        <Link href={`/${id}/edit`}>
          <Image
            className="margin-left"
            src="/edit-icon.svg"
            width={16}
            height={16}
          />
        </Link>
        <Link href={`/${id}/edit`}>
          <Meta>Edit</Meta>
        </Link>
      </OptionsWrapper>
    </CardWrapper>
  )
}

export default Card
