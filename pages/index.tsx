import { GetStaticProps, InferGetStaticPropsType } from 'next'
import { Layout } from '@components/Layout'
import { PlantCollection } from '@components/PlantCollection'

import { getPlantList } from '@api'
import { Hero } from '@components/Hero'
import { Authors } from '@components/Authors'
// import { useEffect, useState } from 'react'

interface HomeProps {
  plants: Plant[]
}
export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const plants = await getPlantList({ limit: 5 })
  // console.log('ENTORNRNRNR', process.env.NEXT_PUBLIC_SPACE_ID)
  return {
    props: {
      plants,
    },
    revalidate: 1, //refresh cada 5 min
  }
}

export default function Home({
  plants,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  //fetch desde el cliente
  // const [data, setData] = useState<Plant[]>([])
  // useEffect(() => {
  //   getPlantList({ limit: 5 }).then((receivedData) => setData(receivedData))
  // }, [])
  return (
    <Layout>
      <Hero {...plants[0]} className="mb-20" />
      <Authors className="mb-10" />
      <PlantCollection plants={plants} variant="vertical" className="mb-24" />
      <PlantCollection
        plants={plants.length > 8 ? plants.slice(3, 9) : plants}
        variant="square"
      />
    </Layout>
  )
}
