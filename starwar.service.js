const request = require('request');
const apiUrl = 'https://swapi.co/api/planets/';

module.exports = class StarWar {
  /**
   *Creates an instance of StarWar.
   */
  constructor() {}

  /**
   *Api request to get all planets information
   *
   * @param {*} link api link
   * @returns Object of planets information
   */
  getPlanets(page) {
    // set a default get planets link
    let url = apiUrl + '?page=' + page;

    return new Promise(function(resolve, reject) {
      // Do async job
      request.get(url, function(err, resp, body) {
        if (err) {
          reject(err);
        } else {
          resolve(JSON.parse(body));
        }
      });
    });
  }

  /**
   *a promise return residents information base on input url
   *
   * @param {*} url
   * @returns
   */
  getResidents(url) {
    return new Promise(function(resolve, reject) {
      request.get(url, function(err, resp, body) {
        if (err) {
          reject(err);
        } else {
          resolve(JSON.parse(body));
        }
      });
    });
  }

  /**
   *convert array to object, use planet name as key, planet detail as value
   *
   * @param {*} data
   */
  convertToObject(data) {
    if (data && Array.isArray(data) && data.length > 0) {
      data.map(function(planet) {
        this.planets[planet['name']] = planet;
      });
    }

    return this.planets;
  }
};
