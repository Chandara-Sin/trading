import "dotenv/config";
import { main } from "./app";

const port = process.env.PORT ?? "8000";

const start = () => {
  const app = main();

  app.listen(port, () => {
    console.info(
      `Server start at http://localhost:${port}\nEnvironment: ${
        process.env.NODE_ENV ?? "local"
      }\nTime: ${new Date().toISOString()}`
    );
  });
};

start();
