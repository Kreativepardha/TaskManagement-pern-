import React, { useState } from "react";
import useUserStore from "../../store/userStore";
import { InputBox } from "../sm/InputBox";
import axios from "axios";
import { BASE_URL } from "../../config/api";
import { Button } from "../sm/Button";
import { FromError } from "../../types/user";



 

 export const RegisterForm: React.FC = () => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [errors, setErrors] = useState<FromError>({})
    const setUser = useUserStore((state) => state.setUser)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setErrors({})

        try {
                const response = await axios.post(`${BASE_URL}/user/login`, { email, password })
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
         <div className="capitalize h-screen flex justify-center items-center bg-sky-200  ">
            <form  onSubmit={handleSubmit} className="flex flex-col bg-slate-200 p-12 gap-4 rounded-lg shadow-lg">
               <InputBox 
                  label="email"
                  type="email"
                  placeholder="enter your email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={errors.email}
                  // required
               />
               <InputBox 
                  label="password"
                  type="password"
                  placeholder="enter your password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={errors.password}
                  // required
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