// lib/crypto.js
import crypto from 'crypto';

const ENC_KEY = process.env.ENCRYPTION_KEY || 'change_this_key_please';
const AES_BLOCK_SIZE = 16;

/**
 * AES-256-CBC encrypt -> base64 (compat with PHP openssl_encrypt + base64)
 * Mirrors PHP encrypt() wrapper in your functions.php
 */
export function aes256Encrypt(plaintext) {
  const key = Buffer.from(ENC_KEY, 'utf8');
  const iv = Buffer.alloc(16, 0); // zero IV used to match PHP behaviour of padding substring
  const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key).slice(0, 32), iv);
  let encrypted = cipher.update(String(plaintext), 'utf8', 'base64');
  encrypted += cipher.final('base64');
  return encrypted;
}

/**
 * AES-256-CBC decrypt (expects base64 input)
 */
export function aes256Decrypt(base64Ciphertext) {
  try {
    const key = Buffer.from(ENC_KEY, 'utf8');
    const iv = Buffer.alloc(16, 0);
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key).slice(0, 32), iv);
    let decrypted = decipher.update(String(base64Ciphertext), 'base64', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  } catch (e) {
    console.error('aes256Decrypt error', e);
    return false;
  }
}

/**
 * AES-128-CTR encrypt/decrypt with fixed IV to match original PHP encryptDecryptOpenSSl behaviour.
 * WARNING: The original PHP used a fixed IV and a constant encryption_key — insecure for production.
 * We keep same semantics here for compatibility but recommend switching to unique IVs.
 *
 * type = 'encrypt' | 'decrypt'
 */
export function aes128ctr(simpleString, type = 'encrypt') {
  const algorithm = 'aes-128-ctr';
  // Using same IV as PHP ('1234567891011121')
  const iv = Buffer.from('1234567891011121', 'utf8').slice(0, 16);
  const key = Buffer.from(process.env.OPENSSL_GENERIC_KEY || 'genericEncDecKey', 'utf8').slice(0, 16);

  if (type === 'encrypt') {
    const cipher = crypto.createCipheriv(algorithm, key, iv);
    let encrypted = cipher.update(String(simpleString), 'utf8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted;
  } else {
    try {
      const decipher = crypto.createDecipheriv(algorithm, key, iv);
      let decrypted = decipher.update(String(simpleString), 'base64', 'utf8');
      decrypted += decipher.final('utf8');
      return decrypted;
    } catch (e) {
      console.error('aes128ctr decrypt error', e);
      return false;
    }
  }
}

/**
 * Replace for mc_encrypt / mc_decrypt using AES-256-CBC + HMAC-SHA256 to emulate mac+encrypt scheme.
 * I serialize JSON rather than PHP serialize (compatible data format change).
 */
export function mcEncrypt(objectOrString, hexKey) {
  const payload = typeof objectOrString === 'string' ? objectOrString : JSON.stringify(objectOrString);
  const key = Buffer.from(hexKey, 'hex'); // original used pack('H*', $key)
  // generate random iv
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv('aes-256-cbc', key.slice(0, 32), iv);
  const encrypted = Buffer.concat([cipher.update(payload, 'utf8'), cipher.final()]);
  const mac = crypto.createHmac('sha256', key.slice(-32)).update(payload).digest();
  const out = `${encrypted.toString('base64')}|${iv.toString('base64')}|${mac.toString('base64')}`;
  return out;
}

export function mcDecrypt(compound, hexKey) {
  try {
    const key = Buffer.from(hexKey, 'hex');
    const [encB64, ivB64, macB64] = String(compound).split('|');
    const iv = Buffer.from(ivB64, 'base64');
    const encrypted = Buffer.from(encB64, 'base64');
    const mac = Buffer.from(macB64, 'base64');

    const decipher = crypto.createDecipheriv('aes-256-cbc', key.slice(0, 32), iv);
    const decryptedBuf = Buffer.concat([decipher.update(encrypted), decipher.final()]);
    const decrypted = decryptedBuf.toString('utf8');

    const calcMac = crypto.createHmac('sha256', key.slice(-32)).update(decrypted).digest();
    if (!crypto.timingSafeEqual(calcMac, mac)) {
      return false;
    }
    // attempt parse JSON, fallback to string
    try {
      return JSON.parse(decrypted);
    } catch (e) {
      return decrypted;
    }
  } catch (e) {
    console.error('mcDecrypt error', e);
    return false;
  }
}

/**
 * Port of PHP's encryptdecrypt (we ported the exact bitwise logic)
 * Note: this function uses weird bitwise ops from original and kept for compatibility.
 */
export function encryptdecrypt(inputStr, ky = '') {
  if (!ky) return inputStr;
  const key = ky.replace(/\x20/g, '');
  if (key.length < 8) throw new Error('key error');

  const kl = Math.min(key.length, 32);
  const k = [];
  for (let i = 0; i < kl; i++) {
    k[i] = key.charCodeAt(i) & 0x1f;
  }

  let j = 0;
  const input = Array.from(String(inputStr));
  for (let i = 0; i < input.length; i++) {
    const e = input[i].charCodeAt(0);
    // e & 0xE0 ? chr(e ^ k[j]) : chr(e)
    const outChar = (e & 0xe0) ? String.fromCharCode(e ^ k[j]) : String.fromCharCode(e);
    input[i] = outChar;
    j++;
    if (j === kl) j = 0;
  }
  return input.join('');
}
