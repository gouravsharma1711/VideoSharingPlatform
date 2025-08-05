import { useState } from "react";

const ChangePassword = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      alert("New passwords do not match.");
      return;
    }

    // 🔐 Call API or handle password change logic
    console.log("Password changed", formData);
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-[#0f0f0f] text-white rounded-xl shadow-lg ">
      <h2 className="text-2xl font-bold mb-6 text-center">Change Password</h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="currentPassword" className="block mb-1 font-medium">
            Current Password
          </label>
          <input
            type="password"
            name="currentPassword"
            id="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            placeholder="Enter current password"
            className="w-full px-4 py-2 text-black rounded-md outline-none border border-gray-300 focus:ring-2 focus:ring-purple-600"
          />
        </div>

        <div>
          <label htmlFor="newPassword" className="block mb-1 font-medium">
            New Password
          </label>
          <input
            type="password"
            name="newPassword"
            id="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            placeholder="Enter new password"
            className="w-full px-4 py-2 text-black rounded-md outline-none border border-gray-300 focus:ring-2 focus:ring-purple-600"
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block mb-1 font-medium">
            Retype New Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Retype new password"
            className="w-full px-4 py-2 text-black rounded-md outline-none border border-gray-300 focus:ring-2 focus:ring-purple-600"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md font-semibold"
        >
          Change Password
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
