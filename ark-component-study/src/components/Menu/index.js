import { Menu,Portal} from '@ark-ui/react'
import { useState } from 'react'
export const MyMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)}>Trigger from the outside</button>
      <Menu.Root  open={isOpen} onSelect={(id) => console.log(id)}>
        <Menu.Trigger asChild>
          <button>Open Menu</button>
        </Menu.Trigger>
        <Menu.Positioner>
          <Menu.Content>
            <Menu.ItemGroup id="group-1">
              <Menu.ItemGroupLabel htmlFor="group-1">Group 1</Menu.ItemGroupLabel>
              <Menu.Item id="share">Share...</Menu.Item>
              <Menu.Item id="move">Move...</Menu.Item>
            </Menu.ItemGroup>
            <Menu.Separator />
            <Menu.Item id="search">Search</Menu.Item>
            <Menu.Item id="undo">Undo</Menu.Item>
            <Menu.Item id="delivery" disabled>
              Delivery
            </Menu.Item>
            <Menu.Item id="unlink">Unlink</Menu.Item>
            <Menu>
              <Menu.TriggerItem>Share &gt;</Menu.TriggerItem>
              <Portal>
                <Menu.Positioner>
                  <Menu.Content>
                    <Menu.Item id="twitter">Twitter</Menu.Item>
                    <Menu.Item id="message">Message</Menu.Item>
                  </Menu.Content>
                </Menu.Positioner>
              </Portal>
            </Menu>
          </Menu.Content>
        </Menu.Positioner>
      </Menu.Root>
    </>
    )
}
export default  MyMenu


