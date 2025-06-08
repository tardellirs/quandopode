import Header from '@/components/Header'
import styles from '../styles/pages/About.module.scss'

export default function About() {
  return (
    <div className={styles.container}>
      <Header className={styles.header} />
      <div className={styles.outerContent}>
        <div className={styles.content}>
          <h1>MeetingBrew</h1>
          <p>
            MeetingBrew é uma ferramenta moderna de agendamento que ajuda a
            encontrar o melhor horário em comum para reunir. Foi criada por dois
            estudantes de ciência da computação da Universidade de Michigan.
            Obrigado por usar o MeetingBrew!
          </p>
          <div className={styles.contact}>
            <p>
              Entre em contato:{' '}
              <a href='mailto:hi@meetingbrew.com'>hi@meetingbrew.com</a>
            </p>
            <p>
              Dê uma estrela ao MeetingBrew no GitHub:{' '}
              <a href='https://github.com/csaye/meetingbrew' target='_blank' rel='noopener noreferrer'>
                github.com/csaye/meetingbrew
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
