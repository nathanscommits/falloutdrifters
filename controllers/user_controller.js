const usersCollection = require("../db").db().collection("users");
const cardsCollection = require("../db").db().collection("cards");
const adminCollection = require("../db").db().collection("admins")
const bcrypt = require('bcryptjs');
const salt = process.env.SALT;
//encode
// var salt = bcrypt.genSaltSync(10);
// let hash = bcrypt.hashSync(uuid, salt);
// res.cookie('access_token', hash);
//compare
// let access = req.cookies['access_token'];
//find access key in DB > load that character up
// bcrypt.compareSync(uuid, hash); 

exports.checkAccess = async (req, res, next) => {
  try{
    let token = req.cookies['access_token'];
    if(token != null) {
      let user = await usersCollection.findOne({ token: token });
      req.user = user;
      let hash = bcrypt.hashSync(req.params.uuid, salt); //maybe this needs to be async?
      if(hash === token) {
        //access granted
        next();
      } else {
        //hash doesnt match token?
        console.log("Error: Hash doesnt match token");
        res.send("Something went wrong...");  
      }
    } else {
      //no cookies found, create one
      let user = await usersCollection.findOne({ uuid: req.params.uuid });
      send_req(user.url, {token: hash});
      res.send("Requesting access...You need to be wearing your titler in world.");
    }
  }catch(e) {
    console.log(e);
  }
}

exports.accessGranted = async (req, res) => {
  try{
    let hash = bcrypt.hashSync(req.body.uuid, salt);
    if(hash == req.body.token) {
        usersCollection.updateOne({uuid: req.body.uuid}, { $set: {token: hash} }, { upsert: true });
        res.cookies('access_token', hash);
        res.redirect('/' + req.body.uuid);

    } else {
      console.log("Token doesn't match new hash.");
    }
  } catch(e) {
    console.log(e)
  }
}

exports.enterName = async (req, res) => {
  try{
    res.render('enter_slname');
  } catch(e){
    console.log(e)
  }
}
// exports.checkIP = async (req, res, next) => { //need to convert this to use cookies with a token instead of IPs
//   try{
//     let user = await usersCollection.findOne({ uuid: req.params.uuid }, { projection: { _id: 0, ip: 1, url: 1 } });
//     if(req.headers.hasOwnProperty('x-forwarded-for') ) {
//       if(user.ip === req.headers['x-forwarded-for']) {
//         //console.log("IP match")
//         next();
//       } else {
//         //console.log("IP does not match")
//         send_req(user.url, {ip: req.headers['x-forwarded-for']})
//         res.send("Requesting access...");
//       }
//     } else {
//       console.log("no IP found in headers")
//     }
//   } catch(e){
//     console.log(e)
//   }
// }

exports.loadHUD = async (req, res) => {
 try{
  let user = await usersCollection.findOne({ uuid: req.params.uuid });
  let cards = await cardsCollection.find({}).toArray();
  user.perknum = 0;
  for (let perks in user.cards) {
    if (user.cards.hasOwnProperty(perks)) {
      user.perknum += user.cards[perks].length;
    }
  }
  // console.log(user);
  res.render("perks", { user: user, cards: cards });
 } catch(e) {
  console.log(e)
 }
};

exports.loadInventory = async (req, res) => {
  try{
    let user = await usersCollection.findOne({ uuid: req.params.uuid });
    user.perknum = 0;
    for (let perks in user.cards) {
      if (user.cards.hasOwnProperty(perks)) {
        user.perknum += user.cards[perks].length;
      }
    }
    // console.log(user);
    res.render("inventory", { user: user });

  } catch(e) {
    console.log(e)
  }
};

exports.loadPerks = async (req, res) => {
  try{
    let user = await usersCollection.findOne({ uuid: req.params.uuid });
    let cards = await cardsCollection.find({}).toArray();
    user.perknum = 0;
    for (let perks in user.cards) {
      if (user.cards.hasOwnProperty(perks)) {
        user.perknum += user.cards[perks].length;
      }
    }
    // console.log(user);
    res.render("perks", { user: user, cards: cards });
   } catch(e) {
    console.log(e)
   }
};

