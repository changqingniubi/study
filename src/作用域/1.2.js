// TDZ starts at beginning of scope
const func = () => console.log(letVar); // OK

// Within the TDZ letVar access throws `ReferenceError`

let letVar = 3; // End of TDZ (for letVar)
func(); // Called outside TDZ!