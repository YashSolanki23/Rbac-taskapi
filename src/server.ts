import { createApp } from "./app";
import { Env } from "./config/Env";

const app = createApp();
const port=Env.PORT
app.listen(port,()=>{
  console.log(`server running on port ${port}`);
});
