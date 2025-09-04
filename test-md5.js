// test-md5.js
const crypto = require('crypto');
const password = '33683328Ee@'; // Replace with the password you entered
const salt = 'aaaaf914c1f005f862f3543ffb7a1111';
const hash = crypto.createHash('md5').update(password + salt).digest('hex');
console.log('Input password:', password);
console.log('Generated hash:', hash);
console.log('Stored hash:', '8bf0b17f827f7b802152ee9eca48ab8c');