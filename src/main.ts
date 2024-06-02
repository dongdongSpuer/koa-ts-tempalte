import app from "./app/app";
import config from "./config/config.default";
const { server } = config;

app.listen(server.port, () => {
  console.log(`Server is running on port http://${server.host}:${server.port}`);
});
