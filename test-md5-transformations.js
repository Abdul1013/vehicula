// test-md5-transformations.js
const crypto = require('crypto');
const password = '3383328Ee@';
const salt = 'aaaaf914c1f005f862f3543ffb7a1111';

const transformations = [
  { name: 'Original', value: password },
  { name: 'Lowercase', value: password.toLowerCase() },
  { name: 'Uppercase', value: password.toUpperCase() },
  { name: 'No spaces', value: password.replace(/\s/g, '') },
  { name: 'HTML escaped', value: password.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;') },
];

transformations.forEach(t => {
  const hash = crypto.createHash('md5').update(t.value + salt).digest('hex');
  const hashPrepend = crypto.createHash('md5').update(salt + t.value).digest('hex');
  console.log(`Input password (${t.name}, pwd + SALT): ${hash}`);
  console.log(`Input password (${t.name}, SALT + pwd): ${hashPrepend}`);
});
console.log('Stored hash:', '8bf0b17f827f7b802152ee9eca48ab8c');