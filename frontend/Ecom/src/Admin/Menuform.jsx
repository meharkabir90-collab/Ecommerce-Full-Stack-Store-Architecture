import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getMenu,
  createMenu,
  updateMenu,
} from "../Services/menuService";
import { Plus, X } from "lucide-react";

function MenuForm() {
  const { id } = useParams();
  const isEditMode = Boolean(id);
  const navigate = useNavigate();

  // Form data
  const [formData, setFormData] = useState({
    title: "",
    url: "",
    order: "",
    parent: "",
  });

  // All menus - used for Parent dropdown
  const [menus, setMenus] = useState([]);

  const [loading, setLoading] = useState(isEditMode);
  const [saving, setSaving] = useState(false);

  // ==========================================
  // GET MENUS
  // ==========================================

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const data = await getMenu();

        console.log("ALL MENUS:", data);

        setMenus(data.menu || []);

        // If editing, find the current menu item
        if (isEditMode) {
          const existing = data.menu?.find(
            (m) => m._id === id
          );

          if (existing) {
            setFormData({
              title: existing.title || "",
              url: existing.url || "",
              order: existing.order ?? "",
              parent: existing.parent || null,
            });
          } else {
            console.error("Menu item not found");
            navigate("/admin/menu");
          }
        }
      } catch (error) {
        console.error("Failed to load menus:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenus();
  }, [id, isEditMode, navigate]);

  // ==========================================
  // HANDLE CHANGE
  // ==========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "order"
          ? value === ""
            ? ""
            : Number(value)
          : value,
    }));
  };

  // ==========================================
  // SUBMIT
  // ==========================================

  const handleSubmit = async (e) => {
  e.preventDefault();

  const payload = {
    ...formData,
    parent: formData.parent || null,
  };

  console.log("SUBMIT PAYLOAD:", payload);

  setSaving(true);

  try {
    if (isEditMode) {
      await updateMenu(id, payload);
    } else {
      await createMenu(payload);
    }

    navigate("/admin/menu");
  } catch (error) {
    console.error(
      "Failed to save menu item:",
      error
    );
  } finally {
    setSaving(false);
  }
};

  if (loading) {
    return <p className="p-8">Loading...</p>;
  }

  return (
    <div className="min-h-screen mt-16 bg-stone-50 flex items-center justify-center py-10 px-4">

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white border border-stone-200 rounded-xl shadow-sm p-6"
      >

        {/* HEADER */}

        <div className="flex items-center justify-between mb-6">

          <div>
            <p className="text-xs font-semibold tracking-widest text-indigo-600 uppercase mb-1">
              Site structure
            </p>

            <h2 className="text-2xl font-serif font-bold text-stone-900">
              {isEditMode
                ? "Edit menu item"
                : "Add menu item"}
            </h2>
          </div>

          {isEditMode && (
            <span className="text-[11px] font-semibold uppercase tracking-wide text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
              Editing
            </span>
          )}

        </div>

        <div className="space-y-4">

          {/* TITLE */}

          <div>
            <label
              htmlFor="title"
              className="block text-xs font-semibold text-stone-600 mb-1.5"
            >
              Title
            </label>

            <input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="e.g. About us"
              className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
            />
          </div>

          {/* URL */}

          <div>
            <label
              htmlFor="url"
              className="block text-xs font-semibold text-stone-600 mb-1.5"
            >
              URL
            </label>

            <input
              id="url"
              name="url"
              value={formData.url}
              onChange={handleChange}
              required
              placeholder="e.g. /about-us"
              className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition font-mono"
            />
          </div>

          {/* PARENT MENU */}

          <div>
            <label
              htmlFor="parent"
              className="block text-xs font-semibold text-stone-600 mb-1.5"
            >
              Parent Menu
            </label>

            <select
              id="parent"
              name="parent"
              value={formData.parent || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 text-sm border border-stone-300 rounded-lg outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
            >
              <option value="">
                Top Level
              </option>

              {menus
              .filter((menu) => !isEditMode || menu._id != id)
                .map((menu) => (
                  <option
                    key={menu._id}
                    value={menu._id}
                  >
                    {menu.title}
                  </option>
                ))}
            </select>
          </div>

          {/* ORDER */}

          <div>
            <label
              htmlFor="order"
              className="block text-xs font-semibold text-stone-600 mb-1.5"
            >
              Order
            </label>

            <input
              id="order"
              name="order"
              type="number"
              min="0"
              value={formData.order}
              onChange={handleChange}
              required
              placeholder="1"
              className="w-24 px-3 py-2 text-sm border border-stone-300 rounded-lg outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition"
            />
          </div>

        </div>

        {/* BUTTONS */}

        <div className="flex items-center gap-2 mt-6">

          <button
            type="submit"
            disabled={saving}
            className="flex-1 inline-flex items-center justify-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? (
              "Saving..."
            ) : isEditMode ? (
              "Update item"
            ) : (
              <>
                <Plus
                  size={16}
                  strokeWidth={2.5}
                />
                Add item
              </>
            )}
          </button>

          <button
            type="button"
            className="inline-flex items-center justify-center gap-1.5 border border-stone-300 hover:bg-stone-50 text-stone-700 text-sm font-semibold px-4 py-2.5 rounded-lg transition"
            onClick={() =>
              navigate("/admin/menu")
            }
          >
            <X size={16} />
            Cancel
          </button>

        </div>

      </form>
    </div>
  );
}

export default MenuForm;