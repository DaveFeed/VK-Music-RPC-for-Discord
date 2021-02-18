const fs = require('fs');

const path = process.env.APPDATA + "\\vkrpc-options.json";
const supportingLangs = ["en", "ru"];

var prompt = require("prompt");
prompt.message = '';
prompt.delimiter = '';
prompt.start();

prompt.get({
    properties: {
        vkid: {
            description: "Your VKontakte ID or Username: (ex. \"id1234567\" or \"username\")",
            required: true
        },
        displayVK: {
            conform: function (v) {
                if (["y", "n"].includes(v.toString().toLowerCase())) return true;
                return false;
            },
            description: "Display your VK in RPC? (y/n)",
            required: true
        },
        lang: {
            description: `Your Language: (Supporting: ${FormatArr(supportingLangs)}.)`,
            default: 'en',
        }
    }
}, function (err, result) {
    result.displayVK = result.displayVK == "y" ? true : false;
    console.log(`Choosen:\
\nVk ID: ${result.vkid}\
\nDisplay: ${result.displayVK?"Yes":"No"}\
\nLanguage: "${result.lang}"\n`)

    console.log("Creating the file!")
    fs.writeFileSync(path, JSON.stringify(result, null, '\t'), (err) => {
        if (err) console.log(err);
    });
    console.log("Created, ready to go!")
});

function FormatArr(langs) {
    var xs = langs.map(l => `"${l}"`)
    var x = xs.pop();
    return xs.length ? xs.join(", ") + " and " + x : x || "";
}