exports.loadStatus = async (req, res) => {
  try{
    let user = await usersCollection.findOne({ uuid: req.params.uuid });
    if(user.name == null) {
      res.render("enter_chname", {user: user});
    } else {
        user.perknum = 0;
        for (let perks in user.cards) {
          if (user.cards.hasOwnProperty(perks)) {
            user.perknum += user.cards[perks].length;
          }
        }
        // console.log(user);
        res.render("status", { user: user});
    }
   } catch(e) {
    console.log(e)
   }
};
exports.loadSkills = async (req, res) => {
  try{
    if(req.params.uuid == null) {
      console.log("No uuid in request");
    } else {
      let user = await usersCollection.findOne({ uuid: req.params.uuid });
      if(user.name == null) {
        res.render("enter_chname", {user: user});
      } else {
          user.perknum = 0;
          for (let perks in user.cards) {
            if (user.cards.hasOwnProperty(perks)) {
              user.perknum += user.cards[perks].length;
            }
          }
          // console.log(user);
          res.render("skills", { user: user});
      }
    }
   } catch(e) {
    console.log(e)
   }
};

exports.loadMap = async (req, res) => {
  try{
    let user = await usersCollection.findOne({ uuid: req.params.uuid });
    // let cards = await cardsCollection.find({}).toArray();
    user.perknum = 0;
    for (let perks in user.cards) {
      if (user.cards.hasOwnProperty(perks)) {
        user.perknum += user.cards[perks].length;
      }
    }
    // console.log(user);
    res.render("map", { user: user});
   } catch(e) {
    console.log(e)
   }
};

exports.loadRadio = async (req, res) => {
  try{
    let user = await usersCollection.findOne({ uuid: req.params.uuid });
    // let cards = await cardsCollection.find({}).toArray();
    user.perknum = 0;
    for (let perks in user.cards) {
      if (user.cards.hasOwnProperty(perks)) {
        user.perknum += user.cards[perks].length;
      }
    }
    // console.log(user);
    res.render("radio", { user: user});
   } catch(e) {
    console.log(e)
   }
};

exports.urlUpdate = async (req, res) => {
  try {
    await usersCollection.updateMany(
      { uuid: req.body.uuid },
      { $set: { url: req.body.url, slname: req.body.slname } },
      { upsert: true }
    );
    let message = "URL updated to: " + req.body.url;
    console.log(message);
    res.send(message);
  } catch (e) {
    console.log(e);
  }
};

// exports.ipUpdate = async (req, res) => {
//   try {
//     await usersCollection.updateMany(
//       { uuid: req.body.uuid },
//       { $set: { ip: req.body.ip } },
//       { upsert: true }
//     );
//     let message = "IP updated to: " + req.body.ip;
//     console.log(message);
//     res.send(message);
//   } catch (e) {
//     console.log(e);
//   }
// };

var request = require("request");
function send_req(url, postData) {
  var clientServerOptions = {
    uri: url,
    body: JSON.stringify(postData),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  };
  request(clientServerOptions, function (error, response) {
    //console.log(error, response.body);
    return;
  });
}

exports.postTest = async (req, res) => {
  let user = await usersCollection.findOne({ slname: "sharky.piggins" });
  // console.log(req);
  send_req(user.url, {
    ownersay: "hello there",
    say: "saying stuff",
    settext: "testing",
    textcolor: "<1,.2,.2>",
  });
  res.send("sent");
};

exports.showItem = async (req, res, next) => {
  try{
    let user = await usersCollection.findOne({ uuid: req.params.uuid });
    // console.log(req);
    send_req(user.url, {
      say: "SHOWS: " + decodeURIComponent(req.params.item_name) + " - " + decodeURIComponent(req.params.item_desc)
    });

    res.redirect("/inventory/"+req.params.uuid);
  } catch(e) {
    console.log(e)
  }
};

exports.showPerk = async (req, res, next) => {
  try{
    let user = await usersCollection.findOne({ uuid: req.params.uuid });
    // console.log(req);
    send_req(user.url, {
      say: "SHOWS: " + decodeURIComponent(req.params.item_name) + " - " + decodeURIComponent(req.params.item_desc)
    });

    res.redirect("/perks/"+req.params.uuid);
  } catch(e) {
    console.log(e)
  }
};

