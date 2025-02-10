const express = require('express');
const personRoutes = require('./routes/person.routes');
const eisenhowerRoutes = require('./routes/eisenhower_item.routes');

const PORT = process.env.PORT || 8080

const app = express()

app.use(express.json())
app.use('/api', personRoutes);
app.use('/api', eisenhowerRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
