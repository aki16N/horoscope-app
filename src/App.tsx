import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import MainForm from './component/MainForm'
import LoginForm from './component/LoginForm'

function App() {
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<MainForm />} />
                <Route path='/login' element={<LoginForm />} />
            </Routes>
        </BrowserRouter>

    )
}

export default App
