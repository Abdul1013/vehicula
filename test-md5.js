import fs from 'fs';

// Read the full file
const data = JSON.parse(fs.readFileSync('areas.json', 'utf-8'));

// Extract only state and LGA
const simplified = data.map(item => ({
  state: item.state,
  lgas: item.lga || item.lgas // adapt if your property name is different
}));

// Write to a new JSON file
fs.writeFileSync('states_lgas.json', JSON.stringify(simplified, null, 2));

console.log('states_lgas.json generated successfully!');
