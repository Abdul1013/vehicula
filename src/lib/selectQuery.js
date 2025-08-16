// selectQuery.js – equivalent to your PHP selectQuery
import pool from "./db.js";

export async function selectQuery(table, queryType, ...params) {
  let sql = "";

  if (table === "bk_repository") {
    switch (queryType) {
      case "getUserDetailsByID":
        sql = "SELECT * FROM bk_repository WHERE bk_uid = ? AND bk_status = 1";
        break;
      case "getValidAdminByID":
        sql =
          "SELECT * FROM bk_repository WHERE bk_uid = ? AND bk_status = 1 AND bk_usr_role_fk > 1";
        break;
      case "getUserDetailsByIDNoCheck":
        sql = "SELECT * FROM bk_repository WHERE bk_uid = ?";
        break;
      case "getCustomersCountAgent":
        sql = `SELECT COUNT(*) as total_customers 
               FROM bk_repository 
               WHERE bk_entry_date BETWEEN ? AND ? 
               AND bk_usr_role_fk < 1 
               AND (bk_agent_id = ? OR bk_ref_code = ?) 
               AND bk_status = 1`;
        break;
      // ...continue mapping the other cases
      default:
        return false;
    }
  }

  if (table === "regions") {
    switch (queryType) {
      case "getAllRegions":
        sql = "SELECT * FROM regions ORDER BY reg_label";
        break;
      case "getRegionByID":
        sql = "SELECT * FROM regions WHERE reg_id = ?";
        break;
      default:
        return false;
    }
  }

  if (table === "vehicle_notify_settings") {
    switch (queryType) {
      case "getVehicleNotifySettings":
        sql = "SELECT * FROM vehicle_notify_settings";
        break;
      default:
        return false;
    }
  }

  if (table === "vehicle_services") {
    switch (queryType) {
      case "getServices":
        sql =
          "SELECT * FROM vehicle_services WHERE v_s_status = 1 ORDER BY v_s_priority";
        break;
      default:
        return false;
    }
  }

  if (table === "vehicle_credit_points") {
    switch (queryType) {
      case "getCreditConstants":
        sql = "SELECT * FROM vehicle_credit_points";
        break;
      default:
        return false;
    }
  }

  if (table === "vehicle_customer_score") {
    switch (queryType) {
      case "getCurrentScore":
        sql =
          "SELECT SUM(vcs_score) AS total_score FROM vehicle_customer_score WHERE vcs_uid = ?";
        break;
      default:
        return false;
    }
  }

  if (table === "vehicle_customer_service_options") {
    switch (queryType) {
      case "getServiceOfferForCustomer":
        sql =
          "SELECT * FROM vehicle_customer_service_options WHERE vcso_vss_id = ? AND vcso_uid = ?";
        break;
      default:
        return false;
    }
  }

  if (table === "vehicle_service_batch") {
    switch (queryType) {
      case "getServiceByBatchIDUID":
        return runQuery(
          `SELECT * FROM vehicle_service_batch 
         JOIN (vehicle_service_request 
         JOIN (vehicle_service_sub 
         JOIN vehicle_services ON vs_id_fk = v_s_id) 
         ON vss_id_fk = vss_id) 
         ON vsb_id = vsr_batch_id 
         WHERE vsr_batch_id = ? AND vsr_uid = ? 
         ORDER BY v_s_priority, vss_priority, vss_name`,
          [args[0], args[1]]
        );

      case "getServiceByReqIDUID":
        return runQuery(
          `SELECT * FROM vehicle_service_batch 
         JOIN (vehicle_service_request 
         JOIN (vehicle_service_sub 
         JOIN vehicle_services ON vs_id_fk = v_s_id) 
         ON vss_id_fk = vss_id) 
         ON vsb_id = vsr_batch_id 
         WHERE vsr_id = ? AND vsr_uid = ? 
         ORDER BY v_s_priority, vss_priority, vss_name`,
          [args[0], args[1]]
        );

      case "getServiceByUID":
        return runQuery(
          `SELECT * FROM vehicle_service_batch 
         JOIN (vehicle_service_request 
         JOIN (vehicle_service_sub 
         JOIN vehicle_services ON vs_id_fk = v_s_id) 
         ON vss_id_fk = vss_id) 
         ON vsb_id = vsr_batch_id 
         WHERE vsr_uid = ? 
         ORDER BY v_s_priority, vss_priority, vss_name`,
          [args[0]]
        );

      case "getServiceByIDUID":
        return runQuery(
          `SELECT * FROM vehicle_service_batch 
         JOIN (vehicle_service_request 
         JOIN (vehicle_service_sub 
         JOIN vehicle_services ON vs_id_fk = v_s_id) 
         ON vss_id_fk = vss_id) 
         ON vsb_id = vsr_batch_id 
         WHERE vsr_uid = ? AND v_s_id = ? 
         ORDER BY v_s_priority, vss_priority, vss_name`,
          [args[0], args[1]]
        );

      case "getVG1MByIDUID":
        return runQuery(
          `SELECT * FROM vehicle_service_batch 
         JOIN (vehicle_service_request 
         JOIN (vehicle_service_sub 
         JOIN vehicle_services ON vs_id_fk = v_s_id) 
         ON vss_id_fk = vss_id) 
         ON vsb_id = vsr_batch_id 
         WHERE vsr_uid = ? AND vss_id = ? 
         ORDER BY v_s_priority, vss_priority, vss_name`,
          [args[0], args[1]]
        );

      case "getServiceByBatchID":
        return runQuery(
          `SELECT * FROM vehicle_service_batch 
         JOIN (vehicle_service_request 
         JOIN (vehicle_service_sub 
         JOIN vehicle_services ON vs_id_fk = v_s_id) 
         ON vss_id_fk = vss_id) 
         ON vsb_id = vsr_batch_id 
         WHERE vsr_batch_id = ? 
         ORDER BY v_s_priority, vss_priority, vss_name`,
          [args[0]]
        );

      case "getBatchByID":
        return runQuery(
          `SELECT * FROM vehicle_service_batch WHERE vsb_id = ?`,
          [args[0]]
        );

      case "getBatchPayByReqID":
        return runQuery(
          `SELECT * FROM vehicle_service_batch_pay 
         RIGHT JOIN (vehicle_service_batch 
         JOIN (vehicle_service_request 
         JOIN (vehicle_service_sub 
         JOIN vehicle_services ON vs_id_fk = v_s_id) 
         ON vss_id_fk = vss_id) 
         ON vsb_id = vsr_batch_id) 
         ON vsbp_batch_id_fk = vsb_id 
         WHERE vsr_id = ? 
         ORDER BY vsbp_trans_date DESC, vsb_entry_date DESC, v_s_priority, vss_priority, vss_name`,
          [args[0]]
        );

      case "getBatchByIDWithReq":
        return runQuery(
          `SELECT * FROM vehicle_service_batch 
         JOIN (vehicle_service_request 
         JOIN vehicle_service_sub ON vss_id_fk = vss_id) 
         ON vsb_id = vsr_batch_id 
         WHERE vsb_id = ?`,
          [args[0]]
        );

      case "getBatchByUID":
        return runQuery(
          `SELECT * FROM vehicle_service_batch_pay 
         RIGHT JOIN (vehicle_service_batch 
         JOIN (vehicle_service_request 
         JOIN (vehicle_service_sub 
         JOIN vehicle_services ON vs_id_fk = v_s_id) 
         ON vss_id_fk = vss_id) 
         ON vsb_id = vsr_batch_id) 
         ON vsbp_batch_id_fk = vsb_id 
         WHERE vsr_uid = ? 
         ORDER BY vsbp_trans_date DESC, vsb_entry_date DESC, v_s_priority, vss_priority, vss_name`,
          [args[0]]
        );

      case "getBatchByUIDPartial":
        return runQuery(
          `SELECT * FROM vehicle_service_batch_pay 
         RIGHT JOIN (vehicle_service_batch 
         JOIN (vehicle_service_request 
         JOIN (vehicle_service_sub 
         JOIN vehicle_services ON vs_id_fk = v_s_id) 
         ON vss_id_fk = vss_id) 
         ON vsb_id = vsr_batch_id) 
         ON vsbp_batch_id_fk = vsb_id 
         WHERE vsr_uid = ? AND vsbp_id IS NULL 
         ORDER BY vsbp_trans_date DESC, vsb_entry_date DESC, v_s_priority, vss_priority, vss_name`,
          [args[0]]
        );

      case "getBatchByUIDInProgress":
        return runQuery(
          `SELECT * FROM vehicle_service_batch_pay 
         RIGHT JOIN (vehicle_service_batch 
         JOIN (vehicle_service_request 
         JOIN (vehicle_service_sub 
         JOIN vehicle_services ON vs_id_fk = v_s_id) 
         ON vss_id_fk = vss_id) 
         ON vsb_id = vsr_batch_id) 
         ON vsbp_batch_id_fk = vsb_id 
         WHERE vsr_uid = ? AND vsr_status != 1 AND vsbp_id IS NOT NULL 
         ORDER BY vsbp_trans_date DESC, vsb_entry_date DESC, v_s_priority, vss_priority, vss_name`,
          [args[0]]
        );

      case "getBatchByUIDCompleted":
        return runQuery(
          `SELECT * FROM vehicle_service_batch_pay 
         RIGHT JOIN (vehicle_service_batch 
         JOIN (vehicle_service_request 
         JOIN (vehicle_service_sub 
         JOIN vehicle_services ON vs_id_fk = v_s_id) 
         ON vss_id_fk = vss_id) 
         ON vsb_id = vsr_batch_id) 
         ON vsbp_batch_id_fk = vsb_id 
         WHERE vsr_uid = ? AND vsr_status = 1 
         ORDER BY vsbp_trans_date DESC, vsb_entry_date DESC, v_s_priority, vss_priority, vss_name`,
          [args[0]]
        );

      case "getBatchByUIDLoan":
        return runQuery(
          `SELECT * FROM vehicle_service_batch_pay 
         JOIN (vehicle_service_batch 
         JOIN vehicle_service_request 
         ON vsb_id = vsr_batch_id) 
         ON vsbp_batch_id_fk = vsb_id 
         WHERE vsr_uid = ? AND vsb_pay_option = 3 
         ORDER BY vsbp_trans_date DESC, vsb_entry_date DESC`,
          [args[0]]
        );

      default:
        return false;
    }
  }

  if (table === "vehicle_service_badge") {
    switch (queryType) {
      case "getBadges":
        selectQuery = await query(
          "SELECT * FROM vehicle_service_badge ORDER BY v_bg_start_at"
        );
        break;

      case "getBadgeGroup":
        selectQuery = await query(
          "SELECT * FROM vehicle_service_badge WHERE ? >= v_bg_start_at AND ? <= v_bg_end_at",
          [args[0], args[0]]
        );
        break;

      default:
        return false;
    }
  }

  if (table === "vehicle_service_batch_pay") {
    switch (queryType) {
      case "getBatchPaymentByReference":
        selectQuery = await query(
          "SELECT * FROM vehicle_service_batch_pay WHERE vsbp_ref = ?",
          [args[0]]
        );
        break;

      case "getBatchPaymentByBatchID":
        selectQuery = await query(
          "SELECT * FROM vehicle_service_batch_pay WHERE vsbp_batch_id_fk = ? ORDER BY vsbp_trans_date DESC",
          [args[0]]
        );
        break;

      case "getTotalPaidForBatch":
        selectQuery = await query(
          "SELECT SUM(vsbp_amnt) AS total_paid FROM vehicle_service_batch_pay WHERE vsbp_batch_id_fk = ?",
          [args[0]]
        );
        break;

      case "getGoalsTotalPaid":
        selectQuery = await query(
          `SELECT SUM(vsbp_amnt) AS total_paid, vsr_uid 
         FROM vehicle_services 
         JOIN (vehicle_service_sub 
         JOIN (vehicle_service_request 
         JOIN (vehicle_service_batch 
         JOIN vehicle_service_batch_pay ON vsb_id = vsbp_batch_id_fk) 
         ON vsr_batch_id = vsb_id) 
         ON vss_id = vss_id_fk) 
         ON v_s_id = vs_id_fk 
         WHERE v_s_id = ? 
         GROUP BY vsr_uid 
         HAVING total_paid > ?`,
          [args[0], args[1]]
        );
        break;

      default:
        return false;
    }
  }

  if (table === "vehicle_service_sub") {
    switch (queryType) {
      case "getSubServices":
        selectQuery = await query(
          `SELECT * FROM vehicle_services 
         JOIN vehicle_service_sub ON v_s_id = vs_id_fk 
         WHERE vss_status = 1 AND v_s_status = 1 
         ORDER BY v_s_priority, vss_priority, vss_name`
        );
        break;

      case "getSubServicesRegion":
        selectQuery = await query(
          `SELECT * FROM vehicle_services 
         JOIN vehicle_service_sub ON v_s_id = vs_id_fk 
         WHERE vss_status = 1 AND v_s_status = 1 
         AND vss_region = ? 
         ORDER BY v_s_priority, vss_priority, vss_name`,
          [args[0]]
        );
        break;

      case "getServicesByIDArray":
        selectQuery = await query(
          `SELECT * FROM vehicle_services 
         JOIN vehicle_service_sub ON v_s_id = vs_id_fk 
         WHERE vss_status = 1 AND v_s_status = 1 
         AND vss_id = ?`,
          [args[0]]
        );
        break;

      default:
        return false;
    }
  }

  if (table === "vehicle_service_request") {
    switch (queryType) {
      case "getServiceRequestByIDUID":
        selectQuery = await query(
          "SELECT * FROM vehicle_service_request WHERE vsr_uid = ? AND vsr_id = ?",
          [args[0], args[1]]
        );
        break;

      case "getServiceRequestByID":
        selectQuery = await query(
          "SELECT * FROM vehicle_service_batch JOIN (vehicle_service_request JOIN (vehicle_service_sub JOIN vehicle_services ON vs_id_fk = v_s_id) ON vss_id_fk = vss_id) ON vsb_id = vsr_batch_id WHERE vsr_id = ?",
          [args[0]]
        );
        break;

      case "getServiceRequestDetailsByUID":
        selectQuery = await query(
          "SELECT * FROM vehicle_services JOIN (vehicle_service_sub JOIN (vehicle_service_request JOIN vehicle_service_batch ON vsr_batch_id = vsb_id) ON vss_id = vss_id_fk) ON v_s_id = vs_id_fk WHERE vsr_uid = ? AND vsr_id = ?",
          [args[0], args[1]]
        );
        break;

      case "getServicesByLoc":
        selectQuery = await query(
          "SELECT * FROM vehicle_services JOIN (vehicle_service_sub JOIN vehicle_service_request ON vss_id = vss_id_fk) ON v_s_id = vs_id_fk WHERE vss_region = ? AND vsr_status = 0 AND vsr_in_progress = 1 ORDER BY vsr_va_price DESC",
          [args[0]]
        );
        break;

      case "getServiceRequestByBatchUID":
        selectQuery = await query(
          "SELECT * FROM vehicle_service_sub JOIN (vehicle_service_request JOIN vehicle_service_batch ON vsr_batch_id = vsb_id) ON vss_id = vss_id_fk WHERE vsr_uid = ? AND vsr_batch_id = ?",
          [args[0], args[1]]
        );
        break;

      default:
        return false;
    }
  }

  if (table === "vehiculars_otp_req_log") {
    switch (queryType) {
      case "getUserOTP":
        selectQuery = await query(
          "SELECT * FROM vehiculars_otp_req_log WHERE otp_uid_fk = ?",
          [args[0]]
        );
        break;

      default:
        return false;
    }
  }

  if (table === "vehicule_plate_numbers") {
    switch (queryType) {
      case "getPlateCntByCat":
        selectQuery = await query(
          "SELECT COUNT(*) AS total_cnt FROM vehicule_plate_numbers WHERE v_cat_fk = ? AND v_plate_status = 1",
          [args[0]]
        );
        break;

      case "getCarDetails":
        selectQuery = await query(
          "SELECT * FROM bk_repository JOIN vehicule_plate_numbers ON bk_uid = v_person_id WHERE bk_phone_number = ? AND bk_uid = ? ORDER BY v_plate_status DESC",
          [args[0], args[1]]
        );
        break;

      case "getCarDetailsPlate":
        selectQuery = await query(
          "SELECT * FROM bk_repository JOIN vehicule_plate_numbers ON bk_uid = v_person_id WHERE v_plate_no = ? AND bk_uid = ?",
          [args[0], args[1]]
        );
        break;

      case "getCarDetailsPlateMine":
        selectQuery = await query(
          "SELECT * FROM bk_repository JOIN vehicule_plate_numbers ON bk_uid = v_person_id WHERE v_plate_no = ? AND bk_phone_number = ? AND bk_uid = ?",
          [args[0], args[1], args[2]]
        );
        break;

      case "getCarDetailsPlateByID":
        selectQuery = await query(
          "SELECT * FROM bk_repository JOIN vehicule_plate_numbers ON bk_uid = v_person_id WHERE v_plate_id = ? AND bk_uid = ?",
          [args[0], args[1]]
        );
        break;

      case "getCarDetailsRelated":
        selectQuery = await query(
          "SELECT * FROM bk_repository JOIN vehicule_plate_numbers ON bk_uid = v_person_id WHERE bk_phone_number = ? AND v_plate_no <> ? AND bk_uid = ? ORDER BY v_plate_status DESC",
          [args[0], args[1], args[2]]
        );
        break;

      default:
        return false;
    }
  }
  if (table === "vehicle_product_users") {
    switch (queryType) {
      case "getProductDetails":
        selectQuery = await query(
          "SELECT * FROM bk_repository JOIN vehicle_product_users ON bk_uid = v_p_u_uid WHERE v_p_u_id = ? AND bk_uid = ?",
          [args[0], args[1]]
        );
        break;

      case "getProductDetailsByID":
        selectQuery = await query(
          "SELECT * FROM vehicle_product_users WHERE v_p_u_uid = ?",
          [args[0]]
        );
        break;

      case "getProductDetailsByCode":
        selectQuery = await query(
          "SELECT * FROM bk_repository JOIN vehicle_product_users ON bk_uid = v_p_u_uid WHERE v_p_u_code = ? AND bk_uid = ?",
          [args[0], args[1]]
        );
        break;

      default:
        return false;
    }
  }

  if (table === "vehicle_product") {
    switch (queryType) {
      case "getTotalPayProduct":
        selectQuery = await query(
          "SELECT * FROM bk_repository JOIN vehicle_product ON bk_uid = v_pr_uid_fk WHERE v_pr_code = ? AND bk_uid = ?",
          [args[0], args[1]]
        );
        break;

      case "getTotalPayByID":
        selectQuery = await query(
          "SELECT * FROM vehicle_product WHERE v_pr_uid_fk = ? ORDER BY v_pr_trans_date DESC",
          [args[0]]
        );
        break;

      default:
        return false;
    }
  }

  if (table === "vehicle_type") {
    switch (queryType) {
      case "getVechicleTypes":
        selectQuery = await query(
          "SELECT * FROM vehicle_type ORDER BY v_type_order"
        );
        break;

      default:
        return false;
    }
  }

  if (table === "vehicle_price_chart") {
    switch (queryType) {
      case "getFullPayments":
        selectQuery = await query(
          "SELECT * FROM vehicle_price_chart WHERE v_p_is_full = 1"
        );
        break;

      case "getDocumentsListByCar":
        selectQuery = await query(
          "SELECT * FROM vehicle_price_chart_headings JOIN vehicle_price_chart ON v_p_h_id = v_p_h_id_fk WHERE v_p_type_fk = ? AND v_p_cat_fk = ? ORDER BY v_p_h_name",
          [args[0], args[1]]
        );
        break;

      default:
        return false;
    }
  }

  if (table === "vehicle_categories") {
    switch (queryType) {
      case "getVechicleCategories":
        selectQuery = await query(
          "SELECT * FROM vehicle_categories ORDER BY v_cat_name"
        );
        break;

      default:
        return false;
    }
  }

  if (table === "vehicle_documents") {
    switch (queryType) {
      case "getVechicleDocuments":
        selectQuery = await query(
          "SELECT * FROM vehicle_documents ORDER BY v_d_order"
        );
        break;

      default:
        return false;
    }
  }

  if (table === "dl_application") {
    switch (queryType) {
      case "getUserDLInfo":
        selectQuery = await query(
          "SELECT * FROM dl_application WHERE uid = ?",
          [args[0]]
        );
        break;

      default:
        return false;
    }
  }

  if (table === "vehicle_sub_plan_heading") {
    switch (queryType) {
      case "getInstallmentPlans":
        selectQuery = await query(
          "SELECT * FROM vehicle_sub_plan_heading ORDER BY s_p_duration DESC"
        );
        break;

      case "getSubPlan":
        selectQuery = await query(
          "SELECT * FROM vehicle_sub_plan_heading ORDER BY s_p_heading_id"
        );
        break;

      default:
        return false;
    }
  }
  if (table === "vehicle_subscriptions") {
    switch (queryType) {
      case "getVehicleSubscriptionTotalAmount":
        selectQuery = await query(
          `SELECT SUM(v_s_amount) AS total_amnt 
         FROM vehicule_plate_numbers 
         JOIN vehicle_subscriptions 
         ON v_plate_id = v_s_plate_id_fk 
         WHERE v_s_plate_id_fk = ? 
         AND v_person_id = ? 
         AND v_s_status < 1`,
          [args[0], args[1]]
        );
        break;

      case "getVehicleSubscriptionByPlate":
        selectQuery = await query(
          `SELECT * 
         FROM vehicle_price_chart_headings 
         JOIN (
           vehicle_price_chart 
           JOIN vehicle_subscriptions 
           ON v_p_id = v_s_chart_id_fk
         ) ON v_p_h_id = v_p_h_id_fk 
         WHERE v_s_plate_id_fk = ? 
         AND v_s_status < 1 
         ORDER BY v_s_expiry_date`,
          [args[0]]
        );
        break;

      case "getSubscriptionByPlate":
        selectQuery = await query(
          `SELECT * 
         FROM vehicule_plate_numbers 
         JOIN vehicle_subscriptions 
         ON v_plate_id = v_s_plate_id_fk 
         WHERE v_s_plate_id_fk = ? 
         AND v_person_id = ? 
         AND v_s_status < 1 
         ORDER BY v_s_expiry_date DESC`,
          [args[0], args[1]]
        );
        break;

      case "getVehicleSubscriptionStatusCount":
        selectQuery = await query(
          `SELECT COUNT(*) AS total_records 
         FROM vehicle_subscriptions 
         WHERE v_s_status = ? 
         GROUP BY v_s_plate_id_fk`,
          [args[0]]
        );
        break;

      case "getSubscriptionDetailsByID":
        selectQuery = await query(
          `SELECT * 
         FROM vehicule_plate_numbers 
         JOIN vehicle_subscriptions 
         ON v_plate_id = v_s_plate_id_fk 
         WHERE v_s_id = ? 
         AND v_person_id = ?`,
          [args[0], args[1]]
        );
        break;

      default:
        return false;
    }
  }

  if (table === "vehicle_sub_transactions") {
    switch (queryType) {
      case "getVehicleSubscriptionPaid":
        selectQuery = await query(
          `SELECT SUM(v_t_amount) AS total_paid 
         FROM vehicule_plate_numbers 
         JOIN (
           vehicle_subscriptions 
           JOIN vehicle_sub_transactions 
           ON v_s_id = v_t_sub_id_fk
         ) ON v_plate_id = v_s_plate_id_fk 
         WHERE v_s_plate_id_fk = ? 
         AND v_person_id = ? 
         AND v_s_status < 1`,
          [args[0], args[1]]
        );
        break;

      case "getPaymentsDone":
        selectQuery = await query(
          `SELECT *, SUM(v_t_amount) AS total_paid 
         FROM vehicule_plate_numbers 
         JOIN (
           vehicle_subscriptions 
           JOIN vehicle_sub_transactions 
           ON v_s_id = v_t_sub_id_fk
         ) ON v_plate_id = v_s_plate_id_fk 
         WHERE v_s_plate_id_fk = ? 
         AND v_person_id = ?  
         AND v_s_status < 1 
         GROUP BY v_s_plate_id_fk`,
          [args[0], args[1]]
        );
        break;

      case "getVehicleSubPaidRecords":
        selectQuery = await query(
          `SELECT * 
         FROM vehicule_plate_numbers 
         JOIN (
           vehicle_subscriptions 
           JOIN vehicle_sub_transactions 
           ON v_s_id = v_t_sub_id_fk
         ) ON v_plate_id = v_s_plate_id_fk 
         WHERE v_s_plate_id_fk = ? 
         AND v_person_id = ? 
         AND v_s_status < 1 
         ORDER BY v_t_date DESC`,
          [args[0], args[1]]
        );
        break;

      case "getTotalTransactionsByStatus":
        selectQuery = await query(
          `SELECT SUM(v_t_amount) AS total_paid 
         FROM vehicule_plate_numbers 
         JOIN (
           vehicle_subscriptions 
           JOIN vehicle_sub_transactions 
           ON v_s_id = v_t_sub_id_fk
         ) ON v_plate_id = v_s_plate_id_fk 
         WHERE v_s_status = ?`,
          [args[0]]
        );
        break;

      default:
        return false;
    }
  }

  if (!sql) return false;

  const [rows] = await pool.execute(sql, params);
  return rows;
}