exports.pickRace = async (req, res, next) => {
  let uuid = req.body.uuid;
  let error;
  try{
    let user = await usersCollection.findOne({ uuid: req.body.uuid });
    if(user && 'uuid' in user) {
      error = "User already exists";
    }else if(uuid == null){
      error = "UUID not found";
    }
  } catch(e) {
    console.log(e)
  }


  res.render("race-pick", {uuid: uuid, error: error})
}

exports.raceSelected = async (req, res, next) => {
  let uuid = req.body.uuid;
  let race = req.body.race;
  let stats = req.body.stats;
  let error;
  try{
    let user = await usersCollection.findOne({ uuid: req.body.uuid });
    if(user && 'uuid' in user) {
      error = "User already exists";
    }else if(uuid == null){
      error = "UUID not found";
    }else if(race == null || stats == null){
      error = "No race selected"
    } else {
      await createNewUser(race, uuid, stats);
      res.redirect("/status/"+uuid)
    }
  } catch(e) {
    console.log(e)
  }


  res.render("race-pick", {uuid: uuid, error: error})
}

let createNewUser = async (race, uuid, race_stats) => {

  let stats = {
    str: parseInt(race_stats[0]),
    per: parseInt(race_stats[1]),
    end: parseInt(race_stats[2]),
    cha: parseInt(race_stats[3]),
    int: parseInt(race_stats[4]),
    agi: parseInt(race_stats[5]),
    luc: parseInt(race_stats[6]),
  }

  let sub = {
    rad_resist: 0,
    poison_resist: 0,
    fire_resist: 0,
    pacify_resist: 0,
    bleed_resist: 0,
    damage_resist: 0,

    heavy_weapons: 0,
    healing_rate: 0,
    carry_weight: 0,
    intimidation: 0,

    awareness: 0,
    accuracy: 0,
    lockpicking: 0,
    stealing: 0,

    pet: 0,
    barter: 0,
    persuasion: 0,
    drinking: 0,

    xp_rate: 0,
    repair: 0,
    science: 0,
    hacking: 0,
    medicine: 0,

    light_weapons: 0,
    dodge: 0,
    sneak: 0,
    fishing: 0,

    crit_chance: 0,
    crit_damage: 0,
    gambling: 0,
    item_find: 0,

  }

  let max_health = 100 + ( 20 * stats[end] );
  let max_ap = 5 + (stats[agi] / 2);
  
  let USER = {
    uuid: uuid,
    race: race,
    level: 1,
    exp: 0,
    exp_needed: 100,
    max_health: max_health,
    health: max_health,
    max_ap: max_ap,
    ap: max_ap,
    perk_points: 0,
    spec_points: 0,
    rads: 0,
    caps: 0,
    karma: 0,
    addict: 0,
    perks: [],
    inventory: [],
    bank: [],
    party: [],
    data: {
      kills: 0,
      deaths: 0,
      fled: 0,
      quests: 0,
      hacks: 0,
      locks: 0,
      fish: 0,
    },
    status: [],
    name: "",
    desc: "",
    stats: {
      main: stats,
      sub: sub,
    },
    debuff: [],
    buff: [],
    target: [],

  }

  try{
    await usersCollection.insertOne(USER);
  } catch(e) {
    console.log(e)
  }

}

