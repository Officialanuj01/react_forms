import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const initialValue = {firstname: "", lastname: "", email: "", phonenumber: ""}
  
  const [formvalues, setFormValues] = useState(initialValue)
  const [formErrors, setFormErrors] = useState({})
  const [isRegistered, setIsRegistered] = useState(false)

  function handleChange(e){
    const {name,value} = e.target;
    setFormValues({...formvalues, [name]:value});


  }

  function handleSubmit(e){
    e.preventDefault()
    setFormErrors(validate(formvalues))
    setIsRegistered(true)

  }

  useEffect(()=>{
    if(Object.keys(formErrors).length ===0 && isRegistered){
      setFormValues(initialValue)
      setIsRegistered(false)

    }
  },[formErrors, isRegistered])

  function validate(values){
    const errors = {}
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const regex2 = /^\d{10}$/

    if(!values.firstname){
      errors.firstname = "firstname is requried" 
    }
    if(!values.lastname){
      errors.lastname = "lastname is requried" 
    }
    if(!values.email){
      errors.email = "email is requried" 
    } else if(!regex.test(values.email)){
      errors.email = "email formet is not correct" 

    }

    if(!values.phonenumber){
      errors.phonenumber = "phone Number is requried" 
    } else if(!regex2.test(values.phonenumber)){
      errors.phonenumber = "formet is wrong"

    }

    return errors

  }

  return (
    <>
      <form id='form'>
        
        <div>
          <p>{(Object.keys(formErrors).length ===0 && isRegistered)?"Registration Succesful" : ""}</p>
          <input type="text" value={formvalues.firstname} onChange={handleChange} placeholder='First Name' className='inputField' name="firstname"/>
          <p className='errors'>{formErrors.firstname}</p>
        </div>
        <div>
          <input type="text" value={formvalues.lastname} onChange={handleChange}  placeholder='Last Name' className='inputField' name="lastname"/>
          <p className='errors'>{formErrors.lastname}</p>
        </div>
        <div>
          <input type="text" value={formvalues.email} onChange={handleChange} placeholder='Email' className='inputField' name="email"/>
          <p className='errors'>{formErrors.email}</p>
        </div>
        <div>
          <input type="text" value={formvalues.phonenumber} onChange={handleChange} placeholder='Phone Number' className='inputField' name="phonenumber"/>
          <p className='errors'>{formErrors.phonenumber}</p>
        </div>
        <button onClick={handleSubmit} id='resisteredBTN'>Register</button>

      </form>
      
    </>
  )
}

export default App
