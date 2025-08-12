/**
 * Some common routine functions (JS version)
 */

// Truncates a string by specified length, appends dots, optionally converts to uppercase
function truncate(string, length, dots = "...", toUpper = true) {
    const trimmed = string.trim();
    const finalStr =
        trimmed.length > length
            ? trimmed.substring(0, length - dots.length) + dots
            : trimmed;

    return toUpper ? finalStr.toUpperCase() : finalStr;
}

// Formats query result, returning "-1" for empty/false/0, otherwise the result
function formatQueryResult(resultSet) {
    const defaultVal = "-1";
    if (!resultSet || resultSet === false || resultSet === 0) {
        return defaultVal;
    }
    return resultSet;
}

// Formats insert result: returns "-1" if false, otherwise "1"
function formatInsertResult(insertResult) {
    return insertResult === false ? "-1" : "1";
}

// Formats query update result: returns "-1" if false, otherwise the result
function formatQueryUpdateResult(resultSet) {
    const defaultVal = "-1";
    if (resultSet === false) {
        return defaultVal;
    }
    return resultSet;
}

// Formats query delete result (same as update result)
function formatQueryDeleteResult(resultSet) {
    return formatQueryUpdateResult(resultSet);
}

// Creates a SEO-friendly URL string
function seoUrl(string) {
    return string
        .toLowerCase()
        .replace(/[^a-z0-9_\s-]/g, "") // Remove invalid chars
        .replace(/[\s-]+/g, " ")       // Collapse spaces/dashes
        .trim()
        .replace(/[\s_]/g, "-");       // Convert spaces/underscores to dashes
}

// Generates a random ID with a given length
function generateRandomID(length = 8) {
    let chars = "";
    do {
        chars += String(Date.now() * Math.floor(Math.random() * 1000));
    } while (chars.length <= length);
    return chars.substring(0, length);
}

// Masks email by replacing middle characters with asterisks
function maskEmail(email) {
    const charShown = 2;
    const mailParts = email.split("@");
    const username = mailParts[0];
    const len = username.length;

    if (len <= charShown) {
        return mailParts.join("@");
    }

    mailParts[0] =
        username.substring(0, charShown) +
        "*".repeat(len - charShown - 1) +
        username.substring(len - charShown + 1, len);

    return mailParts.join("@");
}

// Mask phone number
function maskPhone(phone) {
    const charShown = 2;
    const len = phone.length;

    if (len <= charShown) {
        return phone;
    }

    // Show first 2 characters, mask the middle, show last 2 characters
    return phone.substring(0, charShown) +
        '*'.repeat(len - charShown - 2) +
        phone.substring(len - charShown);
}

// Validate if string contains only numbers
function validateNumberElements(number) {
    number = number.trim();
    if (!number) {
        return false;
    }

    const validNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    for (let i = 0; i < number.length; i++) {
        const tmp = number[i];
        if (!validNumbers.includes(tmp)) {
            return false;
        }
    }
    return true;
}

// Execute HTTP GET request (replacement for cURL)
async function myCurlExecute(myHITurl) {
    try {
        const response = await fetch(myHITurl, { method: 'GET' });
        const fileContents = await response.text();
        return `0${CUSTOM_STRING_SEPARATOR}${fileContents}`; // 0 = no error
    } catch (error) {
        return `1${CUSTOM_STRING_SEPARATOR}${error.message}`; // 1 = error
    }
}

