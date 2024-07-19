const util = require('util');
const fs = require('fs-extra');
const { zokou } = require(__dirname + "/../framework/zokou");
const { format } = require(__dirname + "/../framework/mesfonctions");
const os = require("os");
const moment = require("moment-timezone");
const s = require(__dirname + "/../set");
const more = String.fromCharCode(8206)
const readmore = more.repeat(4001)

zokou({ nomCom: "menu", categorie: "General" }, async (dest, zk, commandeOptions) => {
    let { ms, repondre ,prefixe,nomAuteurMessage,mybotpic} = commandeOptions;
    let { cm } = require(__dirname + "/../framework//zokou");
    var coms = {};
    var mode = "public";
    
    if ((s.MODE).toLocaleLowerCase() != "yes") {
        mode = "private";
    }


    

    cm.map(async (com, index) => {
        if (!coms[com.categorie])
            coms[com.categorie] = [];
        coms[com.categorie].push(com.nomCom);
    });

    moment.tz.setDefault('Etc/GMT');

// Créer une date et une heure en GMT
const temps = moment().format('HH:mm:ss');
const date = moment().format('DD/MM/YYYY');

  let infoMsg =  `
╔═══★★│ *${s.BOT}* │★★════╗
│▓┌────────···▸
│▓│▸ *Owner* : ${s.OWNER_NAME}
│▓│▸ *Creator* :Beltah Tech
│▓└────────────···▸
│▓┌────────···▸
│▓│▸ *Mode* : ${mode}
│▓│▸ *Commands* : 245
│▓│▸ *Date* : ${date}
│▓│▸ *Time* : ${temps}
│▓└─────────···▸
│▓│▸ *Memory* : ${format(os.totalmem() - os.freemem())}/${format(os.totalmem())}
│▓│▸ *Platform* : ${os.platform()}
│▓│▸ *Theme* : *SCENE-MD*
│▓└───────────────···▸
╚══════ ▓▓ ࿇ ▓▓ ══════╝
> SCENE-MD BOT BY BELTAH
> 𝐏𝐎𝐖𝐄𝐑𝐄𝐃 𝐁𝐘 𝐁𝐄𝐋𝐓𝐀𝐇 𝐓𝐄𝐂𝐇${readmore} \n`;
    
let menuMsg = `
╔════ ▓▓ ࿇ ▓▓ ════╗
   *SCENE-MD BOT COMMANDS*
`;

    for (const cat in coms) {
        menuMsg += `╔═══❏ ${cat} ❏══╗`;
        for (const cmd of coms[cat]) {
            menuMsg += `          
│❒┌─────···▸
│❒│  ${cmd}`    
        } 
        menuMsg +=`
│❒└────────···▸;            
╚════════════════╝\n`
    }
  
    menuMsg += `
╔═══════
> *SCENE-MD BOT* © 𝐁𝐞𝐥𝐭𝐚𝐡 𝐓𝐞𝐜𝐡 𝟐𝟓𝟒🇰🇪
╚═════ ▓▓ ࿇ ▓▓ ═════╝\n
`;

   var lien = mybotpic();

   if (lien.match(/\.(mp4|gif)$/i)) {
    try {
        zk.sendMessage(dest, { video: { url: lien }, caption:infoMsg + menuMsg, footer: "Je suis *Beltahmd*, déveloper Beltah Tech" , gifPlayback : true }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
// Vérification pour .jpeg ou .png
else if (lien.match(/\.(jpeg|png|jpg)$/i)) {
    try {
        zk.sendMessage(dest, { image: { url: lien }, caption:infoMsg + menuMsg, footer: "Je suis *Beltahmd*, déveloper Beltah Tech" }, { quoted: ms });
    }
    catch (e) {
        console.log("🥵🥵 Menu erreur " + e);
        repondre("🥵🥵 Menu erreur " + e);
    }
} 
else {
    
    repondre(infoMsg + menuMsg);
    
}

});
