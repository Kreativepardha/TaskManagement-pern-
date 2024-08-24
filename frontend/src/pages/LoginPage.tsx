import { LoginForm } from "../components/lg/LoginForm"
import { Quote } from "../components/lg/Quote"





export const LoginPage = () => {

    return (
        <div className="">
         <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="hidden lg:block">
                    <Quote />
                        </div>
                <div className="">
                        <LoginForm/>
                  </div>
            </div>
        </div>
    )
}