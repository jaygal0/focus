import React from 'react'
import Head from 'next/head'

const Meta = ({ title, desc }) => {
  return (
    <Head>
      <title>{title}</title>
      {/* <link rel="icon" href="/favicon.svg" /> */}
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" />
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;700;900&family=Nunito:wght@800&display=swap"
        rel="stylesheet"
      />
      <meta name="description" content={desc} />
      <meta name="robots" content="index, follow" />
    </Head>
  )
}

export default Meta
