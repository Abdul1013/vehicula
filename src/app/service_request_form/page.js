// pages/service-form.jsx
'use client';

import { useState, useEffect } from 'react';

export default function ServiceForm({ v = {}  }) {
  const uInfo = v.u_info || {};
  const [formData, setFormData] = useState({
    s_full_name: v.srv_full_name || '',
    s_phone_number: v.srv_phone_number || '',
    s_address: v.srv_address || '',
    s_dob: v.srv_dob || '',
    dropzone_img_url: v.uploads_url || '',
  });

  const [uploadedFiles, setUploadedFiles] = useState(
    v.uploads_url ? v.uploads_url.split(',') : []
  );

  const getServicesByID = v.getServicesByID || [];
  const urlParaArr = v.url_para || {};
  const getParaQtys = v.get_para_qts || {};

  const [displayOpted, setDisplayOpted] = useState([]);
  const [totalUploads, setTotalUploads] = useState(0);

  useEffect(() => {
    // Generate displayOpted dynamically based on PHP logic
    let opted = [];
    let uploadsCount = 0;

    getServicesByID.forEach((service) => {
      const vss_id = service.vss_id;
      const vs_id_fk = parseInt(service.vs_id_fk);
      let qty = getParaQtys[vss_id] || 1;
      let qtyMarkup = qty > 1 ? ` (Qty: ${qty})` : '';
      let toUpload = [];
      let thisTotal = 0;

      const checkStr = service.vss_name.toLowerCase();

      switch (vs_id_fk) {
        case 1:
          if (checkStr.includes('fresh')) {
            toUpload = ['Custom Duty', 'Purchase Receipt'];
            thisTotal = 2 * qty;
          } else {
            toUpload = ['Current Vehicle License'];
            thisTotal = 1 * qty;
          }
          break;
        case 2:
        case 5:
        case 6:
          toUpload = ['Current Vehicle License'];
          thisTotal = 1 * qty;
          break;
        case 3:
          toUpload = ['Current Vehicle License', 'Sales Agreement', "New Owner's Government Issued ID"];
          thisTotal = 3 * qty;
          break;
        case 8:
          if (!checkStr.includes('fresh')) {
            if (!checkStr.includes('renewal')) {
              toUpload = ["Current Driver's License", 'International Passport', 'Passport photo'];
              thisTotal = 3 * qty;
            } else {
              toUpload = ["Current Driver's License"];
              thisTotal = 1 * qty;
            }
          }
          break;
        default:
          break;
      }

      uploadsCount += thisTotal;

      opted.push({
        serviceName: service.v_s_name,
        subServiceName: service.vss_name,
        qtyMarkup,
        toUpload,
      });
    });

    setDisplayOpted(opted);
    setTotalUploads(uploadsCount);
  }, [getServicesByID, getParaQtys]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit logic here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="container mx-auto bg-white text-primary py-6">
      <div className="max-w-3xl mx-auto">
        <h5 className="text-center mb-4">Provide details below</h5>

        {/* Error Text */}
        {v.error_txt && <div className="mb-4 text-red-600">{v.error_txt}</div>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Conditional Fields */}
          {Object.keys(urlParaArr).some((key) => ['1', '9'].includes(key)) && (
            <>
              <div className="relative">
                <input
                  type="text"
                  name="s_full_name"
                  value={formData.s_full_name}
                  onChange={handleChange}
                  className="peer block w-full rounded border border-gray-300 p-3 focus:border-blue-500 focus:ring focus:ring-blue-200"
                  placeholder="Full name"
                  required
                />
                <label className="absolute left-3 top-3 text-gray-500 text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-blue-500 peer-focus:text-xs">
                  Full name
                </label>
              </div>

              {true /* replace with is_full condition logic */ && (
                <>
                  <div className="relative">
                    <input
                      type="tel"
                      name="s_phone_number"
                      value={formData.s_phone_number}
                      onChange={handleChange}
                      className="peer block w-full rounded border border-gray-300 p-3 focus:border-blue-500 focus:ring focus:ring-blue-200"
                      placeholder="Phone number"
                      required
                    />
                    <label className="absolute left-3 top-3 text-gray-500 text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-blue-500 peer-focus:text-xs">
                      Phone number
                    </label>
                  </div>

                  <div className="relative">
                    <input
                      type="text"
                      name="s_address"
                      value={formData.s_address}
                      onChange={handleChange}
                      className="peer block w-full rounded border border-gray-300 p-3 focus:border-blue-500 focus:ring focus:ring-blue-200"
                      placeholder="Address"
                      required
                    />
                    <label className="absolute left-3 top-3 text-gray-500 text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-blue-500 peer-focus:text-xs">
                      Address
                    </label>
                  </div>
                </>
              )}

              {!true /* else date of birth logic */ && (
                <div className="relative">
                  <input
                    type="date"
                    name="s_dob"
                    value={formData.s_dob}
                    onChange={handleChange}
                    className="peer block w-full rounded border border-gray-300 p-3 focus:border-blue-500 focus:ring focus:ring-blue-200"
                    placeholder="Date of birth"
                    required
                  />
                  <label className="absolute left-3 top-3 text-gray-500 text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-focus:top-0 peer-focus:text-blue-500 peer-focus:text-xs">
                    Date of birth
                  </label>
                </div>
              )}
            </>
          )}

          {/* Selected Services */}
          <div className="bg-gray-100 p-4 rounded">
            <div className="font-semibold text-sm mb-2">Your selected services:</div>
            <ol className="text-sm space-y-2">
              {displayOpted.map((item, idx) => (
                <li key={idx}>
                  <span>
                    {item.serviceName} - {item.subServiceName} {item.qtyMarkup}
                  </span>
                  {item.toUpload.length > 0 && (
                    <ul className="italic pl-4 mt-1 list-disc">
                      {item.toUpload.map((upload, i) => (
                        <li key={i}>{upload}</li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ol>
          </div>

          {/* File Uploads */}
          {totalUploads > 0 && (
            <div className="mt-4">
              <div className="text-sm mb-2">
                <div className="bg-green-100 p-2 rounded border border-green-400 text-green-800">
                  <i className="fas fa-info-circle mr-2"></i>
                  You are required to upload <strong>{totalUploads} images</strong> of not more than <strong>5MB each.</strong>
                </div>
              </div>
              <div className="border-2 border-dashed border-gray-300 rounded p-4 text-center">
                <p className="text-gray-500">Drag & drop files here or click to upload</p>
                {/* Implement Dropzone or file input */}
                <input
                  type="file"
                  multiple
                  className="mt-2"
                  onChange={(e) => setUploadedFiles([...uploadedFiles, ...e.target.files])}
                />
              </div>
            </div>
          )}

          <input type="hidden" name="send_serv_data" value="1" />
          <input type="hidden" name="services_selected" value={v.service_list || ''} />
          <input type="hidden" name="services_qty" value={v.service_qty || ''} />

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50 hover:bg-blue-700 flex items-center justify-center space-x-2"
          >
            <span>Proceed</span>
            <i className="fas fa-long-arrow-alt-right"></i>
          </button>
        </form>
      </div>
    </div>
  );
}
