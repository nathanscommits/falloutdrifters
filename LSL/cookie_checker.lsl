//this needs converting over from IP checking to cookie key checking

key urlRequestId;

// string URL = "https://falloutsl.loca.lt/"; //local environment
string URL = "https://falloutdrifters.herokuapp.com/"; //online environment
key HTTP_REQUEST_ID;
send_req(string url, string json) {
    HTTP_REQUEST_ID = llHTTPRequest(URL+url, 
        [HTTP_METHOD,"POST",
        HTTP_BODY_MAXLENGTH, 8000,
        HTTP_MIMETYPE,"application/json",
        HTTP_VERBOSE_THROTTLE,FALSE], 
        json
    );
}
integer MENU_CHANNEL = -1471583;
string IP_ADD;
integer HANDLE;
default
{
    state_entry()
    {
        urlRequestId = llRequestURL();
    }
    on_rez(integer start_param)
    {
        llResetScript();
    }
 
    changed(integer change)
    {
        if (change & (CHANGED_OWNER | CHANGED_INVENTORY))
            llResetScript();
    
        if (change & (CHANGED_REGION | CHANGED_REGION_START | CHANGED_TELEPORT))
            urlRequestId = llRequestURL();
    }
 
    http_request(key id, string method, string body)
    {
        if (id == urlRequestId) {
            if (method == URL_REQUEST_DENIED)
                llOwnerSay("The following error occurred while attempting to get a URL for this device:\n \n" + body);
    
            else if (method == URL_REQUEST_GRANTED) {
                send_req("urlupdate", llList2Json(JSON_OBJECT, [
                    "url", body,
                    "uuid", llGetOwner(),
                    "slname", llKey2Name(llGetOwner())
                ]));
            }
        } else if( id == HTTP_REQUEST_ID) {
            //url updated in server, ask how they want to open the HUD here
            llLoadURL(llGetOwner(), "Do you want to open the HUD in your browser?", URL+llGetOwner());
            llOwnerSay("url " + body);
        } else {
            llOwnerSay(body);
            if(llJsonGetValue(body, ["token"]) != JSON_INVALID) {
                HANDLE = llListen(MENU_CHANNEL, "", llGetOwner(), "");
                IP_ADD = llJsonGetValue(body, ["token"]);
                llDialog(llGetOwner(), "A new browser is trying gain access to your account, allow it?", ["ALLOW", "DENY"], MENU_CHANNEL);
            }
            if(llJsonGetValue(body, ["ownersay"]) != JSON_INVALID)
                llOwnerSay(llJsonGetValue(body, ["ownersay"]));
            if(llJsonGetValue(body, ["say"]) != JSON_INVALID)
                llSay(0, llJsonGetValue(body, ["say"]));
            if(llJsonGetValue(body, ["settext"]) != JSON_INVALID && llJsonGetValue(body, ["textcolor"]) != JSON_INVALID)
                llSetText(llJsonGetValue(body, ["settext"]), (vector)llJsonGetValue(body, ["textcolor"]), 1);
        }
    }
    
    listen( integer channel, string name, key id, string str )
    {
        if(str == "ALLOW") {
            llDialog(llGetOwner(), "Allowing this will give the browser complete access to your account, are you sure you want to do this?", ["YES", "NO"], MENU_CHANNEL);
        } else if(str == "YES") {
            llOwnerSay();
            llLoadURL(llGetOnwer(), "New Browser registered. Reload your HUD.", URL+llGetOwner());
            llListenRemove(HANDLE);
            send_req("tokenupdate", llList2Json(JSON_OBJECT, [
                "token", IP_ADD,
                "uuid", llGetOwner(),
                "slname", llName2Key(llGetOwner())
            ]));
        }
    }
}