import Header from '@/components/Header'
import styles from '../styles/pages/About.module.scss'

export default function About() {
  return (
    <div className={styles.container}>
      <Header className={styles.header} />
      <div className={styles.outerContent}>
        <div className={styles.content}>
          <h1>Quando Pode?</h1>
          <p>
            O <strong>Quando Pode?</strong> é uma ferramenta moderna de agendamento colaborativo que ajuda grupos a encontrarem o melhor horário para se reunir. Simples e rápido.
          </p>
          <p>
            Este sistema é um projeto de código aberto mantido por Tardelli Stekel.
          </p>
          <div className={styles.contact}>
            <p>
              Entre em contato:{' '}
              <a href='mailto:tardellirs@gmail.com'>tardellirs@gmail.com</a>
            </p>
            <p>
              Veja o projeto no GitHub:{' '}
              <a href='https://github.com/tardellirs/quandopode' target='_blank' rel='noopener noreferrer'>
                github.com/tardellirs/quandopode
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
