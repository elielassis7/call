import React from 'react'
import { Container, Hero, Preview } from './style'
import Image from 'next/image'
import { Heading, Text } from '@ignite-ui/react'

import previewImage from '../../assets/app-preview.png'

export default function Home() {
  return (
    <Container>
      <Hero>
        <Heading as="h1" size="4xl">
          Agendamento descomplicado
        </Heading>
        <Text size="xl">
          Conecte seu calendário e permita que as pessoas marquem agendamentos
          no seu tempo livre.
        </Text>
      </Hero>
      <Preview>
        <Image
          src={previewImage}
          height={400}
          quality={100}
          priority
          alt="Calendario simbolizando o funcionamento"
        />
      </Preview>
    </Container>
  )
}
