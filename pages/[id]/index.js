import Link from 'next/link'
import { useRouter } from 'next/router'
import Meta from '../../components/Meta'
import Header from '../../components/Header'
import Card from '../../components/Card'

export default function Task({ data }) {
  // To switch URL's quickly
  // const URL = 'http://localhost:3000'
  const URL = 'https://focus-one.vercel.app'

  const router = useRouter()
  const handleDelete = async () => {
    const taskId = router.query.id

    try {
      const deleted = await fetch(`${URL}/api/todos/${taskId}`, {
        method: 'DELETE',
      })

      router.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  const { _id, title, desc, date, completed } = data.data
  return (
    <>
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

      <Meta />
      <Header />
      <main>
        <Card title={title} desc={desc} date={date} />
      </main>
      <footer></footer>
    </>
  )
}

export async function getServerSideProps({ query: { id } }) {
  // To switch URL's quickly
  // const URL = 'http://localhost:3000'
  const URL = 'https://focus-one.vercel.app'

  const res = await fetch(`${URL}/api/todos/${id}`)
  const data = await res.json()

  if (!data) {
    return {
      notFound: true,
    }
  }

  return {
    props: { data },
  }
}
