import './App.css'
import MySlider from './components/Slider'
import MyMenu from './components/Menu'
import MyTabs from './components/Tabs'
import MyAccordion from './components/Accordion'
import MyCheckbox from './components/Checkbox'
import MyCombobox from './components/Combobox'
import MyDatePicker from './components/DatePicker'



import  Test from "./problem/awaitBindEvent"
import DemoTab from './compose/DemoTab'

function App() {
  return (
    <div className="App">
         <h1>测试ark组件使用</h1>
         <div className='item'>
            <MySlider></MySlider>
         </div>
         <div className='item'>
            <MyMenu></MyMenu>
         </div>
         <div className='item'>
            <MyTabs></MyTabs>
         </div>
         <div className='item'>
            <MyAccordion></MyAccordion>
         </div>
         <div className='item'>
            <MyCheckbox></MyCheckbox>
         </div>
         <div className='item'>
            <MyCombobox></MyCombobox>
         </div>
         <div className='item'>
            <MyDatePicker></MyDatePicker>
         </div>
        
        
        

        
        <div>
          <h1>测试</h1>
          <h2>测试同步触发事件</h2>
          <Test></Test>
          <h2>测试组合模式封装的tab组件</h2>
          <DemoTab></DemoTab>
        </div>
    </div>

  );
}

export default App;