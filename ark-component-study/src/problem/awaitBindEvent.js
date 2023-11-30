import { useEffect} from 'react'
export const Test = () => {
   function getElement(ele){
    let dom=document.querySelector(ele)
    let proxy=new Proxy(dom,{
        get(target,key){
            if(!key.startsWith('await')){
              return Reflect.get(target,key)
            }
            const eventName=key.replace('await','').toLowerCase()
            return  new Promise((resolve,reject)=>{
                dom.addEventListener(eventName,resolve,{once:true})
            })
        }
    })
    return proxy
   }

   async function bindEvent() {
      let btn=getElement('#aaa')
      while(1){
          await btn.awaitClick;
          console.log('按钮被点击了')
      }
   }
  
  useEffect(()=>{
    bindEvent()
  },[])

  return (
    <div>
      <button id='aaa'>Trigger</button>
    </div>
    )
}
export default  Test


