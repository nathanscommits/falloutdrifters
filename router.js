const express = require("express"),
  router = express.Router();
const usersController = require("./controllers/user_controller");
const profileController = require("./controllers/profile_controller");


router.get("/profile/inventory/:uuid", profileController.loadInventory);
router.get("/profile/perks/:uuid", profileController.loadPerks);
router.get("/profile/status/:uuid", profileController.loadStatus);
router.get("/profile/:uuid", profileController.loadStatus);

router.get("/inventory/:uuid", usersController.checkIP, usersController.loadInventory);
router.get("/perks/:uuid", usersController.checkIP, usersController.loadPerks);
router.get("/status/:uuid", usersController.checkIP, usersController.loadStatus);
router.get("/map/:uuid", usersController.checkIP, usersController.loadMap);
router.get("/radio/:uuid", usersController.checkIP, usersController.loadRadio);

router.get("/show/:uuid/:item_name/:item_desc", usersController.showItem);
router.get("/showperk/:uuid/:item_name/:item_desc", usersController.showPerk);

router.get("/race", usersController.pickRace);
router.get("/", usersController.pickRace);
router.post("/raceselected", usersController.raceSelected);

router.post("/urlupdate", usersController.urlUpdate); 
router.post("/ipupdate", usersController.ipUpdate); 
router.get("/:uuid", profileController.loadStatus);


module.exports = router;
