const fs = require('fs');
require('dotenv').config();

const axios = require('axios');
const geocodeAPIBase = 'https://maps.googleapis.com/maps/api/geocode/json';
const sheetsAPIBase = 'https://sheets.googleapis.com/v4/spreadsheets';

const buildData = async () => {
  const { data: { values: sheetsData } } = await axios.get(`${sheetsAPIBase}/15ulCcgxJN56_NkLGAePnkXOL_ISTxLyjXKKmbPwLLNU/values/sheet1?key=${process.env.GOOGLE_API}`);
  const headers = sheetsData[0];
  const data = sheetsData.slice(1);

  const preData = data.map(row => {
    return row.reduce((result, prop, index) => {
      return {
        ...result,
        ...{[headers[index]]: prop},
      }
    }, {});
  });

  const markers = await Promise.all(
    preData.filter(v => !!v.destination).map(async obj => {
      let coordinates = [];
      let results;
      if (obj.destination) {
        try {
          results = await axios.get(`${geocodeAPIBase}?address=${obj.destination}&key=${process.env.GOOGLE_API}`)

          if (results.status === 200 && results.data.results.length) {
            coordinates = await Object.values(results.data.results[0].geometry.location);
          }

          return {
            ...obj,
            coordinates,
            value: 1,
          }
        } catch (err) {
          console.log('/// errr', err);
        }
      }
    })
  );

  fs.writeFileSync('./src/data/mannbassadors.json', JSON.stringify(markers));
}

buildData();