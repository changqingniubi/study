 ## 1.参考文章
  [参考文章](https://blog.csdn.net/qq_65665724/article/details/141639900)

## 2.注意点
  - 使用 weakmap 存储克隆对象，避免循环引用导致内存泄漏
  - 属性名为 symbol的属性 和 不可枚举属性 ,我们需要用 Reflect.ownKeys 相当于  Object.getOwnPropertyNames    Object.getOwnPropertySymbols 

### 1.Reflect.ownKeys
    它用于获取一个对象自身所有的键（包括常规属性键和符号属性键），返回一个由给定对象的自身可枚举和不可枚举属性的键名组成的数组，它能够同时获取对象的字符串键和符号键，这是它与Object.getOwnPropertyNames和Object.getOwnPropertySymbols的一个主要区别。例如，对于一个对象obj = {a: 1, [Symbol('b')]: 2}，Reflect.ownKeys(obj)会返回['a', Symbol(b)]，既包括了字符串键'a'，也包括了符号键Symbol(b)。
### 2.Object.getOwnPropertyNames
    它用于获取一个对象自身的所有属性（不包括 Symbol 属性），返回一个由给定对象的所有可枚举的自身属性的属性名（字符串形式）组成的数组。例如，对于一个对象obj = {a: 1, b: 2, [Symbol('c')]: 3}，Object.getOwnPropertyNames(obj)会返回['a', 'b']，即只包括了字符串键'a'和'b'。
### 3.Object.getOwnPropertySymbols
    它用于获取一个对象自身的所有 Symbol 属性，返回一个由给定对象的所有 Symbol 属性的键名组成的数组。例如，对于一个对象obj = {a: 1, b: 2, [Symbol('c')]: 3}，Object.getOwnPropertySymbols(obj)会返回[Symbol(c)]，即只包括了符号键Symbol(c)。 
### 4.Object.getOwnPropertyDescriptor
    这个方法返回一个对象，对象的每个属性名对应原对象data的一个自身属性（不包括继承的属性），属性值是该属性的描述对象。
### 5.Object.getPrototypeOf(data)
    这个方法返回data对象的原型。

## 创建新对象  Object.create(proto, propertiesObject)
Object.create方法根据传入的原型和属性描述对象创建一个新对象
