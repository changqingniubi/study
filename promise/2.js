let p = Promise.resolve();

p.then(() => {
  console.log("then1");
  Promise.resolve().then(() => {
    console.log("then1-1");
  });
}).then(() => {
  console.log("then1-2");
});

p.then(() => {
  console.log("then2");
}); 

//1. then1
//2. then2
//3. then1-1
//4. then1-2
