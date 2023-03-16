// Globals shared with the AI script to handle communication

globals
    //***StartSharedGlobals***
    integer PCJA_COMMAND_START_TYPE = 10000
    integer PCJA_COMMAND_END_TYPE = 10001

    integer PCJA_COMMAND_TYPE_SET_CONFIG = 10002
    integer PCJA_COMMAND_TYPE_SET_HARVEST_GROUP = 10003


    //if true, is campaign AI, otherwise melee
    //Default: true
    integer PCJA_CONFIG_TYPE_AI_IS_CAMPAIGN = 20000

    //Defends allied players when they come under siege.
    //Default: false
    integer PCJA_CONFIG_TYPE_DEFEND_PLAYERS = 20001

    //Takes different paths towards the enemy, aka attacking from different directions.
    //Default: true
    integer PCJA_CONFIG_TYPE_RANDOM_PATHS = 20002

    //Prioritises targeting/killing heroes, not the most fun for campaign AI.
    //Default: false
    integer PCJA_CONFIG_TYPE_TARGET_HEROES = 20003

    //Repair damaged buildings, otherwise they will let them be damaged.
    //Default: true
    integer PCJA_CONFIG_TYPE_PEONS_REPAIR = 20004

    //Causes the hero to try to keep itself alive during combat.
    //Default: false
    integer PCJA_CONFIG_TYPE_HEROES_FLEE = 20005

    //Causes the hero to try to keep itself alive during combat.
    //Default: false
    integer PCJA_CONFIG_TYPE_HEROES_BUY_ITEMS = 20006

    //Causes units to try to keep themselves alive during combat.
    //Default: false
    integer PCJA_CONFIG_TYPE_UNITS_FLEE = 20007

    //Causes the entire army to just flee when it feels like its losing.
    //Default: false
    integer PCJA_CONFIG_TYPE_GROUPS_FLEE = 20008

    //Mega targets is for Melee AI and not used here
    //Default: false
    integer PCJA_CONFIG_TYPE_WATCH_MEGA_TARGETS = 20009

    //Leave very damaged units at gathering point.
    //Default: false
    integer PCJA_CONFIG_TYPE_IGNORE_INJURED = 20010

    //Heroes try to pick up items, can be abused slightly as AI cheat
    //and run across the entire map to grab a creep camp drop you missed.
    //Default: false
    integer PCJA_CONFIG_TYPE_HEROES_TAKE_ITEMS = 20011

    //Or slow gathering, reduces all the resources gained/taken to 1... makes the AI
    //Barely earn any money, so other income sources is needed in that case.
    //Default: false
    integer PCJA_CONFIG_TYPE_SLOW_CHOPPING = 20012

    //Artillery targets buildings or casters that are weak to their siege damage.
    //Default: true
    integer PCJA_CONFIG_TYPE_SMART_ARTILLERY = 20013

    //Summoned units are grouped into the ai players assault force.
    //Otherwise they just stand AFK where they were summoned.
    //Default: true
    integer PCJA_CONFIG_TYPE_GROUP_TIMED_LIFE = 20014

    //***EndSharedGlobals***
endglobals