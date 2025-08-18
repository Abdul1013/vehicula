// "use client";

// import { useState } from "react";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Button } from "@/components/ui/button";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// export default function DriversLicenseForm() {
//   const [form, setForm] = useState({
//     first_name: "",
//     surname: "",
//     other_name: "",
//     mother_maiden_name: "",
//     date_of_birth: "",
//     facial_mark: "",
//     blood_group: "",
//     disability: "",
//     height: "",
//     sex: "",
//     licence_class: "B", // default B like PHP
//     kin_phone: "",
//     state_of_origin: "",
//     local_government: "",
//     address: "",
//     phone_number: "",
//     email_address: "",
//     nin: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Form Submitted:", form);

//     // 🔹 Placeholder for backend API (PHP equivalent):
//     // fetch("/api/license", { method: "POST", body: JSON.stringify(form) })
//   };

//   return (
//     <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-5">
//       <input type="hidden" name="dl_application" value="1" />

//       {/* First Name */}
//       <div>
//         <Label htmlFor="first_name">First Name*</Label>
//         <Input id="first_name" name="first_name" value={form.first_name} onChange={handleChange} required />
//       </div>

//       {/* Surname */}
//       <div>
//         <Label htmlFor="surname">Surname*</Label>
//         <Input id="surname" name="surname" value={form.surname} onChange={handleChange} required />
//       </div>

//       {/* Other Name */}
//       <div>
//         <Label htmlFor="other_name">Other Name</Label>
//         <Input id="other_name" name="other_name" value={form.other_name} onChange={handleChange} />
//       </div>

//       {/* Mother’s Maiden Name */}
//       <div>
//         <Label htmlFor="mother_maiden_name">Mother&apos;s Maiden Name</Label>
//         <Input id="mother_maiden_name" name="mother_maiden_name" value={form.mother_maiden_name} onChange={handleChange} />
//       </div>

//       {/* Date of Birth */}
//       <div>
//         <Label htmlFor="date_of_birth">Date of Birth*</Label>
//         <Input type="date" id="date_of_birth" name="date_of_birth" value={form.date_of_birth} onChange={handleChange} required />
//       </div>

//       {/* Facial Mark */}
//       <div>
//         <Label htmlFor="facial_mark">Facial Mark</Label>
//         <Input id="facial_mark" name="facial_mark" value={form.facial_mark} onChange={handleChange} />
//       </div>

//       {/* Blood Group */}
//       <div>
//         <Label htmlFor="blood_group">Blood Group*</Label>
//         <Input id="blood_group" name="blood_group" value={form.blood_group} onChange={handleChange} required />
//       </div>

//       {/* Disability */}
//       <div>
//         <Label htmlFor="disability">Any Form Of Disability?</Label>
//         <Input id="disability" name="disability" value={form.disability} onChange={handleChange} />
//       </div>

//       {/* Height */}
//       <div>
//         <Label htmlFor="height">Height (Meters)</Label>
//         <Input id="height" name="height" value={form.height} onChange={handleChange} />
//       </div>

//       {/* Sex */}
//       <div>
//         <Label>Sex*</Label>
//         <Select onValueChange={(val) => setForm({ ...form, sex: val })} defaultValue={form.sex}>
//           <SelectTrigger>
//             <SelectValue placeholder="Select gender" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="Male">Male</SelectItem>
//             <SelectItem value="Female">Female</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>

//       {/* License Class */}
//       <div>
//         <Label>License Class*</Label>
//         <Select onValueChange={(val) => setForm({ ...form, licence_class: val })} defaultValue={form.licence_class}>
//           <SelectTrigger>
//             <SelectValue placeholder="Select license class" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="A">A - Motor cycle</SelectItem>
//             <SelectItem value="B">B - Motor vehicle &lt; 3 tonnes</SelectItem>
//             <SelectItem value="C">C - Light Vehicle</SelectItem>
//             <SelectItem value="D">D - General Vehicle</SelectItem>
//             <SelectItem value="E">E - Non-articulated Vehicle</SelectItem>
//             <SelectItem value="F">F - Agricultural Machines</SelectItem>
//             <SelectItem value="G">G - Articulated Vehicles</SelectItem>
//             <SelectItem value="H">H - Earth Moving Vehicles</SelectItem>
//             <SelectItem value="I">I - Special (Handicapped)</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>

//       {/* Next of Kin Phone */}
//       <div>
//         <Label htmlFor="kin_phone">Next of Kin Phone Number</Label>
//         <Input id="kin_phone" name="kin_phone" value={form.kin_phone} onChange={handleChange} />
//       </div>

//       {/* State of Origin */}
//       <div>
//         <Label htmlFor="state_of_origin">State of Origin*</Label>
//         <Input id="state_of_origin" name="state_of_origin" value={form.state_of_origin} onChange={handleChange} required />
//       </div>

//       {/* Local Government */}
//       <div>
//         <Label htmlFor="local_government">Local Government*</Label>
//         <Input id="local_government" name="local_government" value={form.local_government} onChange={handleChange} required />
//       </div>

//       {/* Address */}
//       <div>
//         <Label htmlFor="address">Address*</Label>
//         <Input id="address" name="address" value={form.address} onChange={handleChange} required />
//       </div>

//       {/* Phone Number */}
//       <div>
//         <Label htmlFor="phone_number">Phone Number*</Label>
//         <Input id="phone_number" name="phone_number" value={form.phone_number} onChange={handleChange} required />
//       </div>

//       {/* Email Address */}
//       <div>
//         <Label htmlFor="email_address">Email Address</Label>
//         <Input id="email_address" name="email_address" type="email" value={form.email_address} onChange={handleChange} />
//       </div>

//       {/* NIN */}
//       <div>
//         <Label htmlFor="nin">NIN*</Label>
//         <Input id="nin" name="nin" value={form.nin} onChange={handleChange} required />
//       </div>

//       {/* Submit */}
//       <div className="text-center">
//         <Button type="submit" className="w-full">Update Application Details</Button>
//       </div>
//     </form>
//   );
// }
