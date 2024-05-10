import { useState } from 'react'
import './checkbox.css'

export const Checkbox = (props: {
  name: string
  onSelect: (name: string, remove: boolean) => void
}) => {
  const [checked, setChecked] = useState(false)

  return (
    <span className="checkbox">
      <input
        type="checkbox"
        id={'checkbox ' + props.name}
        checked={checked}
        onChange={() => {
          props.onSelect(props.name, checked)

          setChecked(!checked)
        }}
      />
    </span>
  )
}
