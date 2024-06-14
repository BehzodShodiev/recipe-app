const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const recipesRouter = require('./routes/recipes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/recipes', recipesRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
export default app