import Tabs from './Tab';
const Tab = () => {
  const data = [
    { title: "Tab 1", content: "Content for Tab 1" },
    { title: "Tab 2", content: "Content for Tab 2" },
  ];

  return (
    <Tabs>
      <Tabs.TabList>
        {data.map((item) => (
          <Tabs.Tab key={item.title}>{item.title}</Tabs.Tab>
        ))}
      </Tabs.TabList>
      <Tabs.TabPanels>
        {data.map((item) => (
          <Tabs.Panel key={item.title}>
            <p>{item.content}</p>
          </Tabs.Panel>
        ))}
      </Tabs.TabPanels>
    </Tabs>
  );
};
export default Tab;