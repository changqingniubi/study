import { Tabs } from '@ark-ui/react'
import { Button } from '@chakra-ui/react'
import { useState } from 'react'
const MyTabs = () => {
  const [value, setValue] = useState('react')
  
  return (
    <Tabs.Root 
      lazyMount
      defaultValue="react"
      value={value}
      onValueChange={(e) => setValue(e.value)}
    >
        <Tabs.List>
          <Tabs.Trigger value="react" asChild>
            <Button colorScheme='blue' variant="outline">React</Button>
          </Tabs.Trigger>
          <Tabs.Trigger value="vue">Vue</Tabs.Trigger>
          <Tabs.Trigger disabled value="solid">Solid</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="react">React Content</Tabs.Content>
        <Tabs.Content value="vue">Vue Content</Tabs.Content>
        <Tabs.Content value="solid">Solid Content</Tabs.Content>
    </Tabs.Root>
  )
}
  

export default MyTabs