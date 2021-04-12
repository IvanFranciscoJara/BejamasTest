import React, { useState, useEffect, useRef, useCallback } from 'react'
import './sass/Sorting.sass'
import { IconCheck, IconSorting, IconDown, IconUp } from '../GlobalFiles/Icons'

interface Props {
  onChange?: any
  current?: string
}

const CheckBox: React.FC<Props> = ({ current, onChange }: Props) => {
  const ref = useRef(null)
  const [open, setOpen] = useState(false)

  const PriceDown = (
    <div className="option">
      Price <IconDown />
    </div>
  )
  const PriceUp = (
    <div className="option">
      Price <IconUp />
    </div>
  )
  const AlphabeticalDown = (
    <div className="option">
      Alphab <IconDown />
    </div>
  )
  const AlphabeticalUp = (
    <div className="option">
      Alphab <IconUp />
    </div>
  )

  const [options] = useState<any>([
    { name: 'priceDown', component: PriceDown },
    { name: 'priceUp', component: PriceUp },
    { name: 'AlphabeticalDown', component: AlphabeticalDown },
    { name: 'AlphabeticalUp', component: AlphabeticalUp },
  ])

  const escListener = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setOpen(false)
    }
  }, [])

  const clickOutListener = useCallback(
    (e: MouseEvent) => {
      if (!(ref.current! as any).contains(e.target)) {
        setOpen(false)
      }
    },
    [ref.current],
  )

  useEffect(() => {
    if (open) {
      document.addEventListener('click', clickOutListener)
      document.addEventListener('keyup', escListener)
    }
    return () => {
      document.removeEventListener('click', clickOutListener)
      document.removeEventListener('keyup', escListener)
    }
  }, [open])

  const handleClick = (name: any) => {
    setOpen(false)
    onChange(name)
  }
  return (
    <div ref={ref} className="ContainerSorting" onClick={() => setOpen(!open)}>
      <div className="Description">
        <IconSorting /> Sort By
      </div>
      <div className="Current">{options.find((item: any) => item.name === current)?.component}</div>
      <div className={`Options ${open ? 'show' : ''}`}>
        {options.map((item: any, index: number) => (
          <div key={index} className="Options_item" onClick={() => handleClick(item.name)}>
            {item.component}
          </div>
        ))}
      </div>
    </div>
  )
}
export default CheckBox
