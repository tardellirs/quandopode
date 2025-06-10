import DatesPicker from '@/components/DatesPicker'
import DaysPicker from '@/components/DaysPicker'
import Header from '@/components/Header'
import TimeRangeSlider from '@/components/TimeRangeSlider'
import TimezoneSelect from '@/components/TimezoneSelect'
import styles from '@/styles/pages/Index.module.scss'
import { selectStyles } from '@/util/styles'
import { getCurrentTimezone } from '@/util/timezone'
import { Meeting } from '@/util/types'
import TextareaAutosize from '@mui/base/TextareaAutosize'
import {
  collection,
  doc,
  getDoc,
  getFirestore,
  increment,
  setDoc,
  updateDoc,
} from 'firebase/firestore'
import Image from 'next/image'
import Router from 'next/router'
import { useEffect, useRef, useState } from 'react'
import Select from 'react-select'

// options for dates types
const datesOptions = [
  { value: 'dates', label: 'Datas específicas' },
  { value: 'days', label: 'Dias da semana' },
]

// ids that cannot be taken for meetings
const reservedIds = ['about']

export default function Index() {
  const db = getFirestore()

  const [timezone, setTimezone] = useState<string>(getCurrentTimezone())
  const [title, setTitle] = useState('')
  const [id, setId] = useState('')

  const [timeRange, setTimeRange] = useState<number[]>([9, 17])
  const [earliest, latest] = timeRange

  const titleInput = useRef<HTMLTextAreaElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)

  const [datesOption, setDatesOption] = useState(datesOptions[0])
  const [dates, setDates] = useState<string[]>([])
  const [days, setDays] = useState<number[]>([])

  const [mounted, setMounted] = useState(false)

  // set mounted on start
  useEffect(() => {
    setMounted(true)
  }, [])

  // focus title input on start
  useEffect(() => {
    titleInput.current?.focus()
  }, [])

  // creates a new meeting in firebase
  async function createMeeting() {
    // if no title given
    if (!title) {
      window.alert('É necessário inserir um título.')
      titleInput.current?.focus()
      return
    }
    // if no dates selected
    if (datesOption.value === 'dates' && !dates.length) {
      window.alert('É necessário selecionar ao menos uma data.')
      return
    }
    // if too many dates selected
    if (datesOption.value === 'dates' && dates.length > 31) {
      window.alert('Muitas datas selecionadas. O máximo é 31.')
      return
    }
    // if no days selected
    if (datesOption.value === 'days' && !days.length) {
      window.alert('É necessário selecionar ao menos um dia.')
      return
    }
    const meetingsRef = collection(db, 'meetings')
    // check id
    if (id) {
      const idLower = id.toLowerCase()
      // check id availability
      const idReserved = reservedIds.includes(idLower)
      let idTaken = false
      if (!idReserved) {
        const meetingRef = doc(meetingsRef, idLower)
        const meetingDoc = await getDoc(meetingRef)
        idTaken = meetingDoc.exists()
      }
      // if id not available
      if (idReserved || idTaken) {
        window.alert('ID da reunião indisponível. Escolha outro.')
        return
      }
    }
    // get meeting id
    const meetingId = id ? id : doc(meetingsRef).id.slice(0, 6).toLowerCase()
    const idLower = meetingId.toLowerCase()
    const meetingRef = doc(meetingsRef, idLower)
    // create meeting
    const meetingBase = {
      id: meetingId,
      title,
      timezone,
      earliest,
      latest,
      created: Date.now(),
    }
    const meeting: Meeting =
      datesOption.value === 'dates'
        ? { ...meetingBase, type: 'dates', dates: dates.slice().sort() }
        : { ...meetingBase, type: 'days', days: days.slice().sort() }
    await setDoc(meetingRef, meeting)
    // increment meeting count
    const statsRef = doc(db, 'app', 'stats')
    await updateDoc(statsRef, { meetings: increment(1) })
    Router.push(`/${meetingId}`)
  }

  return (
    <div className={styles.container}>
      <Header className={styles.header} />
      <div className={styles.outerContent}>
        <div className={styles.content} ref={contentRef}>
          <TextareaAutosize
            className={styles.titleInput}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Título da Reunião.'
            ref={titleInput}
            wrap='hard'
            maxLength={100}
            onKeyDown={(e) => {
              // prevent enter key
              if (e.key === 'Enter') e.preventDefault()
            }}
            spellCheck='false'
            data-gramm='false'
          />
          <div className={styles.datesTimes}>
            <div className={styles.dates}>
              <h2>Quais dias?</h2>
              <p>Tipo de data:</p>
              <Select
                className={styles.select}
                value={datesOption}
                onChange={(val) => {
                  if (val) setDatesOption(val)
                }}
                options={datesOptions}
                styles={selectStyles}
                instanceId='select-dates'
              />
              {datesOption.value === 'dates' && mounted && (
                <DatesPicker dates={dates} setDates={setDates} />
              )}
              {datesOption.value === 'days' && mounted && (
                <DaysPicker days={days} setDays={setDays} />
              )}
            </div>
            <div className={styles.times}>
              <h2>Quais horários?</h2>
              <p>Fuso horário:</p>
              <TimezoneSelect
                className={styles.select}
                timezone={timezone}
                setTimezone={setTimezone}
              />
              <TimeRangeSlider
                timeRange={timeRange}
                setTimeRange={setTimeRange}
              />
            </div>
          </div>
          <div className={styles.options}>
           <div className={styles.idSection}>
              <div className={styles.idInput}>
                <p>QuandoPode.com/ </p>
                <input
                  value={id}
                  onChange={(e) => {
                    // clean up input id
                    let newId = e.target.value
                    newId = newId.replaceAll(/[^\w -]/g, '')
                    newId = newId.replaceAll(' ', '-')
                    newId = newId.replaceAll('--', '-')
                    setId(newId)
                  }}
                  placeholder='ID personalizado (opcional)'
                  maxLength={100}
                  spellCheck='false'
                />
              </div>
              <p>
                Você pode definir um ID personalizado que aparececerá no link
                da sua reunião.
              </p>
            </div>
            <button onClick={createMeeting}>
              <Image
                src='/icons/add.svg'
                width='24'
                height='24'
                alt='add.svg'
              />
              Criar Evento
            </button>
          </div> 
        </div>
      </div>
    </div>
  )
}
