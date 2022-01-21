import { Layout } from '@components/Layout'
import { Typography } from '@ui/Typography'
import { Button } from '@ui/Button'

export default function NotFoundPage({
  statusCode = 500,
}: {
  statusCode?: number
}) {
  return (
    <Layout>
      <div className="text-center">
        <Typography variant="h2" className="mb-6">
          🍄 Algo Salio mal
        </Typography>
        <Typography variant="body1" className="mb-6">
          Mensaje de error
        </Typography>
        <Typography variant="body1" className="mb-6">
          <span className="bg-gray-300 inline-block">
            ERRORCODE: {statusCode}
          </span>
        </Typography>
        <Button
          color="primary"
          variant="contained"
          href="/"
          title="Ir al inicio"
        >
          Ir al inicio
        </Button>
      </div>
    </Layout>
  )
}
