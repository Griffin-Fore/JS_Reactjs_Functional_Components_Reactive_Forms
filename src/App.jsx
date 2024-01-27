import { useState } from 'react'

import './App.css'
// re-render is not the same as refresh. Refresh resets state, re-render allows state to carry over between renders
// When you set state and then console.log in a function, react doesn't re-render until the function is complete
// Because state needs to re-render to update the page

function App() {
  // list of users in state
  const [ users, setUsers ] = useState([])
  const [ firstName, setFirstName ] = useState("")
  const [ lastName, setLastName ] = useState("")
  const [ email, setEmail ] = useState("")
  const [ password, setPassword ]  = useState("")
  const [ confirmPassword, setConfirmPassword ] = useState("")
  const [ hasBeenSubmitted, setHasBeenSubmitted ] = useState(false)

  // validations states:
  const [ firstNameValid, setFirstNameValid ] = useState(true)
  const [ lastNameValid, setLastNameValid ] = useState(true)
  const [ emailValid, setEmailValid ] = useState(true)
  const [ passwordValid, setPasswordValid ] = useState(true)
  const [ confirmPasswordValid, setConfirmPasswordValid ] = useState(true)

  // All non-state variables get reset e3very re-render

  const allValid = firstNameValid &&
      lastNameValid &&
      emailValid &&
      passwordValid &&
      confirmPasswordValid
      // The variable will only be true if all the states are true

  // validations handlers:
  const handleFirstName = (e) => {
    setFirstName(e.target.value)
    if(e.target.value.length <= 2){
      setFirstNameValid(false)
    }
    else{
      setFirstNameValid(true)
    }
  }

  const handleLastName = (e) => {
    setLastName(e.target.value)
    if(e.target.value.length <= 2){
      setLastNameValid(false)
    }else{
      setLastNameValid(true)
    }
  }

  const handleEmail = (e) => {
    setEmail(e.target.value)
    if(e.target.value.length <= 8){
      setEmailValid(false)
    }else{
      setEmailValid(true)
    }
  }

// Set the confirmPassword check to run in both, so that the order of inputs between password and confirmPassword doesn't matter
  const handlePassword = (e) => {
    console.log("password: ", e.target.value)
    setPassword(e.target.value)
    // the console.log will always be one step behind because not rendered yet
    if(e.target.value.length <= 8){
      setPasswordValid(false)
    }else{
      setPasswordValid(true)
    }
    // check the password agaist the confirm password
    if(e.target.value !== confirmPassword){
      setConfirmPasswordValid(false)
    }else if(e.target.value === confirmPassword){
      setConfirmPasswordValid(true)
    }
  }

  const handleConfirmPassword = (e) => {
    console.log("OG password in handleConfirmPassword: ", password)
    console.log("confirmPassword: ", e.target.value)
    // Once the function completes, THEN the current e.target.value is assigned to confirmPassword
    // Since the setConfirmPassword is executed after the function runs, you need to compare to the value you have NOW
    setConfirmPassword(e.target.value)
    // check the current value against password
    if(e.target.value !== password){
      setConfirmPasswordValid(false)
    }else if(e.target.value === password){
      setConfirmPasswordValid(true)
    }
  }

  // create user function
  const addUser = (e) => {
    e.preventDefault();
    // console.logs the state information
    console.log("User: ", {firstName}, {lastName}, {email}, {password})
    // if all the variables are not null, because the button can be clicked when the form is empty due to the valids being set to null,
    // then it will add the state values to the list
    if(firstName != null &&
      lastName != null &&
      email != null &&
      password != null) {
        // spreads the users list and adds one to the end
        setUsers([...users, {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password}])
        // sets the value of hasBeenSubmitted to true
        setHasBeenSubmitted(true)
      }
    else{
      console.log("Invalid user input")
    }
    // sets the user attribute values to ("")
    setFirstName("")
    setLastName("")
    setEmail("")
    setPassword("")
    setConfirmPassword("")
    setHasBeenSubmitted(true)
    // reset the validations:
    setFirstNameValid(true)
    setLastNameValid(true)
    setEmailValid(true)
    setPasswordValid(true)
    setConfirmPasswordValid(true)
  }
  // this will execute very render, which includes every time an input is updated
  
  return (
    <>
      {/* conditional header message to display when usersubmitted = true */}
      {hasBeenSubmitted ? <h1>Thank you for submitting the form!</h1> : <h1>Welcome! Please submit the form!</h1>}
      {/* form */}
      <form onSubmit={addUser}>
        {/* first name */}
        <label>First Name:</label>
        <input onChange={handleFirstName} type="text" value={firstName} />
          {firstNameValid ? "" : <p>First name needs to be more than 2 characters</p>}
        <label>Last Name:</label>
        {/* last name */}
        <input onChange={handleLastName} type="text" value={lastName} />
          {lastNameValid ? "" : <p>Last name needs to be more than 2 characters</p>}
        <label>Email:</label>
        {/* email */}
        <input onChange={handleEmail} type="text" value={email} />
          { emailValid ? "" : <p>Email needs to be more than 8 characters</p> }
        <label>Password:</label>
        {/* password */}
        <input onChange={handlePassword} type="text" value={password}/>
          { passwordValid ? "" : <p>Password needs to be more than 8 characters</p>}
        <label>Confirm Password:</label>
        {/* confirm password */}
        <input onChange={handleConfirmPassword} type="text" value={confirmPassword}/>
          { confirmPasswordValid ? "" : <p>Confirm password does not match</p> }
        {/* create user button */}
        {/* if the validation that looks at all the validations is true, then the button will load */}
        { allValid ? <button>Submit</button> : "" }
      </form>

      {/* users list using map */}
      <h1>Users</h1>
      { users.map((user, index)=> (
        <div key={index}>
          <p>{user.firstName} {user.lastName} {user.email}</p>
        </div>
      ))}
    </>
  )
}

export default App