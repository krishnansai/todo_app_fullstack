const express = require('express');
const cors = require('cors');
const { TodoRouter } = require('./routers/todos');
const { initPool } = require('./utils/db');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', TodoRouter);

const PORT = process.env.PORT || 8080;

(async () => {
  try {
    await initPool();
    app.listen(PORT, () => {
      console.log(`✅ Server listening on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to initialize database:", err);
    process.exit(1);
  }
})();
