import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Home({ data }) {
  const router = useRouter()
  const deleteTask = async (e) => {
    const task = e.target.id

    try {
      const deleted = await fetch(`http://localhost:3000/api/todos/${task}`, {
        method: 'DELETE',
      })

      router.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <div>
        {data.data.map((item) => {
          const { completed, _id, title, desc, date } = item
          return (
            <div key={_id}>
              <Link href={`/${_id}`}>
                <h2>{title}</h2>
              </Link>
              <p>{desc}</p>
              <p>Posted On: {date}</p>
              <input id={_id} type="checkbox" onClick={deleteTask} />
            </div>
          )
        })}
      </div>
      <Link href="/new">
        <button>new task</button>
      </Link>
    </div>
  )
}

export async function getServerSideProps(context) {
  const res = await fetch(`http://localhost:3000/api/todos`)
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
