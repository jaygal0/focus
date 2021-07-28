import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import Meta from '../../components/Meta'
import Header from '../../components/Header'

export default function Edit({ data }) {
  const { _id, title, desc, date, completed } = data.data
  const [form, setForm] = useState({ title: title, desc: desc })
  const router = useRouter()

  const updateNote = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/todos/${_id}`, {
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
    updateNote()
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
      {/* <form onSubmit={handleSubmit}>
        <label htmlFor="title">title</label>
        <input
          type="text"
          name="title"
          placeholder="Enter task"
          onChange={handleChange}
          value={form.title}
        />
        <label htmlFor="desc">description</label>
        <input
          type="text"
          name="desc"
          placeholder="Enter description"
          onChange={handleChange}
          value={form.desc}
        />
        <button>submit</button>
      </form>
      <Link href={`/${_id}`}>
        <button>back</button>
      </Link> */}

      <form id="taskFormEdit" onSubmit={handleSubmit}>
        <label htmlFor="title">title</label>
        <input
          type="text"
          name="title"
          placeholder="Enter task"
          onChange={handleChange}
          value={form.title}
        />
        <label htmlFor="desc">description</label>
        <input
          type="text"
          name="desc"
          placeholder="Enter description"
          onChange={handleChange}
          value={form.desc}
        />
      </form>
    </>
  )
}

export async function getServerSideProps({ query: { id } }) {
  const res = await fetch(`http://localhost:3000/api/todos/${id}`)
  const data = await res.json()

  return {
    props: { data },
  }
}
