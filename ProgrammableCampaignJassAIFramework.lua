

--***StartSharedGlobals***
PCJA_COMMAND_START_TYPE = 10000
PCJA_COMMAND_CONTENT_TYPE = 10001
PCJA_COMMAND_END_TYPE = 10002

PCJA_COMMAND_TYPE_SET_CONFIG = 10010
PCJA_COMMAND_TYPE_SET_HARVEST_GROUP = 10011
PCJA_COMMAND_TYPE_TEST = 10012


--if true, is campaign AI, otherwise melee
--Default: true
PCJA_CONFIG_TYPE_AI_IS_CAMPAIGN = 20000

--Defends allied players when they come under siege.
--Default: false
PCJA_CONFIG_TYPE_DEFEND_PLAYERS = 20001

--Takes different paths towards the enemy, aka attacking from different directions.
--Default: true
PCJA_CONFIG_TYPE_RANDOM_PATHS = 20002

--Prioritises targeting/killing heroes, not the most fun for campaign AI.
--Default: false
PCJA_CONFIG_TYPE_TARGET_HEROES = 20003

--Repair damaged buildings, otherwise they will let them be damaged.
--Blizzard standard is to have this disabled on easy
--Default: true
PCJA_CONFIG_TYPE_PEONS_REPAIR = 20004

--Causes the hero to try to keep itself alive during combat by running away.
--Default: false
PCJA_CONFIG_TYPE_HEROES_FLEE = 20005

--Causes the hero to buy items if they get close enough to such buildings.
--Default: false
PCJA_CONFIG_TYPE_HEROES_BUY_ITEMS = 20006

--Causes units to try to keep themselves alive during combat.
--Default: false
PCJA_CONFIG_TYPE_UNITS_FLEE = 20007

--Causes the entire army to just flee when it feels like its losing.
--Default: false
PCJA_CONFIG_TYPE_GROUPS_FLEE = 20008

--Mega targets is for Melee AI and not used here
--Default: false
PCJA_CONFIG_TYPE_WATCH_MEGA_TARGETS = 20009

--Leave very damaged units at gathering point.
--Default: false
PCJA_CONFIG_TYPE_IGNORE_INJURED = 20010

--Heroes try to pick up items, can be abused slightly as AI cheat
--and run across the entire map to grab a creep camp drop you missed.
--Default: false
PCJA_CONFIG_TYPE_HEROES_TAKE_ITEMS = 20011

--Or slow gathering, reduces all the resources gained/taken to 1... makes the AI
--Barely earn any money, so other income sources is needed in that case.
--Default: false
PCJA_CONFIG_TYPE_SLOW_CHOPPING = 20012

--Artillery targets buildings or casters that are weak to their siege damage.
--Blizzard standard is to use this on Hard difficulty.
--Default: true
PCJA_CONFIG_TYPE_SMART_ARTILLERY = 20013

--Summoned units are grouped into the ai players assault force.
--Otherwise they just stand AFK where they were summoned until they die.
--Default: true
PCJA_CONFIG_TYPE_GROUP_TIMED_LIFE = 20014

--***EndSharedGlobals***


--***StartSharedApi***

function PCJA_B2I(b)
    if b then 
        return 1
    end
    return 0
end

function PCJA_I2B(i)
    if i == 1 then 
        return true
    end
    return false
end

function PCJA_B2S(b)
    if (b) then
        return "true"
    end
    return "false"
end

--***EndSharedApi***

function PCJA_SetConfig(aiPlayer, configType, value)
    CommandAI(aiPlayer, PCJA_COMMAND_END_TYPE, PCJA_COMMAND_TYPE_SET_CONFIG)
    CommandAI(aiPlayer, configType, PCJA_B2I(value))
    CommandAI(aiPlayer, PCJA_COMMAND_START_TYPE, PCJA_COMMAND_TYPE_SET_CONFIG)
end

function PCJA_Test(aiPlayer, byte1, byte2, byte3, byte4)
    CommandAI(aiPlayer, PCJA_COMMAND_END_TYPE, PCJA_COMMAND_TYPE_TEST)
    CommandAI(aiPlayer, PCJA_COMMAND_CONTENT_TYPE, byte4)
    CommandAI(aiPlayer, PCJA_COMMAND_CONTENT_TYPE, byte3)
    CommandAI(aiPlayer, PCJA_COMMAND_CONTENT_TYPE, byte2)
    CommandAI(aiPlayer, PCJA_COMMAND_CONTENT_TYPE, byte1)
    CommandAI(aiPlayer, PCJA_COMMAND_START_TYPE, PCJA_COMMAND_TYPE_TEST)
end


function PCJA_DryRun()
    BJDebugMsg("Start campaign AI? war3mapImported/ProgrammableCampaignJassAI.ai")
    StartMeleeAI(Player(1), "war3mapImported/ProgrammableCampaignJassAI.ai")
    BJDebugMsg("Ai should be started")
    TriggerSleepAction(0.50)
    BJDebugMsg("Send Configs")
    PCJA_SetConfig(Player(1), PCJA_CONFIG_TYPE_RANDOM_PATHS, true)
    PCJA_SetConfig(Player(1), PCJA_CONFIG_TYPE_HEROES_BUY_ITEMS, false)
    PCJA_SetConfig(Player(1), PCJA_CONFIG_TYPE_GROUPS_FLEE, false)
    TriggerSleepAction(1.50)
    PCJA_Test(Player(1), 1, 32, 0, 69)
    PCJA_Test(Player(1), 255, 245, 3, 420)
end
