import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import '../../styles/todo_page.scss'

export default function todo(){

    const task1  = {
        name: 'asd',
        description: 'qwezxczxcqweйцZZZZZZvvvvvVVVVV_ZoV_ZoV_ZoV_ZoV_ZoV_ZoV_ZoV_SVO_SVO_SVO_SVO_SVO_SVO_SVO_SVO_SVO_SVO_SVO_SVO_SVO_SVO',
        deadline: '22.10.2027'
    }

    interface Task {
        name: string,
        description: string,
        deadline: string
    }

    function EisTask({ task }: {task: Task} | any){
        return(
            <div className='eis_task'>
                <div className='task_left'>
                    <h3>{task?.name}</h3>
                </div>
                <div className='task_center'>
                    <p>{task?.description}</p>
                </div>
                <div className='task_right'>
                    <h4>{task?.deadline}</h4>
                    <IoIosCheckmarkCircleOutline className='done_checkmark'/>
                </div>
            </div>
        )
    }

    return(
        <div className='todo_page'>
            <div className="container-row">

                <div className='new_task'>
                    <h1>New task</h1>
                    <div className='titles'>
                        <div className='task_title'>
                            <h3>Name your task</h3>
                            <input type="text" name="" id=""/>
                        </div>
                    <div className='switchers'>
                        <div>
                            <h3>It's important?</h3>
                            <input type="checkbox" name="" id=""/>
                        </div>
                        <div>
                            <h3>It's urgent?</h3>
                            <input type="checkbox" name="" id=""/>
                        </div>
                    </div>
                        <div className='task_title'>
                            <h3>Describe it</h3>
                            <textarea style={{resize: 'none', minHeight: '120px'}} name="" id=""></textarea>
                        </div>
                        <div className='task_title'>
                            <h3>Set a deadline</h3>
                            <input type="date" name="" id=""/>
                        </div>
                    </div>
                    <div className='add_task'>
                        <h2>Add new task</h2>
                    </div>
                </div>

                <div className="eis-matrix-container">
                    <div className='eis_div'>
                        <div></div>
                        <div className='eis_side_text'>
                            <h2>Urgent</h2>
                        </div>
                        <div className='eis_side_text'>
                            <h2>Not urgent</h2>
                        </div>
                        <div className='eis_side_text'>
                            <h2  style={{transform: 'rotate(270deg)'}}>Important</h2>
                        </div>
                        <div className="eis-cell" style={{borderColor: 'var(--green)'}}>
                            <h1>Do</h1>
                        </div>
                        <div className="eis-cell" style={{borderColor: 'var(--yellow)'}}>
                            <h1>Decide</h1>
                        </div>
                        <div className='eis_side_text'>
                            <h2  style={{transform: 'rotate(270deg)'}}>Not Important</h2>
                        </div>
                        <div className="eis-cell" style={{borderColor: 'var(--orange)'}}>
                            <h1>Deligate</h1>
                        </div>
                        <div className="eis-cell" style={{borderColor: 'var(--red)'}}>
                            <h1>Delete</h1>
                        </div>
                    </div>
                </div>
            </div>  

                <div className='todo_tasks'>
                    <div className='todo_task' style={{'borderLeft': '15px solid var(--green)'}}>
                        <EisTask task={task1}/><EisTask/><EisTask/><EisTask/>
                    </div>
                    <div className='todo_task' style={{'borderLeft': '15px solid var(--yellow)'}}>
                        <EisTask/><EisTask/>
                    </div>
                    <div className='todo_task' style={{'borderLeft': '15px solid var(--orange)'}}>
                        <EisTask/><EisTask/><EisTask/>
                    </div>
                    <div className='todo_task' style={{'borderLeft': '15px solid var(--red)'}}>
                        <EisTask/><EisTask/><EisTask/><EisTask/>
                    </div>
                </div>
        </div>
    )
}