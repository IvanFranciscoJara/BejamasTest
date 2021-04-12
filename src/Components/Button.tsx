import React from 'react'
import './sass/Button.sass'

interface Props {
  text?: string
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
  loading?: boolean
  type?: 'primary' | 'secondary'
}

const Button: React.FC<Props> = ({ text, onClick, loading, type }: Props) => {
  return (
    <button className={`ButtonContainer ${type}`} onClick={onClick} type="button">
      {text}
    </button>
  )
}
export default Button