//This function defines the actual sql that inserts fields to table in the
export async function updateQuery(table, queryType, ...args) {
  let updateQuery;
  const getTimeNow = getTimeNowCustom(); // Assuming this exists in your JS version

  if (table === "bk_repository") {
    switch (queryType) {
      case "updateUserDetails":
        updateQuery = await query(
          `UPDATE bk_repository 
           SET bk_customer_full_name=?, bk_email=?, bk_address=?, bk_default_region=?, bk_lga=? 
           WHERE bk_uid = ?`,
          [args[0], args[1], args[2], args[3], args[4], args[5]]
        );
        break;

      case "updateUserPassword":
        updateQuery = await query(
          `UPDATE bk_repository 
           SET bk_hash=? 
           WHERE bk_uid = ?`,
          [args[0], args[1]]
        );
        break;

      case "updateCustomerScore":
        updateQuery = await query(
          `UPDATE bk_repository 
           SET bk_score=? 
           WHERE bk_uid = ?`,
          [args[0], args[1]]
        );
        break;

      case "updateRegion":
        updateQuery = await query(
          `UPDATE bk_repository 
           SET bk_default_region=? 
           WHERE bk_uid = ?`,
          [args[0], args[1]]
        );
        break;

      case "updateRefCode":
        updateQuery = await query(
          `UPDATE bk_repository 
           SET bk_my_ref_code=? 
           WHERE bk_uid = ?`,
          [args[0], args[1]]
        );
        break;

      case "updateProfilePic":
        updateQuery = await query(
          `UPDATE bk_repository 
           SET bk_photo=? 
           WHERE bk_uid = ?`,
          [args[0], args[1]]
        );
        break;

      case "updatePhoneStatus":
        updateQuery = await query(
          `UPDATE bk_repository 
           SET bk_phone_verified=? 
           WHERE bk_uid = ?`,
          [args[0], args[1]]
        );
        break;

      default:
        return false;
    }
  }

  if (table === "vehicule_plate_numbers") {
    switch (queryType) {
      case "updatePlateDetails":
        updateQuery = await query(
          `UPDATE vehicule_plate_numbers 
           SET v_person_id=?, v_plate_no=?, v_cat_fk=?, v_type_fk=? 
           WHERE v_plate_id = ?`,
          [args[0], args[1], args[2], args[3], args[4]]
        );
        break;

      default:
        return false;
    }
  }

  if (table === "vehicle_service_batch") {
    switch (queryType) {
      case "updateBatchDetails":
        updateQuery = await query(
          `UPDATE vehicle_service_batch 
           SET vsb_pay_amount=?, vsb_pay_total=?, vsb_pay_option=?, vsb_reminder_option=?, vsb_last_pay_split=?, vsb_pg_last_attempt_date=? 
           WHERE vsb_id = ?`,
          [args[0], args[1], args[2], args[3], args[4], getTimeNow, args[5]]
        );
        break;

      case "updateBatchExtraFiles":
        updateQuery = await query(
          `UPDATE vehicle_service_batch 
           SET vsb_upload_str = ? 
           WHERE vsb_id = ?`,
          [args[0], args[1]]
        );
        break;

      case "updateBatchSplitPay":
        updateQuery = await query(
          `UPDATE vehicle_service_batch 
           SET vsb_last_pay_split = ? 
           WHERE vsb_id = ?`,
          [args[0], args[1]]
        );
        break;
    }
  }
  if (table === "vehicle_service_batch_pay") {
    switch (queryType) {
      case "updatePaySplit":
        updateQuery = query(
          "UPDATE vehicle_service_batch_pay SET vsbp_pay_split = ?, vsbp_amnt = ? WHERE vsbp_id = ?",
          params[0],
          params[1],
          params[2]
        );
        break;
      default:
        return false;
    }
  }

  if (table === "vehicle_service_transfers") {
    switch (queryType) {
      case "updateTransferStatus":
        updateQuery = query(
          "UPDATE vehicle_service_transfers SET vst_status = ?, vst_action_by = ?, vst_action_on = ? WHERE vst_id = ?",
          params[0],
          params[1],
          getTimeNow,
          params[2]
        );
        break;
      default:
        return false;
    }
  }

  if (table === "vehicle_service_request") {
    switch (queryType) {
      case "updateServicePriceLock":
        updateQuery = query(
          "UPDATE vehicle_service_request SET vsr_price_lock=?, vsr_prevent_transfer=?, vsr_prevent_transfer_by=?, vsr_prevent_transfer_on = ? WHERE vsr_id = ?",
          params[0],
          params[1],
          params[2],
          getTimeNow,
          params[3]
        );
        break;
      case "updateRequestReminder":
        updateQuery = query(
          "UPDATE vehicle_service_request SET vsr_reminder_opt=? WHERE vsr_id = ?",
          params[0],
          params[1]
        );
        break;
      case "updateVAPriorityPrice":
        updateQuery = query(
          "UPDATE vehicle_service_request SET vsr_va_price=?, vsr_va_duration = ? WHERE vsr_id = ?",
          params[0],
          params[1],
          params[2]
        );
        break;
      case "updateServiceTransferStatus":
        updateQuery = query(
          "UPDATE vehicle_service_request SET vsr_prevent_transfer=?, vsr_prevent_transfer_by=?, vsr_prevent_transfer_on = ? WHERE vsr_id = ?",
          params[0],
          params[1],
          getTimeNow,
          params[2]
        );
        break;
      case "toggleCoverNote":
        updateQuery = query(
          "UPDATE vehicle_service_request SET vsr_cover_note_issued = CASE WHEN vsr_cover_note_issued = 0 THEN 1 ELSE 0 END, vsr_cover_issued_by=?, vsr_cover_note_issued_on = ? WHERE vsr_id = ?",
          params[0],
          getTimeNow,
          params[1]
        );
        break;
      case "toggleProcessingStatus":
        updateQuery = query(
          "UPDATE vehicle_service_request SET vsr_in_progress = CASE WHEN vsr_in_progress = 0 THEN 1 ELSE 0 END, vsr_va_approved = CASE WHEN vsr_va_approved = 0 THEN 1 ELSE 1 END, vsr_in_progress_by=?, vsr_in_progress_on = ? WHERE vsr_id = ?",
          params[0],
          getTimeNow,
          params[1]
        );
        break;
      case "updateVAStatus":
        updateQuery = query(
          "UPDATE vehicle_service_request SET vsr_va_approved = CASE WHEN vsr_va_approved = 0 THEN 1 ELSE 0 END WHERE vsr_id = ?",
          params[0]
        );
        break;
      case "toggleDSStatus":
        updateQuery = query(
          "UPDATE vehicle_service_request SET vsr_engage_ds = CASE WHEN vsr_engage_ds = 0 THEN 1 ELSE 0 END, vsr_engage_ds_by=?, vsr_engage_ds_on = ? WHERE vsr_id = ?",
          params[0],
          getTimeNow,
          params[1]
        );
        break;
      case "markJobAsDelivered":
        updateQuery = query(
          "UPDATE vehicle_service_request SET vsr_status=?, vsr_next_renewal = ?, vsr_delivery_notes = ?, vsr_delivery_by = ?, vsr_delivery_date = ? WHERE vsr_id = ?",
          params[0],
          params[1],
          params[2],
          params[3],
          getTimeNow,
          params[4]
        );
        break;
      case "updateRequestDetails":
        updateQuery = query(
          "UPDATE vehicle_service_request SET vsr_full_name=?, vsr_phone = ?, vsr_address = ?, vsr_dob = ? WHERE vsr_id = ?",
          params[0],
          params[1],
          params[2],
          params[3],
          params[4]
        );
        break;
      default:
        return false;
    }
  }

  if (table === "vehicle_product_users") {
    switch (queryType) {
      case "updateProductDetails":
        updateQuery = query(
          "UPDATE vehicle_product_users SET v_p_u_code=?, v_p_u_uid=?, v_p_u_budget=?, v_p_u_installments=? WHERE v_p_u_id = ?",
          params[0],
          params[1],
          params[2],
          params[3],
          params[4]
        );
        break;
      default:
        return false;
    }
  }

  if (table === "vehicle_subscriptions") {
    switch (queryType) {
      case "updateDocumentDetails":
        updateQuery = query(
          "UPDATE vehicle_subscriptions SET v_s_plate_id_fk = ?, v_s_chart_id_fk = ?, v_s_expiry_date = ?, v_s_issue_date = ?, v_s_amount = ?, v_s_plan_id_fk = ?, v_s_doc_upload = ?, v_s_notes = ?, v_s_last_update_by = ?, v_s_last_update_on = ? WHERE v_s_id = ?",
          params[0],
          params[1],
          params[2],
          params[3],
          params[4],
          params[5],
          params[6],
          params[7],
          params[8],
          getTimeNow,
          params[9]
        );
        break;
      default:
        return false;
    }
  } else {
    return false;
  }

  return updateQuery;
}


