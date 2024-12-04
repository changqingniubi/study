let p = Promise.resolve().then(() => {
  console.log("then1");
  Promise.resolve().then(() => {
    console.log("then1-1");
  });
}).then(() => {
  console.log("then2");
});

p.then(() => {
  console.log("then3");
});

//1. then1
//2. then1-1
//3. then2
//4. then3