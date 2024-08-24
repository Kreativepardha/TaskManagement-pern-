import React, { useState } from "react";
import useUserStore from "../../store/userStore";
import { InputBox } from "../sm/InputBox";
import axios from "axios";
import { BASE_URL } from "../../config/api";
import { Button } from "../sm/Button";
import { FromError } from "../../types/user";



 

 export const RegisterForm: React.FC = () => {
     const [name,setName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [errors, setErrors] = useState<FromError>({})
    const setUser = useUserStore((state) => state.setUser)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setErrors({})

        try {
                const response = await axios.post(`${BASE_URL}/user/register`, { name, email, password })
                console.log(`Response is ${response}`)
                const user = response.data
                console.log(`Data is ${user}`)
                setUser(user);
                alert('registration successfull')
        } catch (err) {
            if(axios.isAxiosError(err)) {
                if(err.response?.status === 422){
                    const serverErrors = err.response.data.errors;
                    setErrors(serverErrors)
                } else {
                    setErrors({ general: 'Registration Failed. Pleaase try again' })
                }
            } else {
                setErrors({ general: 'An unexpected error has occured. Please try again' })
            }
        }
    }



      return (
         <div className="capitalize">
            <form  onSubmit={handleSubmit}>
                
            <InputBox 
                  label="name"
                  type="name"
                  placeholder="enter your name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  error={errors.name}
                //   required
               />
               <InputBox 
                  label="email"
                  type="email"
                  placeholder="enter your email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={errors.email}
                //   required
               />
               <InputBox 
                  label="password"
                  type="password"
                  placeholder="enter your password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={errors.password}
                //   required
               />
                {
                    errors.general && <p className="text-red-500">{errors.general}</p>
                }
               <Button text='submit' type="submit" onClick={() => {}}>
               </Button>
            </form>
         </div>
      )
 }