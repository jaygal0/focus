import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Meta from '../../components/Meta'
import Header from '../../components/Header'
import styled from 'styled-components'

const FormWrapper = styled.form`
  max-width: 92.8rem;
  width: 100%;
  height: min-content;
  padding: 4.8rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background: ${({ theme }) => theme.color.grey};
  border: 0.5px solid ${({ theme }) => theme.color.white};
  border-radius: 0.5rem;
  margin: auto;
`
const Label = styled.label`
  display: none;
`
const Input = styled.input`
  &.heading {
    font-size: ${({ theme }) => theme.font.desktop.h2};
    font-weight: 700;
    background: transparent;
    margin-bottom: 1.6rem;
    text-decoration: underline;
  }
  &.desc {
    font-size: ${({ theme }) => theme.font.desktop.body};
    font-weight: 300;
    background: transparent;
    text-decoration: underline;
  }
`
const Errors = styled.div`
  align-self: flex-start;
  color: red;
  opacity: 0.7;
  margin: 0.8rem 0;
  font-size: ${({ theme }) => theme.font.meta};

  &.top {
    margin-bottom: 1.6rem;
    margin-top: 0;
  }
`

export default function Edit({ data }) {
  useEffect(() => {
    document.querySelector('body').classList.add('white')
    document.querySelector('body').classList.remove('black')
  })

  const { _id, title, desc, date, completed } = data.data
  const [form, setForm] = useState({ title: title, desc: desc })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({})
  const router = useRouter()

  useEffect(() => {
    if (isSubmitting) {
      if (Object.keys(errors).length === 0) {
        updateNote()
      } else {
        setIsSubmitting(false)
      }
    }
  }, [errors])

  const updateNote = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/todos/${_id}`, {
        // const res = await fetch(`https://focus-one.vercel.app/api/todos/${_id}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      })
      router.push('/list')
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    let errs = validate()
    setErrors(errs)
    setIsSubmitting(true)
  }

  const validate = () => {
    let err = {}

    if (!form.title) {
      err.title = 'Task name is required'
    }
    if (!form.desc) {
      err.desc = 'Description is required'
    }
    if (form.title.length > 20) {
      err.title = 'Task name is too long, it cannot be more than 15 characters'
    }
    if (form.desc.length > 100) {
      err.title =
        'Description is too long, it cannot be more than 100 characters'
    }
    return err
  }

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <>
      <Meta />
      <Header backBtn updateBtn />

      <FormWrapper id="taskFormEdit" onSubmit={handleSubmit}>
        <Label htmlFor="title">title</Label>
        <Input
          type="text"
          name="title"
          placeholder="Enter task"
          onChange={handleChange}
          value={form.title}
          className="heading"
          autoFocus
          autoComplete="off"
        />
        <Errors className="top">{errors.title}</Errors>
        <Label htmlFor="desc">description</Label>
        <Input
          type="text"
          name="desc"
          placeholder="Enter description"
          onChange={handleChange}
          value={form.desc}
          className="desc"
          autoComplete="off"
        />
        <Errors>{errors.desc}</Errors>
      </FormWrapper>
    </>
  )
}

export async function getServerSideProps({ query: { id } }) {
  // const res = await fetch(`https://focus-one.vercel.app/api/todos/${id}`)
  const res = await fetch(`http://localhost:3000/api/todos/${id}`)
  const data = await res.json()

  return {
    props: { data },
  }
}
