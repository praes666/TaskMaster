import '../../styles/auth_login.scss'

export default function login(){
    return(
        <div className="loginbackgroud">
            <h1>Login to *proj*</h1>
            <div className="lofinField">
                <div className='inputField'>
                    <p>Username</p>
                    <input type="text" />
                </div>
                <div className='inputField'>
                    <div>
                        <p>Password</p>
                        <a href=""><p>Forgot?</p></a>
                    </div>
                    <input type="text" />
                </div>
                <div className='regButton'>
                    <p>Sign in</p>
                </div>
                    <a href=""><p>First time? Register now</p></a>
            </div>
        </div>
    )
}