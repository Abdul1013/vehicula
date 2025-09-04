import fs from 'fs';
import path from 'path';

// Path to the JSON file in the public folder
const filePath = path.join(process.cwd(), 'public', 'areas.json');

const rawData = fs.readFileSync(filePath, 'utf-8');
const areas = JSON.parse(rawData);

// Extract only state names and LGA names as strings
const statesAndLgas = areas.map(state => ({
  state: state.state,
  lgas: state.lgas.map(lga => lga.name) // convert each LGA to just its name
}));

// Save to a new JSON file
const outputPath = path.join(process.cwd(), 'public', 'statesAndLgas.json');
fs.writeFileSync(outputPath, JSON.stringify(statesAndLgas, null, 2));

console.log('statesAndLgas.json created in public folder!');
