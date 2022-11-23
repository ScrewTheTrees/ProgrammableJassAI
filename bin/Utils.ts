import * as fs from "fs-extra";
import * as path from "path";
import { createLogger, format, transports } from "winston";
const { combine, timestamp, printf} = format;

const loggerFormatFunc = printf(({ level, message, timestamp }) => {
    return `[${timestamp.replace("T", " ").split(".")[0]}] ${level}: ${message}`;
});

export const buildLogger = createLogger({
    transports: [
        new transports.Console({
            format: combine(
                format.colorize(),
                timestamp(),
                loggerFormatFunc
            ),
        }),
        new transports.File({
            filename: "project.log",
            format: combine(
                timestamp(),
                loggerFormatFunc
            ),
        }),
    ]
});



// Parse configuration
export let buildConfig: {
    gameExecutable: string,
    mapFolder: string,
    outputFolder: string,
    launchArgs?: string[],
} | undefined = loadJsonFile("config.json");

if (!buildConfig) {
    buildLogger.error("Failed to load config.json, or empty file.");
} else {
    if (!buildConfig.gameExecutable) buildLogger.error("config.json->gameExecutable missing.");
    if (!buildConfig.mapFolder) buildLogger.error("config.json->mapFolder missing.");
    if (!buildConfig.outputFolder) buildLogger.error("config.json->outputFolder missing.");
}



export function loadJsonFile<G>(fname: string): G | undefined {
    try {
        return JSON.parse(fs.readFileSync(fname).toString());
    } catch (e) {
        buildLogger.error("Could not find file: " + fname);
        return undefined;
    }
}

export function copyFolder(startPath: string, endPath: string) {
    // To copy a folder or file
    if (!fs.existsSync(startPath)) return;
    fs.copySync(startPath, endPath);
}

export function getFilesInsideDir(startPath: string, filter: string): string[] {
    if (!fs.existsSync(startPath)) {
        buildLogger.log("Cannot find directory: ", startPath);
        return [];
    }
    let retvar: string[] = [];
    let files = fs.readdirSync(startPath);
    for (var i = 0; i < files.length; i++) {
        var filename = path.join(startPath, files[i]);
        var stat = fs.lstatSync(filename);
        if (stat.isDirectory()) {
            retvar.push(...getFilesInsideDir(filename, filter)); //recurse
        } else if (filename.indexOf(filter) >= 0) {
            retvar.push(filename);
        }
    }
    return retvar;
}
