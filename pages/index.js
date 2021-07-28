import Link from 'next/link'
import { useEffect } from 'react'
import styled from 'styled-components'
import Card from '../components/Card'
import Header from '../components/Header'
import Meta from '../components/Meta'
import Quote from '../components/Quote'

const Wrapper = styled.div`
  width: 100%;
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
      <Header whiteText />
      <main>
        {data.data.length === 0 ? (
          <h2>add a new task</h2>
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

        <Quote msg="this is a quote" />
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
