set_media(){
    string URL = "https://falloutdrifters.herokuapp.com/";
    integer flags =  llSetLinkMedia(LINK_THIS,4,                             
        [ 
            PRIM_MEDIA_AUTO_PLAY ,TRUE,
            PRIM_MEDIA_AUTO_SCALE, TRUE,
            PRIM_MEDIA_PERMS_CONTROL,PRIM_MEDIA_PERM_NONE,
            PRIM_MEDIA_PERMS_INTERACT, PRIM_MEDIA_PERM_OWNER,
            PRIM_MEDIA_CURRENT_URL, URL+ (string)llGetOwner(),
            PRIM_MEDIA_HOME_URL , URL   ,
            PRIM_MEDIA_AUTO_ZOOM , TRUE]); 

    if( !flags ) llOwnerSay("loaded");
    else llOwnerSay("errors");
}

default
{
    state_entry()
    {
        set_media();
    }
    on_rez( integer start_param)
    {
        set_media();
    }
}
