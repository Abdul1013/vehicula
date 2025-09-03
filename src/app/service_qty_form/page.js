// "use client"; // Next.js App Router (Client Component)
// import { useState, useEffect } from "react";

// export default function QuantitySummary({ services = [], batchSession = "", userInfo = {} }) {
//   const [quantities, setQuantities] = useState({});
//   const [grandTotal, setGrandTotal] = useState(0);
//   const [redirecting, setRedirecting] = useState(false);

//   // Initialize quantities
//   useEffect(() => {
//     const initialQty = {};
//     services.forEach((svc) => {
//       initialQty[svc.id] = 1;
//     });
//     setQuantities(initialQty);
//   }, [services]);

//   // Calculate grand total whenever quantities change
//   useEffect(() => {
//     let total = 0;
//     services.forEach((svc) => {
//       total += (svc.amount || 0) * (quantities[svc.id] || 1);
//     });
//     setGrandTotal(total);
//   }, [quantities, services]);

//   const handleQuantityChange = (id, value) => {
//     setQuantities((prev) => ({ ...prev, [id]: Math.max(1, value) }));
//   };

//   const handleRemoveService = (id) => {
//     setQuantities((prev) => {
//       const updated = { ...prev };
//       delete updated[id];
//       return updated;
//     });
//   };

//   const handleProceed = (e) => {
//     e.preventDefault();
//     setRedirecting(true);
//     // Simulate form submission
//     const serviceIds = Object.keys(quantities).join(",");
//     const serviceQtys = Object.values(quantities).join(",");
//     console.log({ serviceIds, serviceQtys, batchSession });
//     // Replace with actual API call or navigation
//     setTimeout(() => alert("Proceeding with services..."), 1000);
//   };

//   return (
//     <div className="bg-white text-primary min-h-screen">
//       <div className="container mx-auto mt-[-30px] py-8">
//         <h5 className="text-center mb-6 text-lg font-semibold">Quantity Summary</h5>

//         <div className="space-y-4">
//           {services.map((svc) => {
//             const oldAmount = svc.oldAmount || 0;
//             const unitPrice = svc.amount || 0;
//             const qty = quantities[svc.id] || 1;

//             return (
//               <div key={svc.id} className="border rounded-lg p-4 flex flex-col lg:flex-row lg:items-center lg:justify-between">
//                 <div className="flex justify-between w-full mb-3 lg:mb-0">
//                   <h6 className="font-medium">{svc.serviceName} - {svc.variantName}</h6>
//                   <button
//                     onClick={() => handleRemoveService(svc.id)}
//                     className="text-red-500 hover:text-red-700"
//                     title="Remove service"
//                   >
//                     &times;
//                   </button>
//                 </div>

//                 <div className="flex flex-col lg:flex-row lg:gap-4 w-full">
//                   <div className="flex flex-col mb-3 lg:mb-0">
//                     <label className="text-sm mb-1">Quantity</label>
//                     <input
//                       type="number"
//                       min="1"
//                       className="border rounded px-2 py-1 w-full"
//                       value={qty}
//                       onChange={(e) => handleQuantityChange(svc.id, parseInt(e.target.value))}
//                     />
//                   </div>

//                   <div className="flex flex-col mb-3 lg:mb-0">
//                     <label className="text-sm mb-1">Unit Price</label>
//                     <div className="flex items-center gap-2">
//                       <input
//                         type="text"
//                         value={unitPrice.toLocaleString()}
//                         readOnly
//                         className="border rounded px-2 py-1 w-full bg-gray-100"
//                       />
//                       {oldAmount > 0 && (
//                         <span className="text-red-500 line-through text-sm">
//                           {oldAmount.toLocaleString()}
//                         </span>
//                       )}
//                     </div>
//                   </div>

//                   <div className="flex flex-col justify-end">
//                     <span className="font-bold text-primary text-right text-lg">
//                       ₦ { (unitPrice * qty).toLocaleString() }
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>

//         <div className="text-right font-bold text-xl text-primary mt-6">
//           Total: ₦ {grandTotal.toLocaleString()}
//         </div>

//         <form onSubmit={handleProceed} className="text-center mt-6">
//           <button
//             type="submit"
//             className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
//           >
//             Proceed &rarr;
//           </button>
//         </form>

//         {redirecting && (
//           <div className="text-center mt-6">
//             <div className="inline-flex items-center gap-2 text-sm text-gray-500">
//               <span className="animate-spin border-2 border-blue-500 border-t-transparent rounded-full w-4 h-4"></span>
//               Redirecting... Please wait!
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
"use client";

