import { Link } from "react-router-dom"
export default function page404() {
    return <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '75%', flexDirection: 'column'}}>
        <h1  style={{color: 'var(--third-color)'}}>
            Cтраница не найдена
        </h1>
        <Link to='/about' style={{textDecoration: 'none', color: 'var(--third-color)'}}>На главную</Link>
    </div>
}