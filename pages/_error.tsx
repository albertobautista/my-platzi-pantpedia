import { NextPage } from 'next'

import { Layout } from '@components/Layout'
import { Typography } from '@ui/Typography'
import { Button } from '@ui/Button'
import NotFound from './404'
import ServerError from './500'

type ErrorPageProps = {
  statusCode?: number
  message?: string
}

const ErrorPage: NextPage<ErrorPageProps> = ({ statusCode, message }) => {
  console.log('AAAAA', statusCode)
  if (typeof statusCode === 'number' && statusCode === 404) {
    console.log('AAAAA IF', statusCode)

    return <NotFound />
  }

  if (typeof statusCode === 'number' && statusCode > 500) {
    return <ServerError statusCode={statusCode} />
  }

  let errorMessage = message
  if (!message) {
    errorMessage = statusCode ? 'Error en servidor' : 'Error en cliente'
  }

  return (
    <Layout>
      <div className="text-center">
        <Typography variant="h2" className="mb-6">
          🦦 Doh!
        </Typography>
        <Typography variant="body1" className="mb-6">
          {errorMessage}
        </Typography>
        {!statusCode ? null : (
          <Typography variant="body1" className="mb-6">
            <span className="bg-gray-300 inline-block">
              ERRORCODE: {statusCode}
            </span>
          </Typography>
        )}
        <Button color="primary" variant="contained" href="/" title="Ir al Home">
          Ir al Home
        </Button>
      </div>
    </Layout>
  )
}
ErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}
export default ErrorPage
