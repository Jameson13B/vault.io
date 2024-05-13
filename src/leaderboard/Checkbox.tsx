import { useState } from 'react'
import './checkbox.css'

export const Checkbox = (props: {
  id: number
  onSelect: (id: number, remove: boolean) => void
}) => {
  const [checked, setChecked] = useState(false)

  return (
    <span className="checkbox">
      <input
        type="checkbox"
        id={'checkbox ' + props.id}
        checked={checked}
        onChange={() => {
          props.onSelect(props.id, checked)

          setChecked(!checked)
        }}
      />
    </span>
  )
}
