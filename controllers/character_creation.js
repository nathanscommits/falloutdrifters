const usersCollection = require("../db").db().collection("users");
const cardsCollection = require("../db").db().collection("cards");
const adminCollection = require("../db").db().collection("admins");

let CHARACTER = {
    stats: {
        race: "",
        origin: "",
        special: {
            str: 4,
            per: 4,
            end: 4,
            cha: 4,
            int: 4,
            agi: 4,
            lck: 4
        },
        skills: {
            athletics: 0,
            barter: 0,
            big_guns: 0,
            energy_weapons: 0,
            explosives: 0,
            lockpick: 0,
            medicine: 0,
            melee_weapons: 0,
            pilot: 0,
            repair: 0,
            science: 0,
            small_guns: 0,
            sneak: 0,
            speech: 0,
            survival: 0,
            throwing: 0,
            unarmed: 0
        },
        tag: [],
        traits: [],
        hp: 0,
        rads: 0,
        max_hp: 0, // END + LCK + (level - 1?)
        max_carry_weight: 0, // 150 + (STR * 10)
        weight: 0,
        initiative: 0, // PER + AGI
        defense: 0, // AGI based
        damage_resist: {
            phys: 0,
            energy: 0,
            poison: 0,
            rad: 0
        },
        max_resist: {
            phys: 0,
            energy: 0,
            poison: 0,
            rad: 0
        },
        damage_effects: [],
        melee_damage: 0, // STR based
        perks: [],
        exp: 0,
        xp_req: 0,
        level: 0,
        luck_points: 0,
        trinket_used: false,
        prone: false,
        injuries: [],
        difficulty: 0,
    },

    properties: {
        name: "",
        donator: false,
        uuid: "",
        party: [],
        target: "",
    },

    inventory: {
        currency: {
            caps: 0,
            old_money: 0,
            gold: 0,
            new_money: 0,
            scrip: 0,
        },
        armors: {
            head: {},
            body: {},
            left_arm: {},
            right_arm: {},
            left_leg: {},
            right_leg: {},
        },
        weapons: [],
        ammo: [],
        bag: [],
        bank: [],
        drawn: [],
    },

    other_stats: {
        successes: 0,
        complications: 0,
        rolls: 0,
        KOs: 0,
        KOd: 0,
        age: 0,
        consumed: 0,
        letter_count: 0,
        distance_traveled: 0,
    }

};


