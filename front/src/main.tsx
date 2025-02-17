import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route, Outlet } from 'react-router-dom'

import Page404 from "./components/pages/page404.tsx";
import Auth from './components/pages/auth.tsx'

import Header from "./components/components/header.tsx";
import About from "./components/pages/about.tsx";
import Todo from "./components/pages/todo.tsx";
import Kanban from "./components/pages/kanban.tsx";

import './styles/index.scss'

const Layout = () => {
    return (
        <div className="app">
            <Header/>
            <Outlet/>
        </div>
    )
}

createRoot(document.getElementById('root')!).render(
    <Router>
        <StrictMode>
            <Routes>
                <Route element={<Layout/>}>
                    <Route path='/about' element={<About/>}/>
                    <Route path='/todo' element={<Todo/>}/>
                    <Route path='/kanban' element={<Kanban/>}/>
                </Route>
                <Route path='/auth' element={<Auth/>}/>
                <Route path='*' element={<Page404/>}/>
            </Routes>
        </StrictMode>
    </Router>
)