// Generate random string
function generateRandomString(length = 8, integersOnly = false, isCaseSensitive = false) {
    let characters;
    if (integersOnly) {
        characters = length > 9
            ? '1234567890123456789'
            : '0123456789';
    } else if (isCaseSensitive) {
        characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    } else {
        characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    }

    let randomString = '';
    for (let i = 0; i < length; i++) {
        randomString += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return randomString;
}

// Insert user details
async function insertUserDetails(txt_name, txt_phone, txt_email, txt_role, hash, txt_status, phone_verified, email_verified, ref_code, my_ref, loc, lga = null) {
    try {
        const qryInsert = await insertQuery(
            "bk_repository",
            "insertUserDetails",
            txt_name, txt_phone, txt_email, txt_role, hash, txt_status,
            phone_verified, email_verified, ref_code, my_ref, loc, lga
        );
        return formatInsertResult(qryInsert);
    } catch (error) {
        return "-1";
    }
}

async function insertOTPToDB(uid, otp_code_encrypt) {
    try {
        const qryInsert = await insertQuery(
            "vehiculars_otp_req_log",
            "insertOTPToDB",
            uid, otp_code_encrypt
        );
        return formatInsertResult(qryInsert);
    } catch (error) {
        return "-1";
    }
}

async function insertReminderDetails(rEmail, rPhone, rName, rPlate, rDate) {
    try {
        const qryInsert = await insertQuery(
            "vehicle_reminders",
            "insertReminderDetails",
            rEmail, rPhone, rName, rPlate, rDate
        );
        return formatInsertResult(qryInsert);
    } catch (error) {
        return "-1";
    }
}

async function insertNewsLetterEmail(rEmail) {
    try {
        const qryInsert = await insertQuery(
            "vehicle_news_letter",
            "insertNewsLetterEmail",
            rEmail
        );
        return formatInsertResult(qryInsert);
    } catch (error) {
        return "-1";
    }
}

async function doSuccessButFailedProcess(uid, reference, amnt) {
    try {
        const qryInsert = await insertQuery(
            "vehicle_pay_gate_unsaved",
            "doSuccessButFailedProcess",
            uid, reference, amnt
        );
        return formatInsertResult(qryInsert);
    } catch (error) {
        return "-1";
    }
}

async function insertDocumentDetails(
    txtSPlateID, txtSDocumentTitle, data_exp_date_db, data_issue_date_db,
    txtSDocumentPrice, txtSSubscriptionPlan, v_s_doc_upload, txtSNotes, record_by
) {
    try {
        const qryInsert = await insertQuery(
            "vehicle_subscriptions",
            "insertDocumentDetails",
            txtSPlateID, txtSDocumentTitle, data_exp_date_db, data_issue_date_db,
            txtSDocumentPrice, txtSSubscriptionPlan, v_s_doc_upload, txtSNotes, record_by
        );
        return formatInsertResult(qryInsert);
    } catch (error) {
        return "-1";
    }
}

// Insert
async function insertTransferRequest(
    pay_ref, source_req_id, req_destination, amnt,
    transfer_type, source_uid, destination_uid, transfer_status
) {
    try {
        const qryInsert = await insertQuery(
            "vehicle_service_transfers",
            "insertTransferRequest",
            pay_ref, source_req_id, req_destination, amnt,
            transfer_type, source_uid, destination_uid, transfer_status
        );
        return formatInsertResult(qryInsert);
    } catch (error) {
        return "-1";
    }
}

// Update
async function updateDocumentDetails(
    txtSPlateID, txtSDocumentTitle, data_exp_date_db, data_issue_date_db,
    txtSDocumentPrice, txtSSubscriptionPlan, v_s_doc_upload, txtSNotes,
    record_by, txtSRecordID
) {
    try {
        const qryUpdate = await updateQuery(
            "vehicle_subscriptions",
            "updateDocumentDetails",
            txtSPlateID, txtSDocumentTitle, data_exp_date_db, data_issue_date_db,
            txtSDocumentPrice, txtSSubscriptionPlan, v_s_doc_upload, txtSNotes,
            record_by, txtSRecordID
        );
        return formatQueryUpdateResult(qryUpdate);
    } catch (error) {
        return "-1";
    }
}

// Select
async function getCategoryByName(txt_catName) {
    try {
        const qryInfo = await selectQuery(
            "bk_cat",
            "getCategoryByName",
            txt_catName
        );
        return formatQueryResult(qryInfo);
    } catch (error) {
        return "-1";
    }
}

async function getUserDetailsByID(id) {
    try {
        const qryInfo = await selectQuery(
            "bk_repository",
            "getUserDetailsByID",
            id
        );
        return formatQueryResult(qryInfo);
    } catch (error) {
        return "-1";
    }
}

async function getValidAdminByID(id) {
    try {
        const qryInfo = await selectQuery(
            "bk_repository",
            "getValidAdminByID",
            id
        );
        return formatQueryResult(qryInfo);
    } catch (error) {
        return "-1";
    }
}

async function getUserInfoByPhoneAndPwd(phone, pwd) {
    try {
        const qryInfo = await selectQuery(
            "bk_repository",
            "getUserInfoByPhoneAndPwd",
            phone, pwd
        );
        return formatQueryResult(qryInfo);
    } catch (error) {
        return "-1";
    }
}

// Select
async function validateAdminPassword(id, pwd) {
    try {
        const qryInfo = await selectQuery(
            "bk_repository",
            "validateAdminPassword",
            id, pwd
        );
        return formatQueryResult(qryInfo);
    } catch (error) {
        return "-1";
    }
}

async function validateAdminNoPassword(uid) {
    try {
        const qryInfo = await selectQuery(
            "bk_repository",
            "validateAdminNoPassword",
            uid
        );
        return formatQueryResult(qryInfo);
    } catch (error) {
        return "-1";
    }
}

async function getUserInfoByIDAndPwd(id, pwd) {
    try {
        const qryInfo = await selectQuery(
            "bk_repository",
            "getUserInfoByIDAndPwd",
            id, pwd
        );
        return formatQueryResult(qryInfo);
    } catch (error) {
        return "-1";
    }
}

async function getUserDetailsByPhone(phone) {
    try {
        const qryInfo = await selectQuery(
            "bk_repository",
            "getUserDetailsByPhone",
            phone
        );
        return formatQueryResult(qryInfo);
    } catch (error) {
        return "-1";
    }
}

async function getServices() {
    try {
        const qryInfo = await selectQuery(
            "vehicle_services",
            "getServices"
        );
        return formatQueryResult(qryInfo);
    } catch (error) {
        return "-1";
    }
}

async function getCreditConstants() {
    try {
        const qryInfo = await selectQuery(
            "vehicle_credit_points",
            "getCreditConstants"
        );
        return formatQueryResult(qryInfo);
    } catch (error) {
        return "-1";
    }
}

// Select
async function getCurrentScore(uid) {
    try {
        const qryInfo = await selectQuery(
            "vehicle_customer_score",
            "getCurrentScore",
            uid
        );
        return formatQueryResult(qryInfo);
    } catch (error) {
        return "-1";
    }
}

async function getCurrentScoreGroup(tmpScore) {
    try {
        const qryInfo = await selectQuery(
            "vehicle_customer_score",
            "getCurrentScoreGroup",
            tmpScore
        );
        return formatQueryResult(qryInfo);
    } catch (error) {
        return "-1";
    }
}

async function getServiceOfferForCustomer(serviceId, uid) {
    try {
        const qryInfo = await selectQuery(
            "vehicle_customer_service_options",
            "getServiceOfferForCustomer",
            serviceId, uid
        );
        return formatQueryResult(qryInfo);
    } catch (error) {
        return "-1";
    }
}

async function getServicesByIDArray(qryStr) {
    try {
        const qryInfo = await selectQuery(
            "vehicle_service_sub",
            "getServicesByIDArray",
            qryStr
        );
        return formatQueryResult(qryInfo);
    } catch (error) {
        return "-1";
    }
}

async function getServiceRequestByIDUID(uid, reqId) {
    try {
        const qryInfo = await selectQuery(
            "vehicle_service_request",
            "getServiceRequestByIDUID",
            uid, reqId
        );
        return formatQueryResult(qryInfo);
    } catch (error) {
        return "-1";
    }
}

async function getVehicleNotifySettings() {
    try {
        const qryInfo = await selectQuery(
            "vehicle_notify_settings",
            "getVehicleNotifySettings"
        );
        return formatQueryResult(qryInfo);
    } catch (error) {
        return "-1";
    }
}

async function getServiceRequestByID(reqId) {
    try {
        const qryInfo = await selectQuery(
            "vehicle_service_request",
            "getServiceRequestByID",
            reqId
        );
        return formatQueryResult(qryInfo);
    } catch (error) {
        return "-1";
    }
}

async function getServiceRequestDetailsByUID(uid, reqId) {
    try {
        const qryInfo = await selectQuery(
            "vehicle_service_request",
            "getServiceRequestDetailsByUID",
            uid, reqId
        );
        return formatQueryResult(qryInfo);
    } catch (error) {
        return "-1";
    }
}

async function getServicesByLoc(loc) {
    try {
        const qryInfo = await selectQuery(
            "vehicle_service_request",
            "getServicesByLoc",
            loc
        );
        return formatQueryResult(qryInfo);
    } catch (error) {
        return "-1";
    }
}

async function getServiceRequestByBatchUID(uid, batchId) {
    try {
        const qryInfo = await selectQuery(
            "vehicle_service_request",
            "getServiceRequestByBatchUID",
            uid, batchId
        );
        return formatQueryResult(qryInfo);
    } catch (error) {
        return "-1";
    }
}

async function getServiceByBatchIDUID(batchId, uid) {
    try {
        const qryInfo = await selectQuery(
            "vehicle_service_batch",
            "getServiceByBatchIDUID",
            batchId, uid
        );
        return formatQueryResult(qryInfo);
    } catch (error) {
        return "-1";
    }
}

async function getServiceByReqIDUID(reqId, uid) {
    try {
        const qryInfo = await selectQuery(
            "vehicle_service_batch",
            "getServiceByReqIDUID",
            reqId, uid
        );
        return formatQueryResult(qryInfo);
    } catch (error) {
        return "-1";
    }
}

async function getServiceByUID(uid) {
    try {
        const qryInfo = await selectQuery(
            "vehicle_service_batch",
            "getServiceByUID",
            uid
        );
        return formatQueryResult(qryInfo);
    } catch (error) {
        return "-1";
    }
}

// Select
async function getServiceByIDUID(uid, serviceId) {
    try {
        const qryInfo = await selectQuery(
            "vehicle_service_batch",
            "getServiceByIDUID",
            uid, serviceId
        );
        return formatQueryResult(qryInfo);
    } catch (error) {
        return "-1";
    }
}

async function getVG1MByIDUID(uid, vssId) {
    try {
        const qryInfo = await selectQuery(
            "vehicle_service_batch",
            "getVG1MByIDUID",
            uid, vssId
        );
        return formatQueryResult(qryInfo);
    } catch (error) {
        return "-1";
    }
}

async function getServiceByBatchID(batchId) {
    try {
        const qryInfo = await selectQuery(
            "vehicle_service_batch",
            "getServiceByBatchID",
            batchId
        );
        return formatQueryResult(qryInfo);
    } catch (error) {
        return "-1";
    }
}

async function getBatchByID(thisBatchId) {
    try {
        const qryInfo = await selectQuery(
            "vehicle_service_batch",
            "getBatchByID",
            thisBatchId
        );
        return formatQueryResult(qryInfo);
    } catch (error) {
        return "-1";
    }
}

async function getBatchByIDWithReq(thisBatchId) {
    try {
        const qryInfo = await selectQuery(
            "vehicle_service_batch",
            "getBatchByIDWithReq",
            thisBatchId
        );
        return formatQueryResult(qryInfo);
    } catch (error) {
        return "-1";
    }
}

async function getBatchByUID(uid) {
    try {
        const qryInfo = await selectQuery(
            "vehicle_service_batch",
            "getBatchByUID",
            uid
        );
        return formatQueryResult(qryInfo);
    } catch (error) {
        return "-1";
    }
}

async function getBatchByUIDPartial(uid) {
    try {
        const qryInfo = await selectQuery(
            "vehicle_service_batch",
            "getBatchByUIDPartial",
            uid
        );
        return formatQueryResult(qryInfo);
    } catch (error) {
        return "-1";
    }
}

async function getBatchByUIDInProgress(uid) {
    try {
        const qryInfo = await selectQuery(
            "vehicle_service_batch",
            "getBatchByUIDInProgress",
            uid
        );
        return formatQueryResult(qryInfo);
    } catch (error) {
        return "-1";
    }
}

async function getBatchByUIDCompleted(uid) {
    try {
        const qryInfo = await selectQuery(
            "vehicle_service_batch",
            "getBatchByUIDCompleted",
            uid
        );
        return formatQueryResult(qryInfo);
    } catch (error) {
        return "-1";
    }
}
async function getBatchByUIDLoan(uid) {
    try {
        const qryInfo = await selectQuery(
            "vehicle_service_batch",
            "getBatchByUIDLoan",
            uid
        );
        return formatQueryResult(qryInfo);
    } catch (error) {
        return "-1";
    }
}

async function getBadges() {
    try {
        const qryInfo = await selectQuery(
            "vehicle_service_badge",
            "getBadges"
        );
        return formatQueryResult(qryInfo);
    } catch (error) {
        return "-1";
    }
}

async function getBadgeGroup(score) {
    try {
        const qryInfo = await selectQuery(
            "vehicle_service_badge",
            "getBadgeGroup",
            score
        );
        return formatQueryResult(qryInfo);
    } catch (error) {
        return "-1";
    }
}

async function getBatchPaymentByReference(reference) {
    try {
        const qryInfo = await selectQuery(
            "vehicle_service_batch_pay",
            "getBatchPaymentByReference",
            reference
        );
        return formatQueryResult(qryInfo);
    } catch (error) {
        return "-1";
    }
}

async function getBatchPaymentByBatchID(batchId) {
    try {
        const qryInfo = await selectQuery(
            "vehicle_service_batch_pay",
            "getBatchPaymentByBatchID",
            batchId
        );
        return formatQueryResult(qryInfo);
    } catch (error) {
        return "-1";
    }
}

async function getSubServices() {
    try {
        const qryInfo = await selectQuery(
            "vehicle_service_sub",
            "getSubServices"
        );
        return formatQueryResult(qryInfo);
    } catch (error) {
        return "-1";
    }
}

async function getSubServicesRegion(locId) {
    try {
        const qryInfo = await selectQuery(
            "vehicle_service_sub",
            "getSubServicesRegion",
            locId
        );
        return formatQueryResult(qryInfo);
    } catch (error) {
        return "-1";
    }
}

async function getAllRegions() {
    try {
        const qryInfo = await selectQuery(
            "regions",
            "getAllRegions"
        );
        return formatQueryResult(qryInfo);
    } catch (error) {
        return "-1";
    }
}

async function getRegionByID(id) {
    try {
        const qryInfo = await selectQuery(
            "regions",
            "getRegionByID",
            id
        );
        return formatQueryResult(qryInfo);
    } catch (error) {
        return "-1";
    }
}

async function getUserByRefCode(refCode) {
    try {
        const qryInfo = await selectQuery(
            "bk_repository",
            "getUserByRefCode",
            refCode
        );
        return formatQueryResult(qryInfo);
    } catch (error) {
        return "-1";
    }
}

async function getUserDetailsByIDNoCheck(id) {
    try {
        const qryInfo = await selectQuery(
            "bk_repository",
            "getUserDetailsByIDNoCheck",
            id
        );
        return formatQueryResult(qryInfo);
    } catch (error) {
        return "-1";
    }
}

async function getCustomersCountAgent(startDate, endDate, uid, refCode) {
    try {
        const qryInfo = await selectQuery(
            "bk_repository",
            "getCustomersCountAgent",
            startDate,
            endDate,
            uid,
            refCode
        );
        return formatQueryResult(qryInfo);
    } catch (error) {
        return "-1";
    }
}

async function getCustomersAgentData(startDate, endDate, uid, refCode) {
    try {
        const qryInfo = await selectQuery(
            "bk_repository",
            "getCustomersAgentData",
            startDate,
            endDate,
            uid,
            refCode
        );
        return formatQueryResult(qryInfo);
    } catch (error) {
        return "-1";
    }
}

async function getNonAdminUsersAgent(agentId, refCode) {
    try {
        const qryInfo = await selectQuery(
            "bk_repository",
            "getNonAdminUsersAgent",
            agentId,
            refCode
        );
        return formatQueryResult(qryInfo);
    } catch (error) {
        return "-1";
    }
}

async function getNonAdminUsersAgentFilter(q, agentId, refCode) {
    try {
        const qryInfo = await selectQuery(
            "bk_repository",
            "getNonAdminUsersAgentFilter",
            q,
            `%${q}%`,
            agentId,
            refCode
        );
        return formatQueryResult(qryInfo);
    } catch (error) {
        return "-1";
    }
}

async function getNoTransactionsByCustomer(agentId, agentReff) {
    try {
        const qryInfo = await selectQuery(
            "bk_repository",
            "getNoTransactionsByCustomer",
            agentId,
            agentReff
        );
        return formatQueryResult(qryInfo);
    } catch (error) {
        return "-1";
    }
}

async function getTransactionsDelivered(agentId, agentReff) {
    try {
        const qryInfo = await selectQuery(
            "bk_repository",
            "getTransactionsDelivered",
            agentId,
            agentReff
        );
        return formatQueryResult(qryInfo);
    } catch (error) {
        return "-1";
    }
}

async function getTransactionsSummary(agentId, agentReff) {
    try {
        const qryInfo = await selectQuery(
            "bk_repository",
            "getTransactionsSummary",
            agentId,
            agentReff
        );
        return formatQueryResult(qryInfo);
    } catch (error) {
        return "-1";
    }
}

async function getUserDetailsByEmail(email) {
    try {
        const qryInfo = await selectQuery(
            "bk_repository",
            "getUserDetailsByEmail",
            email
        );
        return formatQueryResult(qryInfo);
    } catch (error) {
        return "-1";
    }
}

async function getAllUsers() {
    try {
        const qryInfo = await selectQuery("bk_repository", "getAllUsers");
        return formatQueryResult(qryInfo);
    } catch (error) {
        return "-1";
    }
}

async function getUserOTP(uid) {
    try {
        const qryInfo = await selectQuery("vehiculars_otp_req_log", "getUserOTP", uid);
        return formatQueryResult(qryInfo);
    } catch (error) {
        return "-1";
    }
}

async function getPlateCntByCat(cat) {
    try {
        const qryInfo = await selectQuery("vehicule_plate_numbers", "getPlateCntByCat", cat);
        return formatQueryResult(qryInfo);
    } catch (error) {
        return "-1";
    }
}

async function getCarDetails(phone) {
    let sessId = "-1";
    if (session?.[SITE_MAIN_SESSION] && session[SITE_MAIN_SESSION] !== "") {
        sessId = session[SITE_MAIN_SESSION];
    }
    try {
        const qryInfo = await selectQuery("vehicule_plate_numbers", "getCarDetails", phone, sessId);
        return formatQueryResult(qryInfo);
    } catch (error) {
        return "-1";
    }
}

async function getCarDetailsRelated(phone, plateNo) {
    let sessId = "-1";
    if (session?.[SITE_MAIN_SESSION] && session[SITE_MAIN_SESSION] !== "") {
        sessId = session[SITE_MAIN_SESSION];
    }
    try {
        const qryInfo = await selectQuery("vehicule_plate_numbers", "getCarDetailsRelated", phone, plateNo, sessId);
        return formatQueryResult(qryInfo);
    } catch (error) {
        return "-1";
    }
}

async function getVechicleTypes() {
    try {
        const qryInfo = await selectQuery("vehicle_type", "getVechicleTypes");
        return formatQueryResult(qryInfo);
    } catch (error) {
        return "-1";
    }
}

async function getFullPayments() {
    try {
        const qryInfo = await selectQuery("vehicle_price_chart", "getFullPayments");
        return formatQueryResult(qryInfo);
    } catch (error) {
        return "-1";
    }
}

async function getVechicleCategories() {
    try {
        const qryInfo = await selectQuery("vehicle_categories", "getVechicleCategories");
        return formatQueryResult(qryInfo);
    } catch (error) {
        return "-1";
    }
}

async function getCarDetailsPlateByID(id) {
    let sessId = "-1";
    if (session?.[SITE_MAIN_SESSION] && session[SITE_MAIN_SESSION] !== "") {
        sessId = session[SITE_MAIN_SESSION];
    }
    try {
        const qryInfo = await selectQuery("vehicule_plate_numbers", "getCarDetailsPlateByID", id, sessId);
        return formatQueryResult(qryInfo);
    } catch (error) {
        return "-1";
    }
}

async function getProductDetails(editId) {
    let sessId = "-1";
    if (session?.[SITE_MAIN_SESSION] && session[SITE_MAIN_SESSION] !== "") {
        sessId = session[SITE_MAIN_SESSION];
    }
    try {
        const qryInfo = await selectQuery("vehicle_product_users", "getProductDetails", editId, sessId);
        return formatQueryResult(qryInfo);
    } catch (error) {
        return "-1";
    }
}

async function getProductDetailsByCode(editId) {
    let sessId = "-1";
    if (session?.[SITE_MAIN_SESSION] && session[SITE_MAIN_SESSION] !== "") {
        sessId = session[SITE_MAIN_SESSION];
    }
    try {
        const qryInfo = await selectQuery("vehicle_product_users", "getProductDetailsByCode", editId, sessId);
        return formatQueryResult(qryInfo);
    } catch (error) {
        return "-1";
    }
}

async function getProductDetailsByID(uid) {
    try {
        const qryInfo = await selectQuery("vehicle_product_users", "getProductDetailsByID", uid);
        return formatQueryResult(qryInfo);
    } catch (error) {
        return "-1";
    }
}

async function getTotalPayProduct(productType) {
    let sessId = "-1";
    if (session?.[SITE_MAIN_SESSION] && session[SITE_MAIN_SESSION] !== "") {
        sessId = session[SITE_MAIN_SESSION];
    }
    try {
        const qryInfo = await selectQuery("vehicle_product", "getTotalPayProduct", productType, sessId);
        return formatQueryResult(qryInfo);
    } catch (error) {
        return "-1";
    }
}

async function getTotalPayByID(uid) {
    try {
        const qryInfo = await selectQuery("vehicle_product", "getTotalPayByID", uid);
        return formatQueryResult(qryInfo);
    } catch (error) {
        return "-1";
    }
}

async function getTotalPaidForBatch(batchId) {
    try {
        const qryInfo = await selectQuery("vehicle_service_batch_pay", "getTotalPaidForBatch", batchId);
        return formatQueryResult(qryInfo);
    } catch (error) {
        return "-1";
    }
}

async function getGoalsTotalPaid(vsId, minVgAmnt) {
    try {
        const qryInfo = await selectQuery("vehicle_service_batch_pay", "getGoalsTotalPaid", vsId, minVgAmnt);
        return formatQueryResult(qryInfo);
    } catch (error) {
        return "-1";
    }
}

async function insertPlateDetails(personId, txtPlateNumber, txtVehicleCategory, txtVehicleType) {
    try {
        const qryInsert = await insertQuery("vehicule_plate_numbers", "insertPlateDetails", personId, txtPlateNumber, txtVehicleCategory, txtVehicleType);
        return formatInsertResult(qryInsert);
    } catch (error) {
        return "-1";
    }
}

async function insertProductDetails(txtProductType, uid, txtPTarget, installments) {
    try {
        const qryInsert = await insertQuery("vehicle_product_users", "insertProductDetails", txtProductType, uid, txtPTarget, installments);
        return formatInsertResult(qryInsert);
    } catch (error) {
        return "-1";
    }
}

async function addProductPayment(uid, amnt, productCode, reference, prUId) {
    try {
        const qryInsert = await insertQuery("vehicle_product", "addProductPayment", uid, amnt, productCode, reference, prUId);
        return formatInsertResult(qryInsert);
    } catch (error) {
        return "-1";
    }
}

async function updatePlateDetails(personId, txtPlateNumber, txtVehicleCategory, txtVehicleType, txtAddRecordID) {
    try {
        const qryUpdate = await updateQuery("vehicule_plate_numbers", "updatePlateDetails", personId, txtPlateNumber, txtVehicleCategory, txtVehicleType, txtAddRecordID);
        return formatQueryUpdateResult(qryUpdate);
    } catch (error) {
        return "-1";
    }
}

async function updateProductDetails(txtProductType, uid, txtPTarget, installments, txtPRecordID) {
    try {
        const qryUpdate = await updateQuery("vehicle_product_users", "updateProductDetails", txtProductType, uid, txtPTarget, installments, txtPRecordID);
        return formatQueryUpdateResult(qryUpdate);
    } catch (error) {
        return "-1";
    }
}

async function updateUserDetails(txtName, txtEmail, address, pLocation, pLGA, txtUId) {
    try {
        const qryUpdate = await updateQuery("bk_repository", "updateUserDetails", txtName, txtEmail, address, pLocation, pLGA, txtUId);
        return formatQueryUpdateResult(qryUpdate);
    } catch (error) {
        return "-1";
    }
}

async function updateUserPassword(nHash, txtUId) {
    try {
        const qryUpdate = await updateQuery("bk_repository", "updateUserPassword", nHash, txtUId);
        return formatQueryUpdateResult(qryUpdate);
    } catch (error) {
        return "-1";
    }
}

async function updateCustomerScore(tmpNewScore, uid) {
    try {
        const qryUpdate = await updateQuery("bk_repository", "updateCustomerScore", tmpNewScore, uid);
        return formatQueryUpdateResult(qryUpdate);
    } catch (error) {
        return "-1";
    }
}

async function updateRegion(loc, uid) {
    try {
        const qryUpdate = await updateQuery("bk_repository", "updateRegion", loc, uid);
        return formatQueryUpdateResult(qryUpdate);
    } catch (error) {
        return "-1";
    }
}

async function updateRefCode(refCode, txtUId) {
    try {
        const qryUpdate = await updateQuery("bk_repository", "updateRefCode", refCode, txtUId);
        return formatQueryUpdateResult(qryUpdate);
    } catch (error) {
        return "-1";
    }
}
async function updateProfilePic(logoStr, pId) {
    try {
        const qryUpdate = await updateQuery("bk_repository", "updateProfilePic", logoStr, pId);
        return formatQueryUpdateResult(qryUpdate);
    } catch (error) {
        return "-1";
    }
}

async function updatePhoneStatus(newStatus, txtUId) {
    try {
        const qryUpdate = await updateQuery("bk_repository", "updatePhoneStatus", newStatus, txtUId);
        return formatQueryUpdateResult(qryUpdate);
    } catch (error) {
        return "-1";
    }
}

async function updateBatchDetails(payAmnt, payTotal, payOpt, reminderOpt, lastPaySplitStr, batchId) {
    try {
        const qryUpdate = await updateQuery("vehicle_service_batch", "updateBatchDetails", payAmnt, payTotal, payOpt, reminderOpt, lastPaySplitStr, batchId);
        return formatQueryUpdateResult(qryUpdate);
    } catch (error) {
        return "-1";
    }
}

async function updateRequestDetails(sFullName, sPhoneNumber, sAddress, sDob, reqId) {
    try {
        const qryUpdate = await updateQuery("vehicle_service_request", "updateRequestDetails", sFullName, sPhoneNumber, sAddress, sDob, reqId);
        return formatQueryUpdateResult(qryUpdate);
    } catch (error) {
        return "-1";
    }
}

async function updateBatchExtraFiles(upldStr, batchId) {
    try {
        const qryUpdate = await updateQuery("vehicle_service_batch", "updateBatchExtraFiles", upldStr, batchId);
        return formatQueryUpdateResult(qryUpdate);
    } catch (error) {
        return "-1";
    }
}

async function updateBatchSplitPay(splitStr, batchId) {
    try {
        const qryUpdate = await updateQuery("vehicle_service_batch", "updateBatchSplitPay", splitStr, batchId);
        return formatQueryUpdateResult(qryUpdate);
    } catch (error) {
        return "-1";
    }
}

async function updatePaySplit(splitStr, amnt, payId) {
    try {
        const qryUpdate = await updateQuery("vehicle_service_batch_pay", "updatePaySplit", splitStr, amnt, payId);
        return formatQueryUpdateResult(qryUpdate);
    } catch (error) {
        return "-1";
    }
}

async function updateTransferStatus(transferStatus, thisUid, payRef) {
    try {
        const qryUpdate = await updateQuery("vehicle_service_transfers", "updateTransferStatus", transferStatus, thisUid, payRef);
        return formatQueryUpdateResult(qryUpdate);
    } catch (error) {
        return "-1";
    }
}

async function updateServicePriceLock(priceLocStatus, transferStatus, thisUid, vsrId) {
    try {
        const qryUpdate = await updateQuery("vehicle_service_request", "updateServicePriceLock", priceLocStatus, transferStatus, thisUid, vsrId);
        return formatQueryUpdateResult(qryUpdate);
    } catch (error) {
        return "-1";
    }
}

async function updateRequestReminder(remindOpt, reqId) {
    try {
        const qryUpdate = await updateQuery("vehicle_service_request", "updateRequestReminder", remindOpt, reqId);
        return formatQueryUpdateResult(qryUpdate);
    } catch (error) {
        return "-1";
    }
}

async function updateVAPriorityPrice(vaPrice, vaDuration, reqId) {
    try {
        const qryUpdate = await updateQuery("vehicle_service_request", "updateVAPriorityPrice", vaPrice, vaDuration, reqId);
        return formatQueryUpdateResult(qryUpdate);
    } catch (error) {
        return "-1";
    }
}

async function updateServiceTransferStatus(status, userId, vsrId) {
    try {
        const qryUpdate = await updateQuery("vehicle_service_request", "updateServiceTransferStatus", status, userId, vsrId);
        return formatQueryUpdateResult(qryUpdate);
    } catch (error) {
        return "-1";
    }
}

async function toggleCoverNote(adminId, reqId) {
    try {
        const qryUpdate = await updateQuery("vehicle_service_request", "toggleCoverNote", adminId, reqId);
        return formatQueryUpdateResult(qryUpdate);
    } catch (error) {
        return "-1";
    }
}

async function toggleProcessingStatus(adminId, reqId) {
    try {
        const qryUpdate = await updateQuery("vehicle_service_request", "toggleProcessingStatus", adminId, reqId);
        return formatQueryUpdateResult(qryUpdate);
    } catch (error) {
        return "-1";
    }
}

async function updateVAStatus(reqId) {
    try {
        const qryUpdate = await updateQuery("vehicle_service_request", "updateVAStatus", reqId);
        return formatQueryUpdateResult(qryUpdate);
    } catch (error) {
        return "-1";
    }
}

async function toggleDSStatus(adminId, reqId) {
    try {
        const qryUpdate = await updateQuery("vehicle_service_request", "toggleDSStatus", adminId, reqId);
        return formatQueryUpdateResult(qryUpdate);
    } catch (error) {
        return "-1";
    }
}

async function markJobAsDelivered(status, dateStr, deliveryNotes, adminId, reqId) {
    try {
        const qryUpdate = await updateQuery(
            "vehicle_service_request",
            "markJobAsDelivered",
            status,
            dateStr,
            deliveryNotes,
            adminId,
            reqId
        );
        return formatQueryUpdateResult(qryUpdate);
    } catch (error) {
        return "-1";
    }
}

async function getDocumentsListByCar(type, cat) {
    try {
        const qryInfo = await selectQuery(
            "vehicle_price_chart",
            "getDocumentsListByCar",
            type,
            cat
        );
        return formatQueryResult(qryInfo);
    } catch (error) {
        return "-1";
    }
}

async function getSubPlan() {
    try {
        const qryInfo = await selectQuery(
            "vehicle_sub_plan_heading",
            "getSubPlan"
        );
        return formatQueryResult(qryInfo);
    } catch (error) {
        return "-1";
    }
}

async function getVehicleSubscriptionTotalAmount(plateId, sessionData) {
    let sessId = "-1";
    if (sessionData && sessionData[SITE_MAIN_SESSION]) {
        sessId = sessionData[SITE_MAIN_SESSION];
    }
    try {
        const qryInfo = await selectQuery(
            "vehicle_subscriptions",
            "getVehicleSubscriptionTotalAmount",
            plateId,
            sessId
        );
        return formatQueryResult(qryInfo);
    } catch (error) {
        return "-1";
    }
}

async function getVechicleDocuments() {
    try {
        const qryInfo = await selectQuery(
            "vehicle_documents",
            "getVechicleDocuments"
        );
        return formatQueryResult(qryInfo);
    } catch (error) {
        return "-1";
    }
}

async function getUserDLInfo(thisUid) {
    try {
        const qryInfo = await selectQuery("dl_application", "getUserDLInfo", thisUid);
        return formatQueryResult(qryInfo);
    } catch (error) {
        return "-1";
    }
}

async function getBatchPayByReqID(reqId) {
    try {
        const qryInfo = await selectQuery("vehicle_service_batch", "getBatchPayByReqID", reqId);
        return formatQueryResult(qryInfo);
    } catch (error) {
        return "-1";
    }
}

async function getInstallmentPlans() {
    try {
        const qryInfo = await selectQuery("vehicle_sub_plan_heading", "getInstallmentPlans");
        return formatQueryResult(qryInfo);
    } catch (error) {
        return "-1";
    }
}

async function getVehicleSubscriptionStatusCount(status) {
    try {
        const qryInfo = await selectQuery("vehicle_subscriptions", "getVehicleSubscriptionStatusCount", status);
        return formatQueryResult(qryInfo);
    } catch (error) {
        return "-1";
    }
}

async function getSubscriptionDetailsByID(id, sessionData) {
    let sessId = "-1";
    if (sessionData && sessionData[SITE_MAIN_SESSION]) {
        sessId = sessionData[SITE_MAIN_SESSION];
    }
    try {
        const qryInfo = await selectQuery("vehicle_subscriptions", "getSubscriptionDetailsByID", id, sessId);
        return formatQueryResult(qryInfo);
    } catch (error) {
        return "-1";
    }
}

async function getVehicleSubscriptionByPlate(plateId) {
    try {
        const qryInfo = await selectQuery("vehicle_subscriptions", "getVehicleSubscriptionByPlate", plateId);
        return formatQueryResult(qryInfo);
    } catch (error) {
        return "-1";
    }
}

async function deleteSubscription(docId) {
    try {
        const qryDelete = await deleteQuery("vehicle_subscriptions", "deleteSubscription", docId);
        return formatQueryDeleteResult(qryDelete);
    } catch (error) {
        return "-1";
    }
}

async function getSubscriptionByPlate(id, sessionData) {
    let sessId = "-1";
    if (sessionData && sessionData[SITE_MAIN_SESSION]) {
        sessId = sessionData[SITE_MAIN_SESSION];
    }
    try {
        const qryInfo = await selectQuery("vehicle_subscriptions", "getSubscriptionByPlate", id, sessId);
        return formatQueryResult(qryInfo);
    } catch (error) {
        return "-1";
    }
}

async function addPaymentReference(paymentRef, subIdExtract, toPay, pAmnt, notes, entryBy) {
    try {
        const qryInsert = await insertQuery("vehicle_sub_transactions", "addPaymentReference", paymentRef, subIdExtract, toPay, pAmnt, notes, entryBy);
        return formatInsertResult(qryInsert);
    } catch (error) {
        return "-1";
    }
}

async function addBatchPayment(batchId, amnt, reference, paySplit, response) {
    try {
        const qryInsert = await insertQuery("vehicle_service_batch_pay", "addBatchPayment", batchId, amnt, reference, paySplit, response);
        return formatInsertResult(qryInsert);
    } catch (error) {
        return "-1";
    }
}

async function addDLApplicationDetails(uid, firstName, surName, otherName, motherMaidenName, dateOfBirth, facialMark, bloodGroup, anyFormOfDisability, height, sex, licenceClass, nextOfKinPhoneNumber, stateOfOrigin, localGovernment, address, phoneNumber, emailAddress, nin) {
    try {
        const qryInsert = await insertQuery(
            "dl_application",
            "addDLApplicationDetails",
            uid, firstName, surName, otherName, motherMaidenName,
            dateOfBirth, facialMark, bloodGroup, anyFormOfDisability,
            height, sex, licenceClass, nextOfKinPhoneNumber,
            stateOfOrigin, localGovernment, address,
            phoneNumber, emailAddress, nin
        );
        return formatInsertResult(qryInsert);
    } catch (error) {
        return "-1";
    }
}

async function addSurplusAmount(paymentRef, plateId, amountLeft, pAmnt, entryBy) {
    try {
        const qryInsert = await insertQuery(
            "vehicle_surplus_pay",
            "addSurplusAmount",
            paymentRef, plateId, amountLeft, pAmnt, entryBy
        );
        return formatInsertResult(qryInsert);
    } catch (error) {
        return "-1";
    }
}

async function getVehicleSubscriptionPaid(plateId, sessionData) {
    let sessId = "-1";
    if (sessionData && sessionData[SITE_MAIN_SESSION]) {
        sessId = sessionData[SITE_MAIN_SESSION];
    }
    try {
        const qryInfo = await selectQuery(
            "vehicle_sub_transactions",
            "getVehicleSubscriptionPaid",
            plateId, sessId
        );
        return formatQueryResult(qryInfo);
    } catch (error) {
        return "-1";
    }
}

async function getPaymentsDone(plateId, sessionData) {
    let sessId = "-1";
    if (sessionData && sessionData[SITE_MAIN_SESSION]) {
        sessId = sessionData[SITE_MAIN_SESSION];
    }
    try {
        const qryInfo = await selectQuery(
            "vehicle_sub_transactions",
            "getPaymentsDone",
            plateId, sessId
        );
        return formatQueryResult(qryInfo);
    } catch (error) {
        return "-1";
    }
}

async function getVehicleSubPaidRecords(plateId, sessionData) {
    let sessId = "-1";
    if (sessionData && sessionData[SITE_MAIN_SESSION]) {
        sessId = sessionData[SITE_MAIN_SESSION];
    }
    try {
        const qryInfo = await selectQuery(
            "vehicle_sub_transactions",
            "getVehicleSubPaidRecords",
            plateId, sessId
        );
        return formatQueryResult(qryInfo);
    } catch (error) {
        return "-1";
    }
}

async function getTotalTransactionsByStatus(status, sessionData) {
    let sessId = "-1";
    if (sessionData && sessionData[SITE_MAIN_SESSION]) {
        sessId = sessionData[SITE_MAIN_SESSION];
    }
    try {
        const qryInfo = await selectQuery(
            "vehicle_sub_transactions",
            "getTotalTransactionsByStatus",
            status, sessId
        );
        return formatQueryResult(qryInfo);
    } catch (error) {
        return "-1";
    }
}
function getSessionId(sessionData) {
    return sessionData && sessionData[SITE_MAIN_SESSION] 
        ? sessionData[SITE_MAIN_SESSION] 
        : "-1";
}

async function getCarDetailsPlate(plate, sessionData) {
    const sessId = getSessionId(sessionData);
    try {
        const qryInfo = await selectQuery(
            "vehicule_plate_numbers",
            "getCarDetailsPlate",
            plate, sessId
        );
        return formatQueryResult(qryInfo);
    } catch (error) {
        return "-1";
    }
}

async function getCarDetailsPlateMine(plate, phone, sessionData) {
    const sessId = getSessionId(sessionData);
    try {
        const qryInfo = await selectQuery(
            "vehicule_plate_numbers",
            "getCarDetailsPlateMine",
            plate, phone, sessId
        );
        return formatQueryResult(qryInfo);
    } catch (error) {
        return "-1";
    }
}

async function deletePlateNumber(plateId) {
    try {
        const qryDelete = await deleteQuery(
            "vehicule_plate_numbers",
            "deletePlateNumber",
            plateId
        );
        return formatQueryDeleteResult(qryDelete);
    } catch (error) {
        return "-1";
    }
}

async function deleteProduct(productId, sessionData) {
    const sessId = getSessionId(sessionData);
    try {
        const qryDelete = await deleteQuery(
            "vehicle_product_users",
            "deleteProduct",
            productId, sessId
        );
        return formatQueryDeleteResult(qryDelete);
    } catch (error) {
        return "-1";
    }
}

async function deleteOTPRecord(uid) {
    try {
        const qryDelete = await deleteQuery(
            "vehiculars_otp_req_log",
            "deleteOTPRecord",
            uid
        );
        return formatQueryDeleteResult(qryDelete);
    } catch (error) {
        return "-1";
    }
}

async function deleteBatchServiceData(batchId) {
    try {
        const qryDelete = await deleteQuery(
            "vehicle_service_request",
            "deleteBatchServiceData",
            batchId
        );
        return formatQueryDeleteResult(qryDelete);
    } catch (error) {
        return "-1";
    }
}

async function deleteBatchServiceWithBatchID(batchId, servDel) {
    try {
        const qryDelete = await deleteQuery(
            "vehicle_service_request",
            "deleteBatchServiceWithBatchID",
            batchId, servDel
        );
        return formatQueryDeleteResult(qryDelete);
    } catch (error) {
        return "-1";
    }
}

async function deleteBatchData(batchId) {
    try {
        const qryDelete = await deleteQuery(
            "vehicle_service_batch",
            "deleteBatchData",
            batchId
        );
        return formatQueryDeleteResult(qryDelete);
    } catch (error) {
        return "-1";
    }
}

async function validateUser(sessionData) {
    let userData = {};

    if (sessionData && sessionData[SITE_MAIN_SESSION]) {
        const sessUID = sessionData[SITE_MAIN_SESSION];
        let userInfo;

        if (sessionData[SITE_SWITCH_SESSION_ADMIN]) {
            // admin can see account even with status off
            userInfo = await getUserDetailsByIDNoCheck(sessUID);
        } else {
            userInfo = await getUserDetailsByID(sessUID);
        }

        if (userInfo !== "-1") {
            for (const selQry of userInfo) {
                userData = selQry; // overwrites with the last record
            }
        }
    }
    return userData;
}

async function checkDeveloperMode(sessionData) {
    if (sessionData && sessionData[SITE_MAIN_SESSION]) {
        const sessUID = sessionData[SITE_MAIN_SESSION];
        const devCheck = await getUserDetailsByIDDeveloper(sessUID);

        if (devCheck === "-1") {
            redirect("restricted");
            return;
        }

        return mergeCartListItems("");
    } else {
        redirect("restricted");
    }
}

async function checkActiveSession(sessionData) {
    const uInfo = await validateUser(sessionData);
    // Be safe before redirecting - check if the expected key exists
    if (uInfo.hasOwnProperty("bk_uid")) {
        redirect("dashboard");
    }
}

async function checkInActiveSession(sessionData, checkPasswordUpdate = false, skipLocCheck = false) {
    const uInfo = await validateUser(sessionData);
    // Be safe before redirecting - check if the expected key exists
    if (!uInfo.hasOwnProperty("bk_uid")) {
        redirect("logout");
    }

    if (checkPasswordUpdate) {
        // check if login is first time
        if (uInfo.hasOwnProperty("hash_set") && parseInt(uInfo.hash_set, 10) === 0) {
            redirect("password-update");
        }
    }

    if (!skipLocCheck && uInfo.hasOwnProperty("bk_lga")) {
        if (!uInfo.bk_lga || !uInfo.bk_default_region || !uInfo.bk_address) {
            redirect("profile?msg=1");
        }
    }
    return uInfo;
}

function setStatusFeedback(status = "", msg = "", dismiss = true) {
    let theme = "";
    switch (status) {
        case "success":
            theme = "success";
            break;
        case "info":
            theme = "info";
            break;
        case "danger":
            theme = "danger";
            break;
        case "secondary":
            theme = "secondary";
            break;
        case "primary":
            theme = "primary";
            break;
        case "warning":
            theme = "warning";
            break;
        case "light":
            theme = "light";
            break;
        case "dark":
            theme = "dark";
            break;
        default:
            theme = "light";
            break;
    }

    if (dismiss) {
        return `
            <div class="cleaner15px"></div>
            <div class="alert alert-${theme} fade show alert-dismissible" role="alert">
                ${msg}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
            <div class="cleaner15px"></div>
        `;
    } else {
        return `
            <div class="cleaner15px"></div>
            <div class="alert alert-${theme} fade show" role="alert">
                ${msg}
            </div>
            <div class="cleaner15px"></div>
        `;
    }
}

function stripResourcForDB(ticket) {
    if (ticket && ticket.trim() !== "") {
        let res = "";
        ticket = ticket.trim().replace(/,$/, "");
        const linkArray = ticket.split(",");
        for (let ticketRes of linkArray) {
            const tmp = ticketRes;
            ticketRes = ticketRes.replace(CDN_PATH, "");
            if (tmp !== ticketRes) {
                ticketRes = ticketRes.replace(/^\/?/, "");
                ticketRes = "/" + ticketRes;
            }
            res += ticketRes + ",";
        }
        return res.replace(/,$/, "");
    } else {
        return null;
    }
}

function filterResourcFromDB(ticketResource) {
    if (ticketResource && ticketResource.trim() !== "") {
        let res = "";
        const linkArray = ticketResource.split(",");
        for (let ticketRes of linkArray) {
            if (ticketRes.includes("http")) {
                res += ticketRes + ",";
            } else {
                ticketRes = ticketRes.replace(/^\/?/, "");
                ticketRes = CDN_PATH + ticketRes;
                res += ticketRes + ",";
            }
        }
        return res.replace(/,$/, "");
    } else {
        return ticketResource;
    }
}

function processResourcForDisplay(ticketRes) {
    if (ticketRes && !ticketRes.includes("http")) {
        ticketRes = ticketRes.replace(/^\/?/, "");
        ticketRes = CDN_PATH + ticketRes;
    }
    return ticketRes;
}

function return_addr_url() {
    const protocol = (window.location.protocol === "https:") ? "https" : "http";
    return `${protocol}://${window.location.host}${window.location.pathname}${window.location.search}`;
}

function getTimeNowCustom() {
    // Africa/Lagos timezone offset is +1 or +2 depending on DST
    // We'll use Intl.DateTimeFormat for formatting
    const options = {
        timeZone: "Africa/Lagos",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
    };
    const now = new Date();
    const parts = new Intl.DateTimeFormat("en-CA", options).formatToParts(now);
    // Rebuild in Y-m-d H:i:s format
    const lookup = {};
    parts.forEach(p => { lookup[p.type] = p.value; });
    return `${lookup.year}-${lookup.month}-${lookup.day} ${lookup.hour}:${lookup.minute}:${lookup.second}`;
}

function returnStatusBadge(status, markupReplace = "", markupReplaceClass = "") {
    let active = `<i class='fas fa-check-circle'></i>`;
    let inactive = `<i class='fas fa-ban'></i>`;
    let activeClass = "text-success";
    let inactiveClass = "text-danger";

    if (markupReplace) {
        const arr = markupReplace.split("|");
        active = arr[0];
        inactive = arr[1];
    }
    if (markupReplaceClass) {
        const arr = markupReplaceClass.split("|");
        activeClass = arr[0];
        inactiveClass = arr[1];
    }

    return parseInt(status, 10) === 0
        ? `<span class="${inactiveClass}">${inactive}</span>`
        : `<span class="${activeClass}">${active}</span>`;
}

function returnPanelAccessBadge(panel) {
    return parseInt(panel, 10) === 0
        ? `<span class="badge bg-warning rounded-pill">No</span>`
        : `<span class="badge bg-success rounded-pill">Yes</span>`;
}

function filter_text_doc(abContent, addClass = true) {
    abContent = abContent.replace(/src='\/img/g, `src='${CDN_PATH}img`);
    abContent = abContent.replace(/src="\/img/g, `src="${CDN_PATH}img`);
    if (addClass) {
        abContent = abContent.replace(/<img/g, `<img class="img-fluid" `);
    }
    return abContent;
}

function filter_text_for_db(abContent) {
    abContent = abContent.replace(new RegExp(`src='${CDN_PATH}img`, "g"), `src='/img`);
    abContent = abContent.replace(new RegExp(`src="${CDN_PATH}img`, "g"), `src="/img`);
    return abContent;
}

function filter_url_res_for_DB(url) {
    if (url && url !== "#") {
        if (url.includes("http")) {
            url = url.replace(FALL_BACK, "");
            if (!url) {
                url = "/";
            }
        }
    }
    return url;
}

function filter_url_res_for_display(url) {
    if (url && url !== "#") {
        if (!url.includes("http")) {
            if (url === "/") {
                url = FALL_BACK;
            } else {
                url = FALL_BACK + url;
            }
        }
    }
    return url;
}

function returnAmount(amnt) {
    const amntNum = parseFloat(amnt);
    const decimals = amnt.toString().split(".");
    if (decimals.length > 1 && parseFloat(decimals[1]) > 0) {
        return returnNairaSymbol() + amntNum.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    return returnNairaSymbol() + amntNum.toLocaleString();
}

function returnNairaSymbol() {
    return "&#x20A6;";
}

function returnStrWith_S(str, chars) {
    if (parseInt(chars, 10) === 1) {
        return str;
    } else {
        if (str === "person") {
            return "people";
        }
        return str + "s";
    }
}

function timeago(date) {
    const timestamp = new Date(date).getTime() / 1000; // seconds
    const strTime = ["sec", "min", "hr", "day", "month", "yr"];
    const length = [60, 60, 24, 30, 12, 10];
    const currentTime = Math.floor(Date.now() / 1000);

    if (currentTime >= timestamp) {
        let diff = currentTime - timestamp;
        let i = 0;
        for (; diff >= length[i] && i < length.length - 1; i++) {
            diff = diff / length[i];
        }
        diff = Math.round(diff);
        return `${diff}${returnStrWith_S(strTime[i], diff)} ago`;
    } else {
        return new Date(date).toLocaleDateString("en-GB"); // dd/mm/yyyy
    }
}

function timeToCome(date, format_overdue_class = "text-danger") {
    const timestamp = new Date(date).getTime() / 1000; // seconds
    const strTime = ["sec", "min", "hr", "day", "month", "yr"];
    const length = [60, 60, 24, 30, 12, 10];
    const currentTime = Math.floor(Date.now() / 1000);

    if (currentTime <= timestamp) {
        let diff = timestamp - currentTime;
        let i = 0;
        for (; diff >= length[i] && i < length.length - 1; i++) {
            diff = diff / length[i];
        }
        diff = Math.round(diff);
        return `${diff}${returnStrWith_S(strTime[i], diff)}`;
    } else {
        let diff = currentTime - timestamp;
        let i = 0;
        for (; diff >= length[i] && i < length.length - 1; i++) {
            diff = diff / length[i];
        }
        diff = Math.round(diff);
        return `<span class='${format_overdue_class}'>${diff} ${returnStrWith_S(strTime[i], diff)} overdue</span>`;
    }
}

function thousand_format(number) {
    number = parseInt(String(number).replace(/[^0-9]/g, ''), 10);
    if (number >= 1000) {
        const format_number = number.toLocaleString();
        const ar_nbr = format_number.split(',');
        const x_parts = ['K', 'M', 'B', 'T', 'Q'];
        const x_count_parts = ar_nbr.length - 1;
        let dn = ar_nbr[0] + (parseInt(ar_nbr[1][0], 10) !== 0 ? '.' + ar_nbr[1][0] : '');
        dn += x_parts[x_count_parts - 1];
        return dn;
    }
    return number;
}

function statusArray() {
    return { 1: "Active", 0: "Inactive" };
}

function returnDateStr(date, date_type = []) {
    return new Date(date).toLocaleString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric',
        hour: 'numeric', minute: '2-digit', hour12: true
    });
}

function returnWeek(type) {
    let start_week = "", end_week = "";

    const getSundayMidnight = (date) => {
        const d = new Date(date);
        d.setHours(0, 0, 0, 0);
        const day = d.getDay();
        // Move to last Sunday
        d.setDate(d.getDate() - day);
        return d;
    };

    const getNextSaturday = (date) => {
        const d = new Date(date);
        const day = d.getDay();
        d.setDate(d.getDate() + (6 - day));
        d.setHours(23, 59, 59, 999);
        return d;
    };

    if (type === "last") {
        const previous_week = new Date();
        previous_week.setDate(previous_week.getDate() - 7 + 1);
        const start = getSundayMidnight(previous_week);
        const end = getNextSaturday(start);
        start_week = start.toISOString().slice(0, 19).replace("T", " ");
        end_week = end.toISOString().slice(0, 19).replace("T", " ");
    }

    if (type === "current") {
        const today = new Date();
        const start = getSundayMidnight(today);
        const end = getNextSaturday(today);
        start_week = start.toISOString().slice(0, 19).replace("T", " ");
        end_week = end.toISOString().slice(0, 19).replace("T", " ");
    }

    if (type === "next") {
        const next_week = new Date();
        next_week.setDate(next_week.getDate() + 7 - 1);
        const start = getSundayMidnight(next_week);
        const end = getNextSaturday(next_week);
        start_week = start.toISOString().slice(0, 19).replace("T", " ");
        end_week = end.toISOString().slice(0, 19).replace("T", " ");
    }

    return [start_week, end_week];
}

function filterPhoneNo(phone) {
    phone = phone.trim().replace(/\s+/g, '');
    return "0" + phone.slice(-10);
}

function filterPlateNo(plate) {
    return plate.trim().replace(/\s+/g, '').replace(/-/g, '');
}

function progressBg(percentage_paid) {
    if (percentage_paid <= 20) {
        return "bg-danger";
    } else if (percentage_paid < 50) {
        return "bg-warning";
    } else {
        return "bg-success";
    }
}

function validateDate(date, format = 'YYYY-MM-DD') {
    const parts = date.split('-');
    if (format === 'YYYY-MM-DD' && parts.length === 3) {
        const [year, month, day] = parts.map(Number);
        const d = new Date(year, month - 1, day);
        return d.getFullYear() === year && (d.getMonth() + 1) === month && d.getDate() === day;
    }
    return false;
}

function valid_phone_number(phone) {
    return phone.length === 11 && phone[0] === '0' && /^\d+$/.test(phone);
}

async function ebulkSMSSend(msg, contacts = []) {
    // Prepare recipients
    let recipients = contacts.join(",");
    recipients = "234" + recipients.slice(-10);

    const data = {
        api_key: "TLsDGfNT7dYEld5A78liNf4pIvyz3Uaum5cgKJgtOxsMzKvtGJABl0PV8K1Azj",
        message_type: "ALPHANUMERIC",
        to: recipients,
        from: "N-Alert",
        channel: "dnd",
        pin_attempts: 10,
        pin_time_to_live: 5,
        pin_length: 6,
        pin_placeholder: "< 1234 >",
        message_text: msg,
        pin_type: "NUMERIC"
    };

    try {
        const response = await fetch("https://api.ng.termii.com/api/sms/otp/send", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        // Optionally log or handle `result`
        return result;
    } catch (error) {
        console.error("Error sending SMS:", error);
        throw error;
    }
}

async function sendSMSMessage(opt, contacts, para = {}) {
    let msg = "";

    switch (opt) {
        case "payment_received":
            msg = `Dear ${para.name}, your payment of NGN${Number(para.amount).toLocaleString()} has been received and account updated on Vehiculars.`;
            break;
        default:
            break;
    }

    if (msg) {
        return await ebulkSMSSend(msg, contacts);
    }
}

function getRegionData($loc_id) {
    $getRegions = getAllRegions();
    $region     = "";

    if ($getRegions !== "-1") {
        foreach ($getRegions as $selqry) {
            if ((int) $loc_id === (int) $selqry["reg_id"]) {
                $region = $selqry["reg_label"];
            }
        }
    }

    return [$region, $getRegions];
}

function compressImageWithWatermark($source, $destination, $quality) {
    list($width, $height, $type) = getimagesize($source);

    // Load source image
    switch ($type) {
        case IMAGETYPE_JPEG:
            $sourceImg = imagecreatefromjpeg($source);
            break;
        case IMAGETYPE_PNG:
            $sourceImg = imagecreatefrompng($source);
            imagealphablending($sourceImg, true);
            imagesavealpha($sourceImg, true);
            break;
        case IMAGETYPE_GIF:
            $sourceImg = imagecreatefromgif($source);
            break;
        default:
            return false;
    }

    // Load watermark
    $watermark         = imagecreatefrompng('img/uploads/watermark.png');
    $watermark_width   = imagesx($watermark);
    $watermark_height  = imagesy($watermark);
    $scale_factor      = min($width / $watermark_width, $height / $watermark_height);
    $resized_width     = (int) ($watermark_width * $scale_factor);
    $resized_height    = (int) ($watermark_height * $scale_factor);

    $resized_watermark = imagecreatetruecolor($resized_width, $resized_height);
    imagealphablending($resized_watermark, false);
    imagesavealpha($resized_watermark, true);

    imagecopyresampled(
        $resized_watermark,
        $watermark,
        0, 0, 0, 0,
        $resized_width, $resized_height,
        $watermark_width, $watermark_height
    );

    // Center watermark
    $position_x = (int) (($width - $resized_width) / 2);
    $position_y = (int) (($height - $resized_height) / 2);
    imagecopy($sourceImg, $resized_watermark, $position_x, $position_y, 0, 0, $resized_width, $resized_height);

    // Save final image
    switch ($type) {
        case IMAGETYPE_JPEG:
            imagejpeg($sourceImg, $destination, $quality);
            break;
        case IMAGETYPE_PNG:
            imagepng($sourceImg, $destination);
            break;
        case IMAGETYPE_GIF:
            imagegif($sourceImg, $destination);
            break;
    }

    // Create thumbnail
    $thumbnailWidth  = 400;
    $thumbnailHeight = intval($height * ($thumbnailWidth / $width));
    $thumbnail       = imagecreatetruecolor($thumbnailWidth, $thumbnailHeight);

    imagealphablending($thumbnail, false);
    imagesavealpha($thumbnail, true);
    imagecopyresampled($thumbnail, $sourceImg, 0, 0, 0, 0, $thumbnailWidth, $thumbnailHeight, $width, $height);

    $thumbnailPath = 'img/uploads/docs/thumbnail/' . THUMBNAIL_PREFIX . basename($destination);
    switch ($type) {
        case IMAGETYPE_JPEG:
            imagejpeg($thumbnail, $thumbnailPath, $quality);
            break;
        case IMAGETYPE_PNG:
            imagepng($thumbnail, $thumbnailPath);
            break;
        case IMAGETYPE_GIF:
            imagegif($thumbnail, $thumbnailPath);
            break;
    }

    // Cleanup
    imagedestroy($sourceImg);
    imagedestroy($watermark);
    imagedestroy($resized_watermark);
    imagedestroy($thumbnail);

    return true;
}

function areOnlyPositiveIntegers($array) {
    foreach ($array as $value) {
        if (is_string($value) && ctype_digit($value)) {
            $value = (int) $value;
        }

        if (!is_int($value) || $value <= 0) {
            return false;
        }
    }
    return true;
}

function returnPhoneNumber($phoneNumber) {
    $phoneNumber = preg_replace('/\D/', '', $phoneNumber);

    if (strlen($phoneNumber) == 10 && $phoneNumber[0] === '0') {
        return false;
    }

    if (strlen($phoneNumber) == 10 && $phoneNumber[0] !== '0') {
        return '0' . $phoneNumber;
    }

    if (strlen($phoneNumber) == 11 && $phoneNumber[0] === '0') {
        return $phoneNumber;
    }

    return false;
}

function arrayToCommaSeparatedLists($array) {
    $keys   = array_keys($array);
    $values = array_values($array);

    return [
        'keys'   => implode(',', $keys),
        'values' => implode(',', $values)
    ];
}



export {
    truncate,
    formatQueryResult,
    formatInsertResult,
    formatQueryUpdateResult,
    formatQueryDeleteResult,
    seoUrl,
    generateRandomID,
    maskEmail
};
