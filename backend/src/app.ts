import { Server as ExpressServer } from "./infrastructure/http/express/server";

(async () => {
  main();
})();

function main() {
  ExpressServer.start();
}