exports.addExp = async (req, res) => {
  let uuid = req.body.uuid;
  let addedExp = parseInt(req.body.addedExp)
  try {
    let user = await usersCollection.findOne({uuid: uuid}, {projection: { _id: 0, exp: 1, level: 1, exp_needed: 1, spec_points: 1, perk_points: 1 }});
    user.exp = parseInt(user.exp) + parseInt(addedExp);
    while (parseInt(user.exp_needed) <= parseInt(user.exp)) {
      user.level = parseInt(user.level) + 1;
      user.exp = parseInt(user.exp) - parseInt(user.exp_needed);
      user.exp_needed = parseInt(user.exp_needed) + (parseInt(user.exp_needed) / 10);

      if(parseInt(user.level) % 2) { //odd
        // give special point
        user.spec_points = parseInt(user.spec_points) + 1;
      } else { // even
        //give perk point
        user.perk_points = parseInt(user.perk_points) + 1;
      }
    }
    await usersCollection.updateOne(
      {uuid: uuid},
      { $set: user },
      { upsert: true }
    )
  } catch(e) {
    console.log(e)
  }
}
// let addPerkStats = (user, perk) => {
  //   for (var key in perk.main) {
  //     if (perk.main.hasOwnProperty(key) && user.stats.main.hasOwnProperty(key)) {
  //       user.stats.main[key] = parseInt(user.stats.main[key]) +  parseInt(perk.main[key]);
  //     }
  //   }
  //   for (var key in perk.sub) {
  //     if (perk.sub.hasOwnProperty(key) && user.stats.sub.hasOwnProperty(key)) {
  //       user.stats.sub[key] = parseInt(user.stats.sub[key]) +  parseInt(perk.sub[key]);
  //     }
  //   }
  //   return user;
  // }
exports.addPerk = async (req, res) => {
  try{
    let user = await usersCollection.findOne({uuid: req.body.uuid});
    let perk = await perkCollection.findOne({name: req.body.perk_name});
    user.perks.push(perk);
    // user = addPerkStats(user, perk)
    await usersCollection.updateOne({uuid: req.body.uuid}, {$set: {perks: user.perks, stats: user.stats}})
  } catch(e) {
    console.log(e)
  }
}
let addMainStat = (school, user) => {
  let stat = substr(0, 3);
  user.stats.main[stat] = parseInt(user.stats.main[stat]) + 1;
  // if(school === "strength") {
  //   user.stats.sub.carry_weight = 5 + (parseInt(user.stats.main.str) / 2)
  //   user.stats.sub.heavy_weapons = parseInt(user.stats.main.str)
  //   user.stats.sub.intimidation = parseInt(user.stats.main.str)
  // } else if(school === "perception") {
  //   user.stats.sub.accuracy = parseInt(user.stats.main.per)
  //   user.stats.sub.awareness = parseInt(user.stats.main.per)
  //   user.stats.sub.lockpicking = parseInt(user.stats.main.per)
  //   user.stats.sub.stealing = parseInt(user.stats.main.per)
  // } else if(school === "endurance") {
  //   user.max_health = 100 + ( parseInt(user.stats.main.end) * 20 );
  //   user.stats.sub.healing_rate = parseInt(user.stats.main.end)
  // } else if(school === "charisma") {
  //   user.stats.sub.pet = parseInt(user.stats.main.cha)
  //   user.stats.sub.barter = parseInt(user.stats.main.cha)
  //   user.stats.sub.persuasion = parseInt(user.stats.main.cha)
  //   user.stats.sub.drinking = parseInt(user.stats.main.cha)
  //} else 
  if(school === "intelligence") {
  //   user.stats.sub.exp_rate = parseInt(user.stats.main.int)
  //   user.stats.sub.repair = parseInt(user.stats.main.int)
  //   user.stats.sub.science = parseInt(user.stats.main.int)
  //   user.stats.sub.hacking = parseInt(user.stats.main.int)
  //   user.stats.sub.medicine = parseInt(user.stats.main.int)
    if(!(parseInt(user.stats.main.int) % 3)) {
      //divisible by 3 int, add perk point
      user.perk_points = parseInt(user.perk_points) + 1;
    }
  } //else if(school === "agility") {
  //   user.stats.sub.sneak = parseInt(user.stats.main.agi)
  //   user.stats.sub.light_weapons = parseInt(user.stats.main.agi)
  //   user.stats.sub.dodge = parseInt(user.stats.main.agi)
  //   user.stats.sub.fishing = parseInt(user.stats.main.agi)
  //   user.stats.sub.max_ap = 5 + parseInt(user.stats.main.agi)
  // }

  return user;
}
let calcStatSources = (user) => { //unfinished, still needs item buffs, party buffs, skill buffs and debuffs
  // PERKS
  user.perks.forEach(perk => {
    for (var key in perk.main) {
      if (user.stats.main.hasOwnProperty(key)) {
        user.stats.main[key] = parseInt(user.stats.main[key]) +  parseInt(perk.main[key]);
      }
    }
    for (var key in perk.sub) {
      if (user.stats.sub.hasOwnProperty(key)) {
        user.stats.sub[key] = parseInt(user.stats.sub[key]) +  parseInt(perk.sub[key]);
      }
    }
    
  });

  // MAIN STAT (CALC AFTER OTHER MAIN STAT CALC)
  user.stats.sub.carry_weight = 5 + (parseInt(user.stats.main.str) / 2)
  user.stats.sub.heavy_weapons = parseInt(user.stats.main.str)
  user.stats.sub.intimidation = parseInt(user.stats.main.str)
  
  user.stats.sub.accuracy = parseInt(user.stats.main.per)
  user.stats.sub.awareness = parseInt(user.stats.main.per)
  user.stats.sub.lockpicking = parseInt(user.stats.main.per)
  user.stats.sub.stealing = parseInt(user.stats.main.per)
  
  user.max_health = 100 + ( parseInt(user.stats.main.end) * 20 );
  user.stats.sub.healing_rate = parseInt(user.stats.main.end)
  
  user.stats.sub.pet = parseInt(user.stats.main.cha)
  user.stats.sub.barter = parseInt(user.stats.main.cha)
  user.stats.sub.persuasion = parseInt(user.stats.main.cha)
  user.stats.sub.drinking = parseInt(user.stats.main.cha)
  
  user.stats.sub.exp_rate = parseInt(user.stats.main.int)
  user.stats.sub.repair = parseInt(user.stats.main.int)
  user.stats.sub.science = parseInt(user.stats.main.int)
  user.stats.sub.hacking = parseInt(user.stats.main.int)
  user.stats.sub.medicine = parseInt(user.stats.main.int)
  
  user.stats.sub.sneak = parseInt(user.stats.main.agi)
  user.stats.sub.light_weapons = parseInt(user.stats.main.agi)
  user.stats.sub.dodge = parseInt(user.stats.main.agi)
  user.stats.sub.fishing = parseInt(user.stats.main.agi)
  user.stats.sub.max_ap = 5 + parseInt(user.stats.main.agi)
  
  user.stats.sub.crit_chance += parseInt(user.stats.main.luc)
  user.stats.sub.crit_damage += parseInt(user.stats.main.luc)
  user.stats.sub.gambling += parseInt(user.stats.main.luc)
  user.stats.sub.item_find += parseInt(user.stats.main.luc)

  return user
}

