import Link from 'next/link'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Meta from '../components/Meta'
import Header from '../components/Header'

export default function New() {
  const [form, setForm] = useState({ title: '', desc: '' })
  const router = useRouter()

  const createTask = async () => {
    try {
      const res = await fetch('http://localhost:3000/api/todos', {
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
    createTask()
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
      <form id="taskForm" onSubmit={handleSubmit}>
        <label htmlFor="title">title</label>
        <input
          type="text"
          name="title"
          placeholder="Enter task"
          onChange={handleChange}
        />
        <label htmlFor="desc">description</label>
        <input
          type="text"
          name="desc"
          placeholder="Enter description"
          onChange={handleChange}
        />
      </form>
    </>
  )
}
