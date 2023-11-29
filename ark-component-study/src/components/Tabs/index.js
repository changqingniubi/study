import { Tabs } from '@ark-ui/react'
import { Button } from '@chakra-ui/react'

const MyTabs = () => (
  <Tabs.Root>
    <Tabs.List>
      <Tabs.Trigger value="react" asChild>
        <Button colorScheme='blue' variant="outline">React</Button>
      </Tabs.Trigger>
    </Tabs.List>
  </Tabs.Root>
)

export default MyTabs