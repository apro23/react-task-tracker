import { useState } from "react"
import { faker } from '@faker-js/faker'

const AddTask = ({ onAdd }) => {
    const [text, setText] = useState('')
    const [day, setDay] = useState('')
    const [reminder, setReminder] = useState(false)

    const onSubmit = (e) => {
        e.preventDefault()

        if(!text) {
            alert('Please add task')
            return
        }

        if(!day) {
            alert('Please add day')
            return
        }

        onAdd({
            id: faker.datatype.uuid(),
            text,
            day,
            reminder
        })

        setText('')
        setDay('')
        setReminder(false)
    }

  return (
    <form className='add-form' onSubmit={onSubmit} >
        <div className="form-control">
            <label>Task</label>
            <input type="text" name="" id="" placeholder="Task" value={text} onChange={(e) => setText(e.target.value)}/>
        </div>

        <div className="form-control">
            <label>Day & Time</label>
            <input type="text" name="" id="" placeholder="Day & Time" value={day} onChange={(e) => setDay(e.target.value)}/>
        </div>

        <div className="form-control form-control-check">
            <label>Set Reminder</label>
            <input type="checkbox" name="" id="" checked={reminder} value={reminder} onChange={(e) => setReminder(e.currentTarget.checked)}/>
        </div>

        <input className="btn btn-block" type="submit" value='SaveTask'/>

    </form>
  )
}

export default AddTask