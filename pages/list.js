import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Card from '../components/Card'
import Header from '../components/Header'
import Meta from '../components/Meta'
import styled from 'styled-components'
import Link from 'next/link'
import Quote from '../components/Quote'
import url from '../utils/url'

const NewTask = styled.h2`
  max-width: 92.8rem;
  width: 100%;
  height: min-content;
  padding: 4.8rem;
  align-items: center;
  border-radius: 0.8rem;
  border: 0.5px solid ${({ theme }) => theme.color.black};
  margin-bottom: 1.6rem;
  color: ${({ theme }) => theme.color.black};
  display: flex;
  justify-content: center;
  font-size: ${({ theme }) => theme.font.meta};
  font-weight: 300;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`

export default function List({ data }) {
  // To add a class to the body in Nextjs
  useEffect(() => {
    document.querySelector('body').classList.add('white')
    document.querySelector('body').classList.remove('black')
  })
  const router = useRouter()
  const deleteTask = async (e) => {
    const task = e.target.id

    try {
      const deleted = await fetch(`${url}/api/todos/${task}`, {
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
      <Header focus />
      <main>
        {data.data.length === 0 ? (
          <Link href="/new" passHref>
            <NewTask>add a new task</NewTask>
          </Link>
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
      <Quote />
      <footer></footer>
    </>
  )
}

export async function getServerSideProps(context) {
  const res = await fetch(`${url}/api/todos`)
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
