// func方法接收一个很复杂的config
function func(config) {
  var defaultConfig = {
    name: 'hong',
    color: 'red',
    // ......
  };
  
  // 为了将用户的配置适配到标准配置，我们直接循环defaultConfig
  // 如果用户传入了配置，就用用户的，如果没传就用默认的
  for(var item in defaultConfig) {
    defaultConfig[item] = config[item] || defaultConfig[item];
  }
}