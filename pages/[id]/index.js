import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Task({ data }) {
  const router = useRouter()
  const handleDelete = async () => {
    const taskId = router.query.id

    try {
      const deleted = await fetch(`http://localhost:3000/api/todos/${taskId}`, {
        method: 'DELETE',
      })

      router.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  const { _id, title, desc, date, completed } = data.data
  return (
    <div>
      <h1>Task: {title} </h1>
      <p>{desc}</p>
      <p>{completed ? `Completed: Yes` : `Complete: No`}</p>
      <p>Posted on {date}</p>
      <Link href="/">
        <button>back</button>
      </Link>
      <button onClick={handleDelete}>delete task</button>
      <Link href={`/${_id}/edit`}>
        <button>edit</button>
      </Link>
    </div>
  )
}

export async function getServerSideProps({ query: { id } }) {
  const res = await fetch(`http://localhost:3000/api/todos/${id}`)
  const data = await res.json()

  return {
    props: { data },
  }
}
