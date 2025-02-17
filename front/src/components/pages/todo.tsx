import '../../styles/todo_page.scss'
import {Simulate} from "react-dom/test-utils";
import dragOver = Simulate.dragOver;
import resize = Simulate.resize;

export default function todo(){

    const task1  = {
        name: 'asd',
        description: 'qwezxczxcqweйцZZZZZZvvvvvVVVVV_ZoV_ZoV_ZoV_ZoV_ZoV_ZoV_ZoV_SVO_SVO_SVO_SVO_SVO_SVO_SVO_SVO_SVO_SVO_SVO_SVO_SVO_SVO',
        deadline: '22.10.2027'
    }

    function EisTask({ task }){
        return(
            <div className='eis_task'>
                <h3>{task?.name}</h3>
                <p>{task?.description}</p>
                <h4>{task?.deadline}</h4>
            </div>
        )
    }

    return(
        <div className='todo_page'>
            <div className='new_task'>
                <h1>New task</h1>
                <div className='titles'>
                    <div className='task_title'>
                        <h3>Name</h3>
                        <input type="text" name="" id=""/>
                    </div>
                    <div className='task_title'>
                        <h3>Description</h3>
                        {/*<input style={{height: '100px', textAlign: 'start'}}  type="text" name="" id=""/>*/}
                        <textarea style={{resize: 'none', height: '100px', padding: '7px'}} name="" id="" ></textarea>
                    </div>
                    <div className='task_title'>
                        <h3>Deadline</h3>
                        <input type="date" name="" id=""/>
                    </div>
                </div>
                <div className='switchers'>
                    <div>
                        <h3>Important?</h3>
                        <input type="checkbox" name="" id=""/>
                    </div>
                    <div>
                        <h3>Urgently?</h3>
                        <input type="checkbox" name="" id=""/>
                    </div>
                </div>
                <div className='add_task'>
                    <h2>Add new task</h2>
                </div>
            </div>

            <div className='todo_tasks'>
                <div className='todo_task' style={{'borderLeft': '15px solid var(--green)'}}>
                    <EisTask task={task1}/><EisTask/><EisTask/><EisTask/>
                </div>
                <div className='todo_task' style={{'borderLeft': '15px solid var(--yellow)'}}>

                </div>
                <div className='todo_task' style={{'borderLeft': '15px solid var(--orange)'}}>
                    <EisTask/><EisTask/><EisTask/>
                </div>
                <div className='todo_task' style={{'borderLeft': '15px solid var(--red)'}}>
                    <EisTask/><EisTask/><EisTask/><EisTask/><EisTask/><EisTask/><EisTask/><EisTask/><EisTask/><EisTask/>
                </div>
            </div>

            <div className='eis_div'>
                <div style={{backgroundColor: 'var(--green)'}}></div>
                <div style={{backgroundColor: 'var(--yellow)'}}></div>
                <div style={{backgroundColor: 'var(--orange)'}}></div>
                <div style={{backgroundColor: 'var(--red)'}}></div>
            </div>

        </div>
    )
}