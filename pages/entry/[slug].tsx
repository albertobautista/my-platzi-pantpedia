// import { useState } from 'react'
import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'

import { getPlant, getPlantList } from '@api'
import { Layout } from '@components/Layout'
import { Typography } from '@ui/Typography'
import { Grid } from '@ui/Grid'

import { RichText } from '@components/RichText'
import { AuthorCard } from '@components/AuthorCard'

interface PlantEntryPorps {
  plant: Plant
}

type PathType = {
  params: {
    slug: string
  }
}

export const getStaticPaths = async () => {
  const entries = await getPlantList({ limit: 10 })

  const paths: PathType[] = entries.map((entry) => ({
    params: {
      slug: entry.slug,
    },
  }))

  return {
    paths,
    fallback: true,
  }
}
export const getStaticProps: GetStaticProps<PlantEntryPorps> = async ({
  params,
}) => {
  const slug = params?.slug
  if (typeof slug !== 'string') {
    return {
      notFound: true,
    }
  }
  try {
    const plant = await getPlant(slug)
    return {
      props: {
        plant,
      },
      revalidate: 1, //refresh cada 5 min
    }
  } catch (error) {
    return {
      notFound: true,
    }
  }
}

export default function PlantEntryPage({
  plant,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()
  // const router = useRouter()
  // const { query } = router
  // const { slug } = query

  // const [plant, setPlant] = useState<Plant | null>(null)
  // const [status, setStatus] = useState<QueryStatus>('idle')

  // useEffect(() => {
  //   if (typeof slug !== 'string') {
  //     return
  //   }
  //   setStatus('loading')
  //   getPlant(slug)
  //     .then((receivedData) => {
  //       setPlant(receivedData)
  //       setStatus('success')
  //     })
  //     .catch(() => {
  //       setStatus('error')
  //     })
  // }, [slug])

  // if (status === 'loading' || status === 'idle') {
  //   return (
  //     <Layout>
  //       <main>Loading...</main>
  //     </Layout>
  //   )
  // }

  // if (plant === null || status === 'error') {
  //   return (
  //     <Layout>
  //       <main>Error 404 !!!</main>
  //     </Layout>
  //   )
  // }

  if (router.isFallback) {
    return <Layout>Loading... Please Wait</Layout>
  }
  return (
    <Layout>
      <Grid container spacing={4}>
        <Grid item xs={12} md={8} lg={9} component="article">
          <figure>
            <img width={952} src={plant?.image.url} alt={plant?.image.title} />
          </figure>
          <div className="px-12 pt-8">
            <Typography variant="h2">{plant?.plantName}</Typography>
          </div>
          <div className="p-10">
            <RichText richText={plant?.description} />
          </div>
        </Grid>
      </Grid>
      <section className="my-4 border-t-2 border-b-2 border-gray-200 pt-12 pb-7">
        <AuthorCard {...plant?.author} />
      </section>
    </Layout>
  )
}
