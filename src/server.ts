import { createApp } from "./app";
import { Env } from "./config/Env";
import { db } from "./config/db/db";
const app = createApp();

app.listen(Env.PORT, () => {
  console.log("Server running on port 5000");
});
