import { Accordion } from '@ark-ui/react'
import { ChevronDownIcon } from 'lucide-react'

const MyAccordion = () => {
  return (
    <Accordion.Root defaultValue={['React']} collapsible multiple>
      {['React', 'Solid', 'Vue'].map((item, id) => (
        <Accordion.Item key={id} value={item}>
          <Accordion.ItemTrigger>
            What is {item}?
            <Accordion.ItemIndicator>
              <ChevronDownIcon />
            </Accordion.ItemIndicator>
          </Accordion.ItemTrigger>
          <Accordion.ItemContent>
            {item} is a JavaScript library for building user interfaces.
          </Accordion.ItemContent>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  )
}
export default MyAccordion