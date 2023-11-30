
import MySlider from './components/Slider'

import MyMenu from './components/Menu'
import MyTabs from './components/Tabs'



import  Test from "./problem/awaitBindEvent"

import DemoTab from './compose/DemoTab'



function App() {
  return (
    <div className="App">
        <MySlider></MySlider>
        <MyMenu></MyMenu>
        <MyTabs></MyTabs>

        <div>
          <h1>测试</h1>
          <Test></Test>
          <DemoTab></DemoTab>
        </div>
    </div>
  );
}

export default App;