//This function defines the actual sql that updates fields in a table for database	
//$referencefield must always be passed
// deleteQuery.js
export async function deleteQuery(table, queryType, ...args) {
    let deleteQueryResult = false;

    if (table === "vehicule_plate_numbers") {
        switch (queryType) {
            case "deletePlateNumber":
                deleteQueryResult = await query(
                    "DELETE FROM vehicule_plate_numbers WHERE v_plate_id = ?",
                    [args[0]]
                );
                break;
            default:
                return false;
        }
    }

    else if (table === "vehicle_product_users") {
        switch (queryType) {
            case "deleteProduct":
                deleteQueryResult = await query(
                    "DELETE FROM vehicle_product_users WHERE v_p_u_code = ? AND v_p_u_uid = ?",
                    [args[0], args[1]]
                );
                break;
            default:
                return false;
        }
    }

    else if (table === "vehiculars_otp_req_log") {
        switch (queryType) {
            case "deleteOTPRecord":
                deleteQueryResult = await query(
                    "DELETE FROM vehiculars_otp_req_log WHERE otp_uid_fk = ?",
                    [args[0]]
                );
                break;
            default:
                return false;
        }
    }

    else if (table === "vehicle_service_request") {
        switch (queryType) {
            case "deleteBatchServiceData":
                deleteQueryResult = await query(
                    "DELETE FROM vehicle_service_request WHERE vsr_batch_id = ?",
                    [args[0]]
                );
                break;
            case "deleteBatchServiceWithBatchID":
                deleteQueryResult = await query(
                    "DELETE FROM vehicle_service_request WHERE vsr_batch_id = ? AND vss_id_fk = ?",
                    [args[0], args[1]]
                );
                break;
            default:
                return false;
        }
    }

    else if (table === "vehicle_service_batch") {
        switch (queryType) {
            case "deleteBatchData":
                deleteQueryResult = await query(
                    "DELETE FROM vehicle_service_batch WHERE vsb_id = ?",
                    [args[0]]
                );
                break;
            default:
                return false;
        }
    }

    else if (table === "vehicle_subscriptions") {
        switch (queryType) {
            case "deleteSubscription":
                deleteQueryResult = await query(
                    "DELETE FROM vehicle_subscriptions WHERE v_s_id = ?",
                    [args[0]]
                );
                break;
            default:
                return false;
        }
    }

    else {
        return false;
    }

    return deleteQueryResult;
}


