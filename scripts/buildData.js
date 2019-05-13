const fs = require('fs');
const axios = require('axios');
const geocodeAPIBase = 'https://maps.googleapis.com/maps/api/geocode/json';

const buildData = async () => {
  const rawData = fs.readFileSync('./scripts/base.json');
  const json = JSON.parse(rawData);
  // const test = await axios.get(`${geocodeAPIBase}?address=${json[0].destination}&key=AIzaSyDOKI5cyYW8zZB2zO1kfnjz0cmN_PdicJs`);

  const markers = await Promise.all(
    json.map(async obj => {
      let coordinates = [];
      const results = await axios.get(`${geocodeAPIBase}?address=${obj.destination}&key=AIzaSyDOKI5cyYW8zZB2zO1kfnjz0cmN_PdicJs`);
      if (results.status === 200 & results.data.results.length) {
        coordinates = await Object.values(results.data.results[0].geometry.location);
      }
      return {
        ...obj,
        coordinates,
        value: 1,
      };
    })
  );
  fs.writeFileSync('./src/data/mannbassadors.json', JSON.stringify(markers));
}

buildData();