import '../../styles/customAlert.scss'
export default function CustomAlert({ message }: { message: string }) {
    const Alert = () => {
        return (
            <div className='alert'>
                <h1>{message}</h1>
            </div>
        )
    }

    const alrt = document.createElement('div')

}

// сделать через невидимый div, и просто пихать в него алерты