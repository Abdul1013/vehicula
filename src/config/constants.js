// lib/constants.js
export const DB_CONFIG = {
  name: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
};

export const SECURITY = {
  salt: process.env.SALT,
  encryptionKey: process.env.ENCRYPTION_KEY,
};

export const SITE_INFO = {
  title: process.env.NEXT_PUBLIC_SITE_TITLE,
  subTitle: process.env.NEXT_PUBLIC_SITE_SUB_TITLE,
  mobileAbbr: process.env.NEXT_PUBLIC_MOBILE_ABBR,
};

export const SESSIONS = {
  main: process.env.SITE_MAIN_SESSION,
  temp: process.env.SITE_MAIN_SESSION_TMP,
  switch: process.env.SITE_SWITCH_SESSION,
  switchAdmin: process.env.SITE_SWITCH_SESSION_ADMIN,
  appMain: process.env.SITE_MAIN_SESSION_APP,
  switchDataHold: process.env.SWITCH_DATA_HOLD,
  switchCookieName: process.env.SWITCH_COOKIE_NAME,
  adminPayData: process.env.ADMIN_PAY_DATA,
  referralStr: process.env.REFERRAL_STR,
};

export const URLS = {
  fallBack: process.env.NEXT_PUBLIC_FALL_BACK,
  fallBackApp: process.env.NEXT_PUBLIC_FALL_BACK_APP,
  cdnBase: process.env.NEXT_PUBLIC_CDN_CUSTOM_BASE,
  cookieDomain: process.env.NEXT_PUBLIC_COOKIE_DOMAIN,
};

export const EMAILS = {
  sender: process.env.SENDER_EMAIL_ID,
  accounts: process.env.ACCOUNTS_EMAIL_ID,
  noReply: process.env.NO_REPLY_EMAIL_ID,
  author: process.env.AUTHOR_EMAIL_ID,
};

export const COMPANY = {
  full: process.env.NEXT_PUBLIC_DESIGN_COMPANY_FULL,
  short: process.env.NEXT_PUBLIC_DESIGN_COMPANY,
  url: process.env.NEXT_PUBLIC_DESIGN_COMPANY_URL,
};

export const DEFAULTS = {
  displayNameLength: parseInt(process.env.NEXT_PUBLIC_DISPLAY_NAME_LENGTH, 10),
  recordsLimit: parseInt(process.env.NEXT_PUBLIC_DEFAULT_RECORDS_LIMIT, 10),
  otpValidity: parseInt(process.env.NEXT_PUBLIC_OTP_VALIDITY, 10),
  otpLength: parseInt(process.env.NEXT_PUBLIC_OTP_LENGTH, 10),
  emailPart: process.env.NEXT_PUBLIC_DEFAULT_EMAIL_PART,
  themeColor: process.env.NEXT_PUBLIC_DEFAULT_THEME_COLOR,
};

export const PAYMENT = {
  paystackPublic: process.env.PAYSTACK_PUBLIC_KEY,
  paystackSecret: process.env.PAYSTACK_SECRET_KEY,
};

export const MESSAGING = {
  apiToken: process.env.MSG_API_TOKEN,
  senderId: process.env.MSG_SENDER_ID,
  simToken: process.env.SIM_TOKEN,
  simPhoneNumber: process.env.SIM_PHONE_NUMBER,
};

export const MONNIFY = {
  baseUrl: process.env.MON_BASE_URL,
  apiKey: process.env.MON_API_KEY,
  contractCode: process.env.MON_CONTRACT_CODE,
  secretKey: process.env.MON_SEC_KEY,
};

export const OTHER = {
  thumbnailPrefix: process.env.THUMBNAIL_PREFIX,
  agentRole: process.env.AGENT_ROLE,
  agentId: parseInt(process.env.AGENT_ID, 10),
};

// config/constants.js

export const DATABASE = process.env.DB_NAME;
export const USERNAME = process.env.DB_USER;
export const PASSWORD = process.env.DB_PASS;
export const SERVER = process.env.DB_HOST;

export const SALT = process.env.SALT;

export const SITE_TITLE = "Vehiculars";
export const SITE_SUB_TITLE = "Your Trusted Partner for Vehicle Services";
export const MOBILE_ABBR = "V_P";

export const SITE_MAIN_SESSION = "veh_pa";
export const SITE_MAIN_SESSION_TMP = "veh_pa_tmp";

export const FALL_BACK = "https://www.vehiculars.ng/";
export const FALL_BACK_APP = "https://www.app.vehiculars.ng/";

export const CDN_CUSTOM_BASE = "/home/vehiculars/public_html";
export const COOKIE_DOMAIN = ".vehiculars.ng";

export const SENDER_EMAIL_ID = process.env.SENDER_EMAIL_ID;
export const ACCOUNTS_EMAIL_ID = process.env.ACCOUNTS_EMAIL_ID;
export const NO_REPLY_EMAIL_ID = process.env.NO_REPLY_EMAIL_ID;
export const AUTHOR_EMAIL_ID = process.env.AUTHOR_EMAIL_ID;

export const DESIGN_COMPANY_FULL = "Transingenium";
export const DESIGN_COMPANY = "Transingenium";
export const DESIGN_COMPANY_URL = "https://www.transingenium.com";

export const DISPLAY_NAME_LENGTH = 10;
export const DEFAULT_RECORDS_LIMIT = 25;
export const OTP_VALIDITY = 15;
export const OTP_LENGTH = 6;
export const DEFAULT_EMAIL_PART = "@vehiculars.ng";
export const DEFAULT_THEME_COLOR = "#378261";

// Payment Keys
export const PAYSTACK_PUBLIC_KEY = process.env.PAYSTACK_PUBLIC_KEY;
export const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_SECRET_KEY;

// Messaging
export const MSG_API_TOKEN = process.env.MSG_API_TOKEN;
export const MSG_SENDER_ID = process.env.MSG_SENDER_ID;

// SIM
export const SIM_TOKEN = process.env.SIM_TOKEN;
export const SIM_PHONE_NUMBER = process.env.SIM_PHONE_NUMBER;

export const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY;

// File handling
export const THUMBNAIL_PREFIX = "thumb_";
export const BATCH_ID = "batch_id";

// Roles
export const AGENT_ROLE = "ag_role";
export const AGENT_ID = 1;

// Monnify
export const MON_BASE_URL = process.env.MON_BASE_URL;
export const MON_API_KEY = process.env.MON_API_KEY;
export const MON_CONTRACT_CODE = process.env.MON_CONTRACT_CODE;
export const MON_SEC_KEY = process.env.MON_SEC_KEY;

// Switch Session
export const SITE_SWITCH_SESSION = "veh_sw_sess";
export const SITE_SWITCH_SESSION_ADMIN = "veh_sw_sess_ad";
export const SITE_MAIN_SESSION_APP = "app_veh_pa";
export const SWITCH_DATA_HOLD = "veh_sw_data_hold";
export const SWITCH_COOKIE_NAME = "vc_ad";
export const ADMIN_PAY_DATA = "vc_ad_pay_data";
export const REFERRAL_STR = "v_ref_str";
