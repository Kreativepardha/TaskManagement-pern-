
import { Route, Routes } from 'react-router-dom'
import './App.css'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { TasksList } from './components/mdm/TasksList'
import { AppBar } from './components/mdm/AppBar'


function App() {

  return (
        <div>
          <AppBar />
          <Routes>
              <Route path='/login' element={<LoginPage />   }  />
              <Route path='/register' element={<RegisterPage />   }  />
              <Route path='/tasks' element={<TasksList />  } />
          </Routes>

        </div>

  )
}

export default App
