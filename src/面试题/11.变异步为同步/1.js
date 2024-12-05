// async function getuser(){
//     return await fetch('./1.json');
// }

// async function m1(){
//     const user = await getuser();
//     return user
// }

// async function m2(){
//     const user = await m1();
//     return user
// }

// async function m3(){
//     const user = await m2();
//     return user
// }

// async function main(){
//     const user = await m3();
//     console.log(user);
// }

//main();

//-----------------------------------------

 function getuser(){
    return  fetch('./1.json');
}

function m1(){
    const user =  getuser();
    return user
}

function m2(){
    const user = m1();
    return user
}

 function m3(){
    const user =  m2();
    return user
}

function main(){
    const user =  m3();
    console.log(user);
}


function run (func){
    // 1. 保存旧的fetch
    const oldFetch = window.fetch;
    // 2. 实现自己的fetch


    const cache={
        status:'pending',// 状态 pending, fulfilled, rejected
        value:null // 缓存的结果
    }
    function newFetch(url){
       if(cache.status=='fulfilled'){
            return cache.value  
       }else if(cache.status=='rejected'){
           throw cache.value
       }else{
           const p  = oldFetch(url).then(res=>{
               cache.status='fulfilled'
               cache.value=res
           }).catch(err=>{
               cache.status='rejected'
               cache.value=err
           })
           throw p
       }
    }
    window.fetch = newFetch
    // 3. 执行传入的函数

    try{
        func()
    }catch(err){
       if(err instanceof Promise){
           err.finally(()=>{
               window.fetch = newFetch
               func()
               window.fetch = oldFetch;
           })
       }
    }
    
     // 4. 还原fetch
     window.fetch = oldFetch;
}

run (main)