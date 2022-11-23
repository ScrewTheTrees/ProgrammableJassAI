import { buildConfig, buildLogger } from "./Utils";

const execFile = require("child_process").execFile;
const cwd = process.cwd();

const logger = buildLogger;
const config: any | undefined = buildConfig;

const filename = `${cwd}\\target.w3x`;


function run() {
    if (!config) {
        logger.error("No configuration file config.json")
        return;
    }
    const args = config.launchArgs || [];
    execFile(config.gameExecutable, ["-loadfile", filename, ...args]);
}
run();