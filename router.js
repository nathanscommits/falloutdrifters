const express = require("express"),
  router = express.Router();
const usersController = require("./controllers/user_controller");
const profileController = require("./controllers/profile_controller");


router.get("/profile/inventory/:uuid", profileController.loadInventory);
router.get("/profile/perks/:uuid", profileController.loadPerks);
router.get("/profile/status/:uuid", profileController.loadStatus);
router.get("/profile/:uuid", profileController.loadStatus);

router.get("/inventory/:uuid", usersController.checkAccess, usersController.loadInventory);
router.get("/perks/:uuid", usersController.checkAccess, usersController.loadPerks);
router.get("/skills/:uuid", usersController.checkAccess, usersController.loadSkills);
// router.get("/status/:uuid", usersController.checkAccess, usersController.loadStatus);
router.get("/status/:uuid", usersController.loadStatus);
router.get("/map/:uuid", usersController.checkAccess, usersController.loadMap);
router.get("/radio/:uuid", usersController.checkAccess, usersController.loadRadio);

router.get("/show/:uuid/:item_name/:item_desc", usersController.showItem);
router.get("/showperk/:uuid/:item_name/:item_desc", usersController.showPerk);

router.get("/", usersController.enterName); // change to home page or wiki or something
// router.post("/raceselected", usersController.raceSelected);
router.get("/entername/:uuid", usersController.enterName);
router.post("/entername", usersController.enterName);
router.post("/selectrace", usersController.pickRace);
router.post("/selectorigin", usersController.pickOrigin);
router.post("/selectspecial", usersController.pickSpecial);

router.post("/urlupdate", usersController.urlUpdate);  
router.post("/tokenupdate", usersController.accessGranted);
router.get("/:uuid", usersController.checkAccess, usersController.loadStatus);


module.exports = router;
