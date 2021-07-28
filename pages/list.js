import { useRouter } from 'next/router'
import Card from '../components/Card'
import Header from '../components/Header'
import Meta from '../components/Meta'

export default function List({ data }) {
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
    <>
      <Meta />
      <Header homeBtn />
      <main>
        {data.data.length === 0 ? (
          <h2>add a new task</h2>
        ) : (
          <div>
            {data.data.map((item) => {
              const { completed, _id, title, desc, date } = item
              return (
                <Card
                  key={_id}
                  id={_id}
                  title={title}
                  desc={desc}
                  date={date}
                />
              )
            })}
          </div>
        )}
      </main>
      <footer></footer>
    </>
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
