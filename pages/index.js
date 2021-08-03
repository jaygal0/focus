import Link from 'next/link'
import { useEffect } from 'react'
import styled from 'styled-components'
import Card from '../components/Card'
import Header from '../components/Header'
import Meta from '../components/Meta'

const Wrapper = styled.div`
  width: 100%;
`
const NewTask = styled.h2`
  max-width: 92.8rem;
  width: 100%;
  height: min-content;
  padding: 4.8rem;
  align-items: center;
  border-radius: 0.8rem;
  border: 0.5px solid ${({ theme }) => theme.color.white};
  margin-bottom: 1.6rem;
  color: ${({ theme }) => theme.color.white};
  display: flex;
  justify-content: center;
  font-size: ${({ theme }) => theme.font.meta};
  font-weight: 300;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
`
export default function Home({ data }) {
  // To add a class to the body in Nextjs
  useEffect(() => {
    document.querySelector('body').classList.add('black')
    document.querySelector('body').classList.remove('white')
  })

  return (
    <>
      <Meta title="OneTask" desc="this is a test" />
      <Header whiteText logoOpacity />
      <main>
        {data.data.length === 0 ? (
          <Link href="/new">
            <NewTask>add a new task</NewTask>
          </Link>
        ) : (
          <Wrapper>
            {data.data.slice(0, 1).map((item) => {
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
          </Wrapper>
        )}
      </main>
      <footer></footer>
    </>
  )
}

export async function getServerSideProps(context) {
  // const res = await fetch('http://localhost:3000/api/todos')
  const res = await fetch('https://focus-one.vercel.app/api/todos')
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
