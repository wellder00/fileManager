import readline from "readline/promises";
import { exit, stdin, stdout } from "process";
import { getNameUser } from "./cliUtils.js";
import { greetTheUser } from "../controllers/userController.js";
import { showDirectory } from "../controllers/currentDirectory.js";
import { occurrence } from "../data/events.js";
import { takeLeaveOf } from "../services/userService.js";

export const stream = async () => {
  const rl = readline.createInterface({
    input: stdin,
    output: stdout,
  });

  try {
    greetTheUser(getNameUser());
    showDirectory();

    rl.on("line", (input) => {
      const trimmedInput = input.trim().toLowerCase();
      if (trimmedInput === ".exit") {
        takeLeaveOf(exit);
        return;
      }
      const eventLength = trimmedInput.split(" ").length;
      const args = trimmedInput.split(" ");
      const command = args[0];
      const eventHandler = occurrence[command];

      switch (eventLength) {
        case 1:
          if (command in occurrence) {
            eventHandler();
            showDirectory();
          }
          break;
        case 2:
          if (command in occurrence) {
            eventHandler(args[1]);
            showDirectory();
          }
          break;
        case 2:
          if (command in occurrence) {
            eventHandler(args[1], args[2]);
            showDirectory();
          }
          break;

        default:
          false;
          break;
      }
    });
    rl.on("SIGINT", () => {
      takeLeaveOf(exit);
    });
  } catch (error) {
    console.error("FS operation failed");
  }
};