// Mask phone number
function maskPhone(phone) {
    const charShown = 2;
    const len = phone.length;

    if (len <= charShown) {
        return phone;
    }

    return phone.substring(0, charShown) +
        '*'.repeat(len - charShown - 2) +
        phone.substring(len - charShown, len);
}

// Validate number elements
function validateNumberElements(number) {
    number = number.trim();
    if (number === '') return false;

    const validNumbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

    for (let i = 0; i < number.length; i++) {
        if (!validNumbers.includes(number[i])) {
            return false;
        }
    }
    return true;
}

// Execute HTTP request (replacement for cURL)
async function myCurlExecute(myHITurl) {
    const CUSTOM_STRING_SEPARATOR = '|'; // Placeholder, adjust if needed
    try {
        const response = await fetch(myHITurl);
        const text = await response.text();
        return `0${CUSTOM_STRING_SEPARATOR}${text}`;
    } catch (err) {
        return `1${CUSTOM_STRING_SEPARATOR}${err.message}`;
    }
}

// Generate random string
function generateRandomString(length = 8, integersOnly = false, isCaseSensitive = false) {
    let characters;
    if (integersOnly) {
        characters = (length > 9) ? '1234567890123456789' : '0123456789';
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

// DB Insert/Update/Select simulation with if + switch
async function dbOperation(functionType, table, ...params) {
    if (functionType === 'insert') {
        try {
            switch (table) {
                case 'bk_repository':
                    return formatInsertResult(await insertQuery(table, 'insertUserDetails', ...params));
                case 'sms_logs':
                    return formatInsertResult(await insertQuery(table, 'insertMsgToDB', ...params));
                case 'vehicle_service_batch':
                    return formatInsertResult(await insertQuery(table, 'insertServiceBatch', ...params));
                case 'vehicle_score_shift':
                    return formatInsertResult(await insertQuery(table, 'addScoreShift', ...params));
                case 'vehicle_customer_score':
                    return formatInsertResult(await insertQuery(table, 'addCustomerScoreValue', ...params));
                case 'vehicle_service_request':
                    return formatInsertResult(await insertQuery(table, 'insertServiceRequests', ...params));
                case 'vehiculars_otp_req_log':
                    return formatInsertResult(await insertQuery(table, 'insertOTPToDB', ...params));
                case 'vehicle_reminders':
                    return formatInsertResult(await insertQuery(table, 'insertReminderDetails', ...params));
                case 'vehicle_news_letter':
                    return formatInsertResult(await insertQuery(table, 'insertNewsLetterEmail', ...params));
                case 'vehicle_pay_gate_unsaved':
                    return formatInsertResult(await insertQuery(table, 'doSuccessButFailedProcess', ...params));
                case 'vehicle_subscriptions':
                    return formatInsertResult(await insertQuery(table, 'insertDocumentDetails', ...params));
                case 'vehicle_service_transfers':
                    return formatInsertResult(await insertQuery(table, 'insertTransferRequest', ...params));
                default:
                    return "-1";
            }
        } catch {
            return "-1";
        }
    }

    if (functionType === 'update') {
        try {
            switch (table) {
                case 'vehicle_subscriptions':
                    return formatQueryUpdateResult(await updateQuery(table, 'updateDocumentDetails', ...params));
                default:
                    return "-1";
            }
        } catch {
            return "-1";
        }
    }

    if (functionType === 'select') {
        try {
            switch (table) {
                case 'bk_cat':
                    return formatQueryResult(await selectQuery(table, 'getCategoryByName', ...params));
                default:
                    return "-1";
            }
        } catch {
            return "-1";
        }
    }

    return "-1";
}

// Mock format/DB helper functions
function formatInsertResult(result) {
    return result === false ? "-1" : "1";
}

function formatQueryUpdateResult(result) {
    return result === false ? "-1" : result;
}

function formatQueryResult(resultSet) {
    const defaultVal = "-1";
    if (!resultSet || resultSet === false || resultSet === 0) {
        return defaultVal;
    }
    return resultSet;
}

// Mock DB query functions
// async function insertQuery(table, action, ...params) {
//     // Simulated DB insert
//     return true;
// }

// async function updateQuery(table, action, ...params) {
//     // Simulated DB update
//     return true;
// }

// async function selectQuery(table, action, ...params) {
//     // Simulated DB select
//     return ['Sample'];
// }
