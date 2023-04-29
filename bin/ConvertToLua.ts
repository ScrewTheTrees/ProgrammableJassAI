import { buildLogger } from "./Utils";

const logger = buildLogger;

export function ConvertToLua(jasscode: string): string {

    logger.warn("_________________");
    logger.warn("replaceFunctionDefinitions");
    jasscode = replaceFunctionDefinitions(jasscode);
    logger.warn("_________________");
    logger.warn("replaceCallDefinitions");
    jasscode = replaceCallDefinitions(jasscode);
    logger.warn("_________________");
    logger.warn("replaceGlobalsDefinitions");
    jasscode = replaceGlobalsDefinitions(jasscode);
    logger.warn("_________________");

    jasscode = jasscode.replaceAll("endfunction", "end")
    jasscode = jasscode.replaceAll("endif", "end")
    jasscode = jasscode.replaceAll("//", "--");

    return jasscode;
}







function replaceGlobalsDefinitions(jasscode: string) {
    let globalsBlock = jasscode.match(/globals([\s\S\n]+)endglobals/m);
    let fullString = globalsBlock[0];
    let body = globalsBlock[1];

    const globals = body.matchAll(/^ +([A-Za-z0-9\_]+) ([A-Za-z0-9\_]+)[\s*]=\s([\S]*)/gm);
    for (let entry of globals) {
        let full = entry[0];
        let name = entry[2];
        let value = entry[3];

        body = body.replace(full, `${name} = ${value}`);

        logger.info(`----`);
        logger.info(full);
        logger.info(`${name} = ${value}`);
    }
    body = body.replace(/^[ ]+(.+)$/gm, "$1");
    jasscode = jasscode.replace(fullString, body);
    return jasscode;
}

function replaceCallDefinitions(jasscode: string) {
    let callDeclarations = jasscode.matchAll(/call ([a-zA-Z0-9\_\(]+)/gm);
    for (let line of callDeclarations) {
        let original = line[0];
        let functionName = line[1];

        jasscode = jasscode.replace(original, functionName);

        logger.info(`----`);
        logger.info(original);
        logger.info(functionName);
    }
    return jasscode;
}

function replaceFunctionDefinitions(jasscode: string) {
    let functionDeclarations = jasscode.matchAll(/function ([a-zA-Z0-9\_]+) takes ([a-zA-Z0-9\_, ]+) returns ([a-zA-Z0-9\_]+)/gm);

    for (let line of functionDeclarations) {
        let original = line[0];
        let name = line[1];
        let args = line[2];

        let newFunctionDeclaration = `function ${name}(`;
        if (args != "nothing") {
            let functionArgs = args.matchAll(/([A-Za-z0-9\_]+) ([A-Za-z0-9\_]+)/gm);
            let first = true;
            for (let funcArg of functionArgs) {
                const variableName = funcArg[2];
                if (first) {
                    newFunctionDeclaration += variableName;
                    first = false;
                } else {
                    newFunctionDeclaration += `, ${variableName}`;
                }
            }
        }
        newFunctionDeclaration += `)`;
        jasscode = jasscode.replace(original, newFunctionDeclaration);

        logger.info(`----`);
        logger.info(original);
        logger.info(newFunctionDeclaration);
    }
    return jasscode;
}
