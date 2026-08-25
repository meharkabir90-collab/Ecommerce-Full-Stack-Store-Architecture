import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { getSetting, updateSetting } from "../Services/webSettingsService";
import { Pencil, Trash2, Plus } from "lucide-react";

function WebSettings() {
  const [settings, setSettings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    try {
      const data = await getSetting();
      setSettings(data.settings || []);
    } catch (error) {
      console.error("Failed to load settings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);


    return (
    <div className="min-h-screen bg-stone-50 p-8 mt-24">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-xs font-semibold tracking-widest text-indigo-600 uppercase mb-1">
              Site structure
            </p>
            <h2 className="text-2xl font-serif font-bold text-stone-900">
              Website Settings
            </h2>
          </div>
        </div>
 
        <div className="bg-white border border-stone-200 rounded-xl shadow-sm overflow-hidden">
          {loading ? (
            <div className="px-5 py-12 text-center">
              <p className="text-sm text-stone-400">Loading settings…</p>
            </div>
          ) : settings.length === 0 ? (
            <div className="px-5 py-12 text-center">
              <p className="text-sm text-stone-400">
                Nothing here yet. Add your first setting item to get started.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="text-left text-[11px] font-semibold uppercase tracking-wide text-stone-400 border-b border-stone-200">
                    <th className="px-5 py-3">Logo</th>
                    <th className="px-5 py-3">Address</th>
                    <th className="px-5 py-3">Contact</th>
                    <th className="px-5 py-3">Social</th>
                    <th className="px-5 py-3 w-24 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {settings && (
                    <tr
                      key={settings._id}
                      className="border-b border-stone-100 last:border-0 hover:bg-stone-50/60 transition-colors align-top"
                    >
                      <td className="px-5 py-3 font-medium text-stone-800">
                        {settings.logo}
                      </td>
                      <td className="px-5 py-3 text-stone-500 text-xs">
                        <div>{settings.address1}</div>
                        <div>{settings.address2}</div>
                        <div>{settings.address3}</div>
                      </td>
                      <td className="px-5 py-3 text-stone-500 text-xs">
                        <div>{settings.phone}</div>
                        <div>{settings.whatsapp}</div>
                        <div>{settings.email}</div>
                      </td>
                      <td className="px-5 py-3 text-stone-500 text-xs">
                        <div>{settings.facebook}</div>
                        <div>{settings.instagram}</div>
                        <div>{settings.linkedin}</div>
                        <div>{settings.twitter}</div>
                        <div>{settings.youtube}</div>
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex items-center justify-end gap-1">
                          {/* Each link is unique per row because it's built from this
                              row's own setting._id, not a shared/static value. */}
                          <NavLink
                            to={`/admin/settings/edit/${settings._id}`}
                            aria-label={`Edit ${settings.logo || settings._id}`}
                            className="p-1.5 rounded-md text-stone-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
                          >
                            <Pencil size={15} />
                          </NavLink>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default WebSettings;