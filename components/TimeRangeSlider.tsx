import { Slider } from '@mui/material'
import { Dispatch } from 'react'
import styles from '../styles/components/TimeRangeSlider.module.scss'

type Props = {
  timeRange: number[]
  setTimeRange: Dispatch<number[]>
}

const marks = Array(25)
  .fill(null)
  .map((v, i) => ({
    value: i,
    label: i % 3 === 0 ? `${i % 12 || 12}` : undefined,
  }))

const maxValue = 24
const minDistance = 1

export default function TimeRangeSlider(props: Props) {
  const { timeRange, setTimeRange } = props

  const [earliest, latest] = timeRange

  // handles time range slider value change
  function handleChange(e: Event, val: number | number[], thumb: number) {
    if (!Array.isArray(val)) return
    if (val[1] - val[0] < minDistance) {
      if (thumb === 0) {
        const clamped = Math.min(val[0], maxValue - minDistance)
        setTimeRange([clamped, clamped + minDistance])
      } else {
        const clamped = Math.max(val[1], minDistance)
        setTimeRange([clamped - minDistance, clamped])
      }
    } else {
      setTimeRange(val)
    }
  }

  return (
    <div className={styles.container}>
      <p className={styles.timeRange}>
        {earliest % 12 || 12} <span>{earliest < 12 ? 'AM' : 'PM'}</span>
        {' – '}
        {latest % 12 || 12}{' '}
        <span>{latest < 12 || latest === 24 ? 'AM' : 'PM'}</span>
      </p>
      <Slider
        sx={{
          width: 336,
          height: 12,
          color: '#f93636',
          '& .MuiSlider-thumb': {
            transition: 'none',
            height: 24,
            width: 24,
            borderRadius: 0,
            '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
              boxShadow: 'inherit',
            },
            '&:before': {
              display: 'none',
            },
          },
          '& .MuiSlider-track': {
            transition: 'none',
          },
          '& .MuiSlider-rail': {
            color: 'transparent',
            opacity: 1,
            borderRadius: 0,
          },
          '& .MuiSlider-mark': {
            background: 'var(--light-gray)',
            width: 13,
            height: 12,
            transform: 'translate(-50%, -50%)',
            borderRadius: 0,
            '&.MuiSlider-markActive': {
              opacity: 0,
            },
          },
          '& .MuiSlider-markLabel': {
            fontFamily: 'DM Sans, sans-serif',
            fontSize: 12,
            marginTop: '4px',
            color: 'var(--secondary-text)',
            fontWeight: 500,
            '&.MuiSlider-markLabelActive': {
              color: 'var(--primary-text)',
            },
          },
        }}
        max={maxValue}
        value={timeRange}
        onChange={handleChange}
        valueLabelDisplay='off'
        disableSwap
        marks={marks}
      />
      <p>Arraste os horários inicial e final para a esquerda e direita.</p>
    </div>
  )
}
