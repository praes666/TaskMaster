const express = require('express');
const cors = require('cors');
const personRoutes = require('./routes/person.routes');
const eisenhowerRoutes = require('./routes/eisenhower_item.routes');
const kanbanBoardRoutes = require('./routes/kanban_board.routes');
const kanbanStateRoutes = require('./routes/kanban_state.routes');
const kanbanTaskRoutes = require('./routes/kanban_task.routes');
const kanbanPersonAdmissionRoutes = require('./routes/kanban_person_admission.routes');
const prettyTablesRoutes = require('./routes/pretty_tables.routes');

const PORT = process.env.PORT || 8080

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api', personRoutes);
app.use('/api', eisenhowerRoutes);
app.use('/api', kanbanBoardRoutes);
app.use('/api', kanbanStateRoutes);
app.use('/api', kanbanTaskRoutes);
app.use('/api', kanbanPersonAdmissionRoutes);
app.use('/api', prettyTablesRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
