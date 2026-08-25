import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getSetting, updateSetting } from "../Services/webSettingsService";
import { Save, X } from "lucide-react";
 
function EditWebSettings() {
  const navigate = useNavigate();
 
  const [form, setForm] = useState({
    _id: "",
    logo: "",
    address1: "",
    address2: "",
    address3: "",
    phone: "",
    whatsapp: "",
    email: "",
    facebook: "",
    instagram: "",
    linkedin: "",
    twitter: "",
    youtube: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState("");
 
  const fetchSettings = async () => {
    try {
      const data = await getSetting();
      const settingData = data.settings;
      setForm(settingData || {});
      setLogoPreview(settingData?.logo);
      console.log("Settings:", settingData);
    } catch (error) {
      console.error("Failed to load settings:", error);
    } finally {
      setLoading(false);
    }
  };
 
  useEffect(() => {
    fetchSettings();
  }, []);
 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
 
 const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();
  if (logoFile) formData.append("logo", logoFile);

  await updateSetting(formData);
  navigate("/admin/settings");
};

   const handleLogoFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
  };
 
  return (
    <div className="min-h-screen bg-stone-50 p-8 mt-24">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-xs font-semibold tracking-widest text-indigo-600 uppercase mb-1">
              Site structure
            </p>
            <h2 className="text-2xl font-serif font-bold text-stone-900">
              Edit Website Settings
            </h2>
          </div>
        </div>
 
        <div className="bg-white border border-stone-200 rounded-xl shadow-sm p-6">
          {loading ? (
            <div className="px-5 py-12 text-center">
              <p className="text-sm text-stone-400">Loading settings…</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                   <div className="flex items-center gap-4">
                    {logoPreview && (
                      <img
                        src={logoPreview}
                        alt="Logo preview"
                        className="h-14 w-14 rounded-md object-contain border border-stone-200 bg-stone-50"
                      />
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoFileChange}
                      className="text-sm text-stone-600 file:mr-3 file:px-3 file:py-2 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-indigo-50 file:text-indigo-600 hover:file:bg-indigo-100"
                    />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-stone-600">Phone</label>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    className="px-3 py-2 rounded-md border border-stone-200 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-stone-600">WhatsApp</label>
                  <input
                    name="whatsapp"
                    value={form.whatsapp}
                    onChange={handleChange}
                    className="px-3 py-2 rounded-md border border-stone-200 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-stone-600">Email</label>
                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="px-3 py-2 rounded-md border border-stone-200 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="flex flex-col gap-1 sm:col-span-2">
                  <label className="text-xs font-medium text-stone-600">Address line 1</label>
                  <input
                    name="address1"
                    value={form.address1}
                    onChange={handleChange}
                    className="px-3 py-2 rounded-md border border-stone-200 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="flex flex-col gap-1 sm:col-span-2">
                  <label className="text-xs font-medium text-stone-600">Address line 2</label>
                  <input
                    name="address2"
                    value={form.address2}
                    onChange={handleChange}
                    className="px-3 py-2 rounded-md border border-stone-200 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="flex flex-col gap-1 sm:col-span-2">
                  <label className="text-xs font-medium text-stone-600">Address line 3</label>
                  <input
                    name="address3"
                    value={form.address3}
                    onChange={handleChange}
                    className="px-3 py-2 rounded-md border border-stone-200 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-stone-600">Facebook</label>
                  <input
                    name="facebook"
                    value={form.facebook}
                    onChange={handleChange}
                    className="px-3 py-2 rounded-md border border-stone-200 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-stone-600">Instagram</label>
                  <input
                    name="instagram"
                    value={form.instagram}
                    onChange={handleChange}
                    className="px-3 py-2 rounded-md border border-stone-200 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-stone-600">LinkedIn</label>
                  <input
                    name="linkedin"
                    value={form.linkedin}
                    onChange={handleChange}
                    className="px-3 py-2 rounded-md border border-stone-200 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-stone-600">Twitter / X</label>
                  <input
                    name="twitter"
                    value={form.twitter}
                    onChange={handleChange}
                    className="px-3 py-2 rounded-md border border-stone-200 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-stone-600">YouTube</label>
                  <input
                    name="youtube"
                    value={form.youtube}
                    onChange={handleChange}
                    className="px-3 py-2 rounded-md border border-stone-200 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>
 
              <div className="flex items-center justify-end gap-2 pt-4 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => navigate("/admin/settings")}
                  className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md text-stone-600 text-sm font-medium hover:bg-stone-100 transition-colors"
                >
                  <X size={15} />
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 disabled:opacity-60 transition-colors"
                >
                  <Save size={15} />
                  {saving ? "Saving…" : "Save changes"}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
 
export default EditWebSettings;