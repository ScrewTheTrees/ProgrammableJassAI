import { buildConfig, buildLogger } from "./Utils";

const fs = require("fs-extra");
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
    let sharedApi = "" + fs.readFileSync(".\\ProgrammableCampaignJassAISharedApi.j")

    let framework = "" + fs.readFileSync(".\\ProgrammableCampaignJassAIFramework.j");
    let aiFile = "" + fs.readFileSync(".\\ProgrammableCampaignJassAI.ai");

    function findSubstringByTag(source: string, startTag: string, endTag: string, debugNameSource: string = "MISSING") {
        let startIndex = source.indexOf(startTag);
        let endIndex = source.lastIndexOf(endTag);
        if (startIndex < 0 || endIndex < 0) {
            logger.error(debugNameSource + " is missing tags for indexing.");
            logger.error("startIndex: " + startIndex);
            logger.error("endIndex: " + endIndex);
            throw new Error(debugNameSource + " is missing tags for indexing.");
        }
        return source.substring(startIndex, endIndex);
    }

    function injectTagShitFromXIntoY(source: string, target: string, startTag: string, endTag: string,
        debugNameSource: string = "MISSING", targetNameSource: string = "MISSING") {

        let sourceSubstring = findSubstringByTag(source, startTag, endTag, debugNameSource);
        let targetSubstring = findSubstringByTag(target, startTag, endTag, targetNameSource);

        return targetSubstring.replace(targetSubstring, sourceSubstring)
    }
    framework = injectTagShitFromXIntoY(globals,
        framework,
        "//***StartSharedGlobals***",
        "//***EndSharedGlobals***",
        "ProgrammableCampaignJassAISharedGlobals.j",
        "ProgrammableCampaignJassAIFramework.j");

    framework = injectTagShitFromXIntoY(sharedApi,
        framework,
        "//***StartSharedApi***",
        "//***EndSharedApi***",
        "ProgrammableCampaignJassAISharedGlobals.j",
        "ProgrammableCampaignJassAIFramework.j");

    aiFile = injectTagShitFromXIntoY(globals,
        aiFile,
        "//***StartSharedGlobals***",
        "//***EndSharedGlobals***",
        "ProgrammableCampaignJassAISharedGlobals.j",
        "ProgrammableCampaignJassAI.ai");

    aiFile = injectTagShitFromXIntoY(sharedApi,
        aiFile,
        "//***StartSharedApi***",
        "//***EndSharedApi***",
        "ProgrammableCampaignJassAISharedGlobals.j",
        "ProgrammableCampaignJassAI.ai");


    fs.writeFileSync(".\\ProgrammableCampaignJassAIFramework.j", framework);
    fs.writeFileSync(".\\ProgrammableCampaignJassAI.ai", aiFile);


    if (!fs.existsSync(config.outputFolder)) fs.mkdirSync(config.outputFolder);

    fs.copySync(config.mapFolder, config.outputFolder);

    fs.copySync(".\\ProgrammableCampaignJassAI.ai", config.outputFolder + "\\war3mapImported\\ProgrammableCampaignJassAI.ai");
}
build();