import { Button, Heading, MultiStep, Text } from '@ignite-ui/react'
import { Container, Header } from './../style'
import { ArrowRight, Check } from 'phosphor-react'
// import { api } from '@/lib/axios'
import { AuthError, ConnectBox, ConnectItem } from './style'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

export default function ConnectCAlendar() {
  const session = useSession()
  const router = useRouter()

  const hasAuthError = !!router.query.error
  console.log(session)
  // eslint-disable-next-line prettier/prettier
  const isSignedIn = session.status === 'authenticated'

  async function handleConnectCalendar() {
    await signIn('google', { callbackUrl: '/register/connect-calendar' })
  }

  return (
    <Container>
      <Header>
        <Heading as="strong">Conecte sua agenda!</Heading>
        <Text>
          Conecte o seu calendario para verificar automaticamente as horas
          ocupadas e os novos eventos à medida que são agendados
        </Text>

        <MultiStep size={4} currentStep={2} />
      </Header>

      <ConnectBox>
        <ConnectItem>
          <Text>Google Agenda</Text>
          {isSignedIn ? (
            <Button size="sm" disabled>
              Conectado
              <Check />
            </Button>
          ) : (
            <Button
              variant="secondary"
              size="sm"
              onClick={handleConnectCalendar}
            >
              Conectar
              <ArrowRight />
            </Button>
          )}
        </ConnectItem>

        {hasAuthError && (
          <AuthError size="sm">
            Falha ao se conectar com o Google, verifique se você habilitou as
            permissões de acesso ao Google Calendar.
          </AuthError>
        )}

        <Button type="submit" disabled={!isSignedIn}>
          Próximo passo
          <ArrowRight />
        </Button>
      </ConnectBox>
    </Container>
  )
}
