const express = require("express"),
  router = express.Router();
const usersController = require("./controllers/user_controller");
const profileController = require("./controllers/profile_controller");

// const inventoryController = require("./controllers/inventory_controller");
// const postController = require("./controllers/post_controller");

// request.connection.remoteAddress IP ADDRESS request.headers['x-forwarded-for'] 
// var Scraper = require("image-scraper");
 
// var scraper = new Scraper("https://apod.nasa.gov/apod/astropix.html");
// scraper.address = 'https://www.prikol.ru/wp-content/gallery/october-2010/';


// let scrape = async (req, res, next) => {
//   req.DATA = []
//   try{
//     await scraper.scrape( (image) => { 
//       // image.save();
//       // console.log("new image")
//       if(image.name.indexOf("image2") == -1)
//         req.DATA.push(image)
//     })
//   }catch(e) {
//     console.log(e);
//   }

//   let timer = setInterval( () => next(), 5000)
//   // timer()
// }

const rp = require('request-promise');
const $ = require('cheerio');
const url = '';



router.get("/viewimage/:start/:end",  async (req, res) => {
  // console.log(req.DATA)
  // rp(url)
  // .then(function(html){
  //   //success!
  //   console.log($('td > a', html).length);
  //   console.log($('td > a', html));
  // })
  const start = parseInt(req.params.start)
  const end = parseInt(req.params.end)
  const wikiUrls = [];
  rp(url)
  .then(function(html){
    //success!
    // for (let i = start; i < end; i++) {
    let i = start
    while(wikiUrls.length < end){
      let link = $('td > a', html)[i]
      
      if(link != undefined && 'attribs' in link){
        link = $('td > a', html)[i].attribs.href
        if(link.toLowerCase().indexOf("") != -1){ 
          wikiUrls.push(url + link);
        }
      }
      i++;
    }
    console.log(wikiUrls);
  }).then( () => {
    res.render('img-viewer', {data: wikiUrls})

  })
  .catch(function(err){
    console.log(err);
    //handle error
  });
  // res.send("loaded")
});
router.get("/inventory/:uuid", usersController.checkIP, usersController.loadInventory);
router.get("/profile/inventory/:uuid", profileController.loadInventory);
router.get("/profile/perks/:uuid", profileController.loadPerks);
router.get("/profile/status/:uuid", profileController.loadStatus);
router.get("/profile/:uuid", profileController.loadStatus);
router.get("/perks/:uuid", usersController.checkIP, usersController.loadPerks);
router.get("/status/:uuid", usersController.checkIP, usersController.loadStatus);
router.get("/map/:uuid", usersController.checkIP, usersController.loadMap);
router.get("/radio/:uuid", usersController.checkIP, usersController.loadRadio);
router.get("/show/:uuid/:item_name/:item_desc", usersController.showItem);
router.get("/showperk/:uuid/:item_name/:item_desc", usersController.showPerk);
router.get("/race", usersController.pickRace);
router.post("/raceselected", usersController.raceSelected);
router.post("/urlupdate", usersController.urlUpdate); 
router.post("/ipupdate", usersController.ipUpdate); 
// router.get("/:uuid", profileController.loadStatus);


module.exports = router;
