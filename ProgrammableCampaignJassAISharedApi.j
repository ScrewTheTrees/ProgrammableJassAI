// Shared functions for both AIscript and Jass script

//***StartSharedApi***

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

function PCJA_B2S takes boolean b returns string
    if (b) then
        return "true"
    endif
    return "false"
endfunction

//***EndSharedApi***