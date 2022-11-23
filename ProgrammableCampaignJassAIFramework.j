
globals
    //***StartGlobalInsert***

    //***EndGlobalInsert***
endglobals

function PCJA_B2I takes boolean b returns integer
    if b then 
        return 1
    endif
    return 0
endfunction

function PCJA_I2B takes integer i returns boolean
    if i == 1 then 
        return true
    endif
    return false
endfunction

function PCJA_SetConfig takes player aiPlayer, integer configType, boolean value returns nothing
    local integer intValue = PCJA_B2I(value)
    //Send AI Command
    call CommandAI(aiPlayer, PCJA_COMMAND_END_TYPE, PCJA_COMMAND_TYPE_SET_CONFIG)
    call CommandAI(aiPlayer, configType, intValue)
    call CommandAI(aiPlayer, PCJA_COMMAND_START_TYPE, PCJA_COMMAND_TYPE_SET_CONFIG)
endfunction


function PCJA_DryRun takes nothing returns nothing
    call BJDebugMsg("Start campaign AI? war3mapImported/ProgrammableCampaignJassAI.ai")
    call StartMeleeAI(Player(1), "war3mapImported/ProgrammableCampaignJassAI.ai")
    call BJDebugMsg("Ai should be started")
    call TriggerSleepAction(0.50)
    call BJDebugMsg("Send Configs")
    call PCJA_SetConfig(Player(1), PCJA_CONFIG_TYPE_RANDOM_PATHS, true)
    //call PCJA_SetConfig(Player(1), PCJA_CONFIG_TYPE_HEROES_BUY_ITEMS, false)
endfunction