import { useMemo, useState, useEffect, Suspense} from "react";
import { useRouter, useSearchParams } from "next/navigation";

/**
 * Helper: format to Naira, keep the original UI pattern (₦ + thousand separators)
 */
const formatNaira = (value) => {
  if (value == null || isNaN(value)) return "0";
  try {
    // keep it compact (₦ 12,345) to mirror number_format + symbol
    return new Intl.NumberFormat("en-NG").format(Number(value));
  } catch {
    return String(value);
  }
};

function QuantitySummaryContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  /**
   * ================================
   * CONNECT YOUR DATA HERE
   * ================================
   * In PHP you had:
   * - $v["getServicesByID"]     => list of selected service variants with pricing
   * - $u_info["bk_uid"]         => current user id (used for concessions)
   * - $v["get_para"]            => ids used to form `serv_req`
   * - $v["batch_session"]       => optional batch id
   *
   * Replace the mock `initialServices` & `initialRefs` with your real data
   * (e.g., fetch in a parent server component and pass via props, or hydrate via an API call).
   */

  // Optional: read batch_id from URL (?batch_id=...)
  const batchIdFromURL = searchParams.get("batch_id") || "";

  // Mock of what $v["getServicesByID"] would look like, including any concession (oldPriceShown)
  // id: unique service/variant id   name: "Service - Variant"
  // unitPrice: active price (after any concession)   oldUnitPrice: original price (if discounted)
  const initialServices = useMemo(
    () => [
      // Example entries — replace with your data
      // { id: 101, name: "Car Wash - Exterior", unitPrice: 2500, oldUnitPrice: 3000 }
      // { id: 202, name: "Fumigation - Standard", unitPrice: 15000 }
    ],
    []
  );

  // Mock of $v["get_para"] used to construct serv_req (comma-separated IDs)
  const initialRefs = useMemo(
    () => initialServices.map((s) => s.id), // e.g., [101, 202]
    [initialServices]
  );

  // State store for line items (id, name, unitPrice, oldUnitPrice?, qty)
  const [items, setItems] = useState(() =>
    initialServices.map((s) => ({
      id: s.id,
      name: s.name,
      unitPrice: Number(s.unitPrice) || 0,
      oldUnitPrice: s.oldUnitPrice ? Number(s.oldUnitPrice) : null,
      qty: 1,
    }))
  );

  // Hidden-field style strings (mimics PHP: "1,1,1")
  const serviceIds = useMemo(() => items.map((i) => i.id).join(","), [items]);
  const serviceQtys = useMemo(() => items.map((i) => i.qty).join(","), [items]);

  // Grand total
  const grandTotal = useMemo(
    () => items.reduce((sum, i) => sum + i.unitPrice * i.qty, 0),
    [items]
  );

  // UX state for redirect spinner
  const [submitting, setSubmitting] = useState(false);

  const onQtyChange = (id, nextQty) => {
    setItems((prev) =>
      prev.map((it) =>
        it.id === id ? { ...it, qty: Math.max(1, Number(nextQty) || 1) } : it
      )
    );
  };

  const onRemove = (id) => {
    setItems((prev) => prev.filter((it) => it.id !== id));
  };

  const onProceed = (e) => {
    e.preventDefault();
    if (!items.length) return;

    setSubmitting(true);

    // Build URL the way the PHP form did:
    //  action='service-request'
    //    serv_req = comma-separated IDs
    //    serv_qty = comma-separated quantities (aligned to IDs)
    //    batch_id = optional
    const params = new URLSearchParams();
    params.set("serv_req", serviceIds);
    params.set("serv_qty", serviceQtys);
    const batchId = batchIdFromURL?.trim();
    if (batchId) params.set("batch_id", batchId);

    // Client-side redirect (keeps the “Redirecting…” UX)
    router.push(`/service-request?${params.toString()}`);
  };

  // If there are no items, we can hint the user
  useEffect(() => {
    // noop; reserved if you want to auto-redirect when empty
  }, [items]);

  return (
    <div className="bg-white mt-20 min-h-screen text-gray-900">
      {/* HEADER */}
      <div className="container mx-auto px-4 pt-6 mt-4">
        <h5 className="text-center text-lg font-semibold text-gray-800">
          Quantity summary
        </h5>
      </div>

      {/* CONTENT */}
      <div className="container mx-auto px-0 md:px-4 mt-4">
        {/* Batch session hidden (if you’re mirroring original hidden input) */}
        <input
          type="hidden"
          id="checkBatchSession"
          value={batchIdFromURL || ""}
          readOnly
        />

        {/* LIST */}
        <div className="rounded-xl border border-gray-200 overflow-hidden bg-white shadow-sm">
          {items.length ? (
            <ul className="divide-y divide-gray-100">
              {items.map((it) => {
                const lineTotal = it.unitPrice * it.qty;
                return (
                  <li
                    key={it.id}
                    className="p-4 md:p-5"
                    id={`serviceContainer_${it.id}`}
                  >
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h6 className="font-medium text-gray-900">{it.name}</h6>

                      {/* Remove */}
                      <button
                        type="button"
                        onClick={() => onRemove(it.id)}
                        className="text-red-600 hover:text-red-700 shrink-0 rounded-md p-2 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-200"
                        aria-label={`Remove ${it.name}`}
                        title="Remove service"
                      >
                        ×
                      </button>
                    </div>

                    <div className="grid grid-cols-12 gap-3 md:gap-4 items-end">
                      {/* Quantity */}
                      <div className="col-span-6 md:col-span-3">
                        <label
                          htmlFor={`qty_${it.id}`}
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Quantity
                        </label>
                        <input
                          id={`qty_${it.id}`}
                          type="number"
                          min={1}
                          value={it.qty}
                          onChange={(e) => onQtyChange(it.id, e.target.value)}
                          className="service_qty_input w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                          data-ref={it.id}
                          placeholder="Quantity"
                          inputMode="numeric"
                        />
                      </div>

                      {/* Unit price */}
                      <div className="col-span-6 md:col-span-3">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Unit price
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            readOnly
                            value={formatNaira(it.unitPrice)}
                            className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-gray-700"
                            aria-label="Unit price"
                          />
                          <input
                            type="hidden"
                            className="service_qty_unit_price"
                            value={it.unitPrice}
                            readOnly
                          />
                        </div>
                        {it.oldUnitPrice && it.oldUnitPrice > it.unitPrice ? (
                          <div className="text-xs text-red-600 mt-1 line-through">
                            ₦ {formatNaira(it.oldUnitPrice)}
                          </div>
                        ) : null}
                      </div>

                      {/* Line total */}
                      <div className="col-span-12 md:col-span-6 md:text-right">
                        <div className="text-sm text-gray-600">Line total</div>
                        <div className="fw-bold text-2xl font-semibold text-blue-700">
                          ₦{" "}
                          <span className="service_qty_unit_total">
                            {formatNaira(lineTotal)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="p-8 text-center text-gray-500">
              No services selected.
            </div>
          )}
        </div>

        {/* GRAND TOTAL */}
        <div className="mt-4 md:mt-6 text-right md:text-left">
          <div className="text-lg md:text-xl font-semibold text-gray-800">
            Total:{" "}
            <span className="text-blue-700">
              ₦ <span id="service_grand_total">{formatNaira(grandTotal)}</span>
            </span>
          </div>
        </div>

        {/* FORM (mirrors original hidden fields + Proceed button) */}
        <form
          id="service_price_check"
          onSubmit={onProceed}
          className="mt-5 flex items-center gap-3"
        >
          {/* Hidden: service ids (serv_req) */}
          <input type="hidden" id="service_ids" name="serv_req" value={serviceIds} readOnly />
          {/* Hidden: service qtys (serv_qty) */}
          <input type="hidden" id="service_qtys" name="serv_qty" value={serviceQtys} readOnly />
          {/* Hidden: optional batch id */}
          {batchIdFromURL ? (
            <input type="hidden" name="batch_id" value={batchIdFromURL} readOnly />
          ) : null}

          <button
            type="submit"
            id="btnProceedEdit"
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-white font-medium shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-60"
            disabled={!items.length || submitting}
          >
            {submitting ? (
              <>
                <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Redirecting...
              </>
            ) : (
              <>
                Make Payment<i className="ms-2">→</i>
              </>
            )}
          </button>
        </form>

        {/* Redirecting notice (kept for parity, but integrated into button) */}
        <div
          id="redirectingWait"
          className={`col-12 text-center py-5 ${submitting ? "" : "hidden"}`}
        >
          <div className="py-5 text-sm text-gray-600">
            <span
              className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-gray-600 border-t-transparent mr-2 align-[-2px]"
              role="status"
              aria-hidden="true"
            />
            Redirecting... Please wait!
          </div>
        </div>
      </div>
    </div>
  );
}

export default function QuantitySummaryPage() {
  return (
    <Suspense fallback={<div className="p-6 text-center">Loading...</div>}>
      <QuantitySummaryContent />
    </Suspense>
  );
}