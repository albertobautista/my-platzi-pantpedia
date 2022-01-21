import { Layout } from '@components/Layout'
import { Typography } from '@ui/Typography'
import { Button } from '@ui/Button'

export default function NotFoundPage() {
  return (
    <Layout title="404">
      <div className="text-center">
        <Typography variant="h2" className="mb-6">
          🍂 Lo sentimos
        </Typography>
        <Typography variant="body1" className="mb-6">
          No se encontro el mensaje de error
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
