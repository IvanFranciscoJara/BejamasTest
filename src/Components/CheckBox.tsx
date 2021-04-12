import React from 'react'
import './sass/CheckBox.sass'
import { IconCheck } from '../GlobalFiles/Icons'

interface Props {
  onChange?: any
  checked?: boolean
}

const CheckBox: React.FC<Props> = ({ checked, onChange }: Props) => {
  return (
    <div className={`ContainerCheckBox ${checked && 'checked'}`} onClick={onChange}>
      <IconCheck />
    </div>
  )
}
export default CheckBox
