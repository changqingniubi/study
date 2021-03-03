const validatedUser = (target) =>
  new Proxy(target, {
    set(target, property, value) {
      switch (property) {
        case "email":
          const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          if (!regex.test(value)) {
            console.error("The user must have a valid email");
            return false;
          }
          break;
        case "age":
          if (value < 20 || value > 80) {
            console.error("A user's age must be between 20 and 80");
            return false;
          }
          break;
      }

      return Reflect.set(...arguments);
    },
  });

  let user = {
    email: "",
    age: 0,
  };
  
  user = validatedUser(user);
  user.email = "semlinker.com"; // The user must have a valid email
  user.age = 100; // A user's age must be between 20 and 80