exports.addSpec = async (req, res) => {
  try{
    let school = req.school
    let user = await usersCollection.findOne({uuid: uuid});
    user.spec_points = parseInt(user.spec_points) - 1;
    if(school === "luck") {
      user.stats.main.luc = parseInt(user.stats.main.luc) + 1;
      // user.stats.sub.crit_chance = parseInt(user.stats.main.luc)
      // user.stats.sub.crit_damage = parseInt(user.stats.main.luc)
      // user.stats.sub.gambling = parseInt(user.stats.main.luc)
      // user.stats.sub.item_find = parseInt(user.stats.main.luc)
      if(!(parseInt(user.stats.main.luc) % 3)) {
        //divisible by 3 luck, add points to all schools
        user = addMainStat("strength", user);
        user = addMainStat("perception", user);
        user = addMainStat("endurance", user);
        user = addMainStat("charisma", user);
        user = addMainStat("intelligence", user);
        user = addMainStat("agility", user);
      }
    } else {
      user = addMainStat(school, user);
    }

    await usersCollection.updateOne(
      {uuid: user.uuid},
      { $set: user },
      { upsert: true }
    )
  } catch(e) {
    console.log(e)
  }
}

// stat modifier sources
// base stat -/
// perk -/
// item buffs
// party buffs
// equipment buffs
// skill buffs
// debuffs


// details still missing
// name
// desc
// slname
// ip
// url
// character #
