const usersCollection = require("../db").db().collection("users");
const cardsCollection = require("../db").db().collection("cards");

exports.loadInventory = async (req, res) => {
  try{
    let user = await usersCollection.findOne({ uuid: req.params.uuid }, {ip: 0, url: 0, bank: 0});
    user.perknum = 0;
    for (let perks in user.cards) {
      if (user.cards.hasOwnProperty(perks)) {
        user.perknum += user.cards[perks].length;
      }
    }
    // console.log(user);
    res.render("profile-inventory", { user: user });

  } catch(e) {
    console.log(e)
  }
};
exports.loadPerks = async (req, res) => {
  try{
    let user = await usersCollection.findOne({ uuid: req.params.uuid }, {ip: 0, url: 0, bank: 0});
    let cards = await cardsCollection.find({}).toArray();
    user.perknum = 0;
    for (let perks in user.cards) {
      if (user.cards.hasOwnProperty(perks)) {
        user.perknum += user.cards[perks].length;
      }
    }
    // console.log(user);
    res.render("profile-perks", { user: user, cards: cards });
   } catch(e) {
    console.log(e)
   }
};
exports.loadStatus = async (req, res) => {
  try{
    let user = await usersCollection.findOne({ uuid: req.params.uuid }, {ip: 0, url: 0, bank: 0});
    // let cards = await cardsCollection.find({}).toArray();
    user.stats = {
      attack: (1 + user.cards.agility.length +  user.cards.strength.length ),
      defense: (1 + user.cards.endurance.length + user.cards.agility.length  ),
      strength: user.cards.strength.length,
      perception: user.cards.perception.length,
      endurance: user.cards.endurance.length,
      charisma: user.cards.charisma.length,
      intelligence: user.cards.intelligence.length,
      agility: user.cards.agility.length,
      luck: user.cards.luck.length,
      "carry weight": user.cards.strength.length,
      intimidation: user.cards.strength.length,
      "heavy weapons": user.cards.strength.length,
      accuracy: user.cards.perception.length,
      lockpicking: user.cards.perception.length,
      stealing: user.cards.perception.length,
      awareness: user.cards.perception.length,
      "poison resist": user.cards.endurance.length,
      "rad resist": user.cards.endurance.length,
      healing: user.cards.endurance.length,
      toughness: user.cards.endurance.length,
      "pet power": user.cards.charisma.length,
      barter: user.cards.charisma.length,
      persuasion: user.cards.charisma.length,
      drinking: user.cards.charisma.length,
      repair: user.cards.intelligence.length,
      medicine: user.cards.intelligence.length,
      science: user.cards.intelligence.length,
      hacking: user.cards.intelligence.length,
      "exp rate": user.cards.intelligence.length,
      dodge: user.cards.agility.length,
      "light weapons": user.cards.agility.length,
      sneak: user.cards.agility.length,
      ap: user.cards.agility.length,
      "crit chance": user.cards.luck.length,
      gambling: user.cards.luck.length,
      "item find": user.cards.luck.length
    };
    for (stat in user.stats) {
      if (user.stats.hasOwnProperty(stat) && stat !== "luck") {
        user.stats[stat] = user.stats[stat] + (user.stats.luck/2);
      }
    }
    user.perknum = 0;
    for (let perks in user.cards) {
      if (user.cards.hasOwnProperty(perks)) {
        user.perknum += user.cards[perks].length;
      }
    }
    // console.log(user);
    res.render("profile-status", { user: user});
   } catch(e) {
    console.log(e)
   }
};