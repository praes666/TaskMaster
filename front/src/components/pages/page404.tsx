import { Link } from "react-router-dom"
export default function page404() {
    return <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '75%', flexDirection: 'column'}}>
        <h1>
            Cтраница не найдена
        </h1>
        <Link to='/about' style={{textDecoration: 'none', color: '#000'}}>На главную</Link>
    </div>
}