import { Server as ExpressServer } from "./infrastructure/http/express";

(async () => {
  main();
})();

function main() {
  ExpressServer.start();
}
