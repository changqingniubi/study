import { Checkbox } from '@ark-ui/react'
import { useState } from 'react'
const MyCheckbox = () => {
  const [checked, setChecked] = useState(false)
  return (
    <Checkbox.Root defaultChecked checked={checked} onCheckedChange={(e) => setChecked(e.checked)}>
      {(api) => (
        <>
          <Checkbox.Label>Checkbox{api.isChecked?'选择了':'未选择'}</Checkbox.Label>
          <Checkbox.Control>
            {api.isChecked && <span>✓</span>}
            {!api.isChecked && <span>X</span>}
            {api.isIndeterminate && <span>-</span>}
          </Checkbox.Control>
          <Checkbox.Indicator>Indicator</Checkbox.Indicator>
        </>
      )}
    </Checkbox.Root>
  )
}
  

export default MyCheckbox