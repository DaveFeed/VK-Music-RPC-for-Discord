//#region Setup
//Creating path to Roaming folder
const path = process.env.APPDATA + "\\vkrpc-options.json";

//Installing all needed modules and objects
const langs = require('./langs.json')
const RPC = require('discord-rpc');
const rp = require('request-promise');
const client = new RPC.Client({
    transport: 'ipc'
});

//#region Checking options
let options;
try {
    options = require(path)
} catch (err) {
    console.log("Error 0: Couldn't read the setup file. Check error code!")
    //Giving time to read the error
    setTimeout(() => {}, 3000);
    return;
}
//Checking if vkid exists (Could be file damaged or changed, thats why)
if (!options.vkid) {
    console.log("Error 0: Couldn't find vkid. Check error code!")
    //Giving time to read the error
    setTimeout(() => {}, 3000);
    return;
}
//No Url checks for now
const url = `https://vk.com/${options.vkid}`;
console.log("Url: " + url)

if (!options.lang || !Object.keys(langs).includes(options.lang)) {
    console.log("Couldn't find the language, autodetected English!")
    options.lang = 'en'
} else console.log("Choosen language: " + langs[options.lang].LangName)

let activity = {
    assets: {
        "large_image": "vk",
        "large_text": `${langs[options.lang].Made.toString().trim()} DaveFeed#8499`,
    }
};
let buttons = []
if (options.displayVK) {
    buttons.push({
        label: langs[options.lang].VKButtonName,
        url: url
    })
    console.log("Added VK Button")
}
buttons.push({
    label: "GitHub",
    url: "https://github.com/DaveFeed"
})
console.log("Added GitHub Button")
activity.buttons = buttons;

//#endregion
//#endregion

client.on('ready', () => {
    console.log("Client is ready! Starting RPC. (Check Discord)")
    setInterval(async () => {
        try {
            //Getting Html of the page
            let html = await rp(url);
            /*Parsing its div with pp_status class, maybe will change to some other system to
            Use VK API for that, but for now, this :)
            I was searching in VK api for the music broadcast, but didn't find anything, so used status parsing*/
            let pfrom = html.indexOf('class="pp_status"') + 'class="pp_status"'.length;
            //if Couldn't find any status
            if (pfrom < 'class="pp_status"'.length) {
                ChangeActivity()
            } else {
                let status = html.substr(pfrom);
                status = status.substr(1, status.indexOf('</div>') - 1);
                let info = status.split('—');
                ChangeActivity(info);
            }
        } catch (err) {
            if (err.statusCode >= 400) {
                console.log("Error 2: Please check the error code!")
                setTimeout(() => {
                    process.exit();
                }, 3000);
                return;
            }
            console.log("Error 1: This could resolve itself, lets wait and hope ...")
            ChangeActivity("err")
        }
        try {
            client.request('SET_ACTIVITY', {
                pid: process.pid,
                activity: activity
            });
        } catch (err) {
            console.log(err);
        }
    }, 500);
})

console.log("Logging into client ...")
client.login({
    clientId: "811605226461069322"
}).catch((err) => {
    console.log("Error 3: Discord is not turned on, please turn it on before running the program")
    setTimeout(() => {}, 3000);
})

function ChangeActivity(info) {
    if (info == undefined) {
        activity.details = langs[options.lang].NoMusic;
        activity.state = langs[options.lang].MaybeStatus;
    } else if (info == "err") {
        activity.details = langs[options.lang].Errors;
        activity.state = langs[options.lang].Resolving;
    } else {
        try {
            activity.details = `"${info[1].trim()}"`;
            activity.state = `${langs[options.lang].By}: ${info[0].trim()}`;
        } catch (err) {
            activity.details = langs[options.lang].ChangeStatus;
            activity.state = langs[options.lang].ChangeWhy;
        }
    }
}