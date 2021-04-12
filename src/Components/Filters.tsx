import React, { useEffect, useState } from 'react'
import './sass/Filters.sass'
import CheckBox from './CheckBox'
import Button from './Button'
import { IconClose } from '../GlobalFiles/Icons'
import { useStore } from 'react-redux'
interface Props {
  filters?: any
  onClose?: any
  setNewFilters?: any
  open?: boolean
}

const capitalize = (s: any) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
}

const Filters: React.FC<Props> = ({ filters, onClose, setNewFilters, open }: Props) => {
  const [localFilters, setLocalFilters] = useState<any>({})

  useEffect(() => {
    setLocalFilters(filters)
  }, [open])

  const handleFilterCheck = (filter: string, index: number) => {
    if (filter === 'Category') {
      let newCategorys: any = [...localFilters.Category]
      newCategorys[index].checked = !newCategorys[index].checked
      setLocalFilters({ Category: newCategorys, PriceRange: localFilters.PriceRange })
    } else {
      let newPriceRange: any = [...localFilters.PriceRange]
      newPriceRange[index].checked = !newPriceRange[index].checked
      setLocalFilters({ Category: localFilters.Category, PriceRange: newPriceRange })
    }
  }
  console.log(filters)
  return (
    <div className={`ContainerFilters ${open ? 'show' : ''}`}>
      <div className="ContainerFilters__dark_Background" onClick={onClose}></div>
      <div className="ContainerFilters__content">
        <div className="close" onClick={onClose}>
          <IconClose />
        </div>
        <div className="filter lineBottom">
          <div className="filter_title">Category</div>
          <div className="filter_options">
            {localFilters.Category &&
              localFilters.Category.map((category: any, index: number) => (
                <div className="option" key={index}>
                  <CheckBox checked={category.checked} onChange={() => handleFilterCheck('Category', index)} />
                  <p>{capitalize(category.name)}</p>
                </div>
              ))}
          </div>
        </div>
        <div className="filter">
          <div className="filter_title">Price Range</div>
          <div className="filter_options">
            {localFilters.PriceRange &&
              localFilters.PriceRange.map((range: any, index: number) => (
                <div className="option" key={index}>
                  <CheckBox checked={range.checked} onChange={() => handleFilterCheck('PriceRange', index)} />
                  <p>{capitalize(range.name)}</p>
                </div>
              ))}
          </div>
        </div>
      </div>
      <div className="ContainerFilters__actions">
        <Button
          text="CLEAR"
          type="secondary"
          onClick={() => {
            setLocalFilters(filters)
          }}
        />
        <Button
          text="SAVE"
          onClick={() => {
            setNewFilters(localFilters)
            onClose()
          }}
        />
      </div>
    </div>
  )
}
export default Filters
