import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Meta from '../components/Meta'
import Header from '../components/Header'
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

export default function New() {
  useEffect(() => {
    document.querySelector('body').classList.add('white')
    document.querySelector('body').classList.remove('black')
  })

  const [form, setForm] = useState({ title: '', desc: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState({})
  const router = useRouter()

  useEffect(() => {
    if (isSubmitting) {
      if (Object.keys(errors).length === 0) {
        createTask()
      } else {
        setIsSubmitting(false)
      }
    }
  }, [errors])

  const createTask = async () => {
    try {
      // const res = await fetch('http://localhost:3000/api/todos', {
      const res = await fetch('https://focus-one.vercel.app/api/todos', {
        method: 'POST',
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
      <Header backBtn addTask />
      <FormWrapper id="taskForm" onSubmit={handleSubmit}>
        <Label htmlFor="title">title</Label>
        <Input
          type="text"
          name="title"
          placeholder="Enter task"
          onChange={handleChange}
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
          className="desc"
          autoComplete="off"
        />
        <Errors>{errors.desc}</Errors>
      </FormWrapper>
    </>
  )
}
