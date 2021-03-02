const enhancedObject = (target) =>{
  let value = null;
  function searchFor(property, target) {
    for (const key of Object.keys(target)) {
      if (typeof target[key] === "object") {
        searchFor(property, target[key]);
      } else if (typeof target[property] !== "undefined") {
        value = target[property];
        break;
      }
    }
    return value;
  }
  return new Proxy(target, {
    get(target, property) {
      if (property in target) {
        return target[property];
      } else {
        return searchFor(property, target);
      }
    },
  });
}
const data = enhancedObject({
  user: {
    name: "阿宝哥",
    settings: {
      theme: "dark",
    },
  },
});

console.log(data.user.settings.theme); // dark
console.log(data.theme); // dark