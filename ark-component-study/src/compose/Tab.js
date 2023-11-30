

import React,{createContext, useContext,useState,useCallback,useMemo} from'react';

const TabsContext = createContext({});

function useTabsContext() {
  const context = useContext(TabsContext);
  if (!context) throw new Error(`Tabs components cannot be rendered outside the TabsProvider`);
  return context;
}

const TabList = ({ children }) => {
  const { onChange } = useTabsContext();

  const tabList = React.Children.map(children, (child, index) => {
    if (!React.isValidElement(child)) return null;
    return React.cloneElement(child, {
      onClick: () => onChange(index),
    });
  });

  return <div className="tab-list-container">{tabList}</div>;
};

const Tab = ({ children, onClick }) => (
  <div className="tab" onClick={onClick}>
    {children}
  </div>
);

const TabPanels = ({ children }) => {
  const { activeTab } = useTabsContext();

  const tabPanels = React.Children.map(children, (child, index) => {
    if (!React.isValidElement(child)) return null;
    return activeTab === index ? child : null;
  });

  return <div className="tab-panels">{tabPanels}</div>;
};

const Panel = ({ children }) => (
  <div className="tab-panel-container">{children}</div>
);

const Tabs = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0);

  const onChange = useCallback((tabIndex) => setActiveTab(tabIndex), []);
  const value = useMemo(() => ({ activeTab, onChange }), [activeTab, onChange]);

  return (
    <TabsContext.Provider value={value}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
};

Tabs.TabList = TabList;
Tabs.Tab = Tab;
Tabs.TabPanels = TabPanels;
Tabs.Panel = Panel;
export default Tabs;
