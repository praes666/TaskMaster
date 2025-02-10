import { IoSunnyOutline, IoMoonOutline } from "react-icons/io5";
import {useState, useEffect} from "react";

export default function ThemeButton() {
    const [theme, setTheme] = useState<string | null>(document.body.getAttribute("data-theme"));

    const switchTheme = () => {
        if (theme === 'dark') {
            setTheme('light')
            localStorage.setItem('theme', 'light')
        }
        else {
            setTheme('dark')
            localStorage.setItem('theme', 'dark')
        }
    }

    useEffect(() => {
        if(localStorage.getItem('theme') !== null) {
            document.body.setAttribute('data-theme', localStorage.getItem('theme') || '')
            setTheme(localStorage.getItem('theme'))
        }
    },[theme])

    return (
        <div>
            {
                theme === "dark" ?
                    <IoSunnyOutline style={{color: 'var(--third-color)'}} className="theme-switch" onClick={switchTheme}/>
                    :
                    <IoMoonOutline style={{color: 'var(--third-color)'}} className="theme-switch" onClick={switchTheme}/>
            }
        </div>
)
}
