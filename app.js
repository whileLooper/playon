const prompt = require('prompt');
const request = require('request');
const StarWar = require('./starwar.service');

//
// Start the prompt
//
prompt.start();

prompt.get('Planet Name', function (err, result) {

  let planetName = '';
  let starWar = new StarWar();
  let promises = [];
  let planets = {};
  let residentsList = {};

  // user input validation
  if (!result['Planet Name'] || result['Planet Name'].length <= 0) {
    console.log('Please enter a valid planet name.');
    return;
  } else {
    planetName = result['Planet Name'].toLowerCase();
    residentsList = {
      [result['Planet Name']]: []
    };
  }

  // create promises array to contain each each planet page promise
  for (let i = 1; i <= 7; i++) {
    let temp = starWar.getPlanets(i);
    promises.push(temp);
  }

  Promise.all(promises).then(function(res) {
    // initializing planets object
    res.map(function(page) {
      page['results'].map(function(planet) {
        planets[planet['name'].toLowerCase()] = planet;
      })
    });

    // getting the specific planet information
    if (Object.keys(planets).length > 0) {

      let targetPlanet = planets[planetName];
      if (targetPlanet) {

        // get residents information from target planet
        if (targetPlanet['residents'].length > 0) {
          let residentPromises = [];

          // make a promise array
          targetPlanet['residents'].forEach(url => {
            residentPromises.push(starWar.getResidents(url));
          });

          // get all promise data
          Promise.all(residentPromises).then(function(res) {
            res.map(function(resident) {
              residentsList[result['Planet Name']].push(resident['name']);
            });

            // output planet name and resident list
            console.log(residentsList);
          });
        }

      } else {
        console.log('Planet not found');
        return;
      }
    }
    
  });
});
