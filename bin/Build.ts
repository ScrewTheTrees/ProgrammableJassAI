import { buildConfig, buildLogger } from "./Utils";

import fs from "fs-extra";
const execFile = require("child_process").execFile;
const cwd = process.cwd();

const logger = buildLogger;
const config: any | undefined = buildConfig;

function build() {
    if (!config) {
        logger.error("No configuration file config.json")
        return;
    }

    let globals = "" + fs.readFileSync(".\\ProgrammableCampaignJassAISharedGlobals.j")
    let startIndex = globals.indexOf("//***StartGlobalInsert***");
    let endIndex = globals.lastIndexOf("//***EndGlobalInsert***");
    if (startIndex < 0 || endIndex < 0) {
        logger.error("ProgrammableCampaignJassAISharedGlobals is missing tags for indexing.");
        logger.error("startIndex: " + startIndex);
        logger.error("endIndex: " + endIndex);
    }
    globals = globals.substring(startIndex, endIndex);

    let framework = "" + fs.readFileSync(".\\ProgrammableCampaignJassAIFramework.j");
    let actualAi = "" + fs.readFileSync(".\\ProgrammableCampaignJassAI.ai");


    startIndex = framework.indexOf("//***StartGlobalInsert***");
    endIndex = framework.lastIndexOf("//***EndGlobalInsert***");

    if (!fs.existsSync(config.outputFolder)) fs.mkdirSync(config.outputFolder);


    fs.copySync(".\\ProgrammableCampaignJassAI.ai", config.outputFolder + "\\war3mapImported\\ProgrammableCampaignJassAI.ai");
}
build();