import { Slider } from '@ark-ui/react'
import './index.css'
export const MySlider = () => (
  <Slider.Root>
    <Slider.Label>Label</Slider.Label>
    <Slider.Control>
      <Slider.Track>
        <Slider.Range />
      </Slider.Track>
      <Slider.Thumb key={0} index={0} />
    </Slider.Control>
  </Slider.Root>
)
export default  MySlider