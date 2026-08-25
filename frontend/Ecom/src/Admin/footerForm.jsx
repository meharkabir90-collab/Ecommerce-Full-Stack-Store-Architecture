import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getFooter, updateFooter } from "../Services/FooterSettings";
import { Save, X } from "lucide-react";

function EditFooter() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    _id: "",
    aboutText: "",
    quickLinks: [],
    categories: [],
    copyright: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchFooter = async () => {
    try {
      const data = await getFooter();

      setForm(data.footer || {
        _id: "",
        aboutText: "",
        quickLinks: [],
        categories: [],
        copyright: "",
      });

    } catch (error) {
      console.error("Failed to load footer:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFooter();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // QUICK LINKS

  const addQuickLink = () => {
    setForm((prev) => ({
      ...prev,
      quickLinks: [
        ...prev.quickLinks,
        {
          title: "",
          url: "",
        },
      ],
    }));
  };

  const handleQuickLinkChange = (index, field, value) => {
    setForm((prev) => ({
      ...prev,
      quickLinks: prev.quickLinks.map((link, i) =>
        i === index
          ? { ...link, [field]: value }
          : link
      ),
    }));
  };

  const removeQuickLink = (index) => {
    setForm((prev) => ({
      ...prev,
      quickLinks: prev.quickLinks.filter(
        (_, i) => i !== index
      ),
    }));
  };

  // CATEGORIES

  const addCategory = () => {
    setForm((prev) => ({
      ...prev,
      categories: [
        ...prev.categories,
        {
          title: "",
          url: "",
        },
      ],
    }));
  };

  const handleCategoryChange = (index, field, value) => {
    setForm((prev) => ({
      ...prev,
      categories: prev.categories.map((category, i) =>
        i === index
          ? { ...category, [field]: value }
          : category
      ),
    }));
  };

  const removeCategory = (index) => {
    setForm((prev) => ({
      ...prev,
      categories: prev.categories.filter(
        (_, i) => i !== index
      ),
    }));
  };

  // SUBMIT

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      await updateFooter(form);

      navigate("/admin/footer");

    } catch (error) {
      console.error("Failed to update footer:", error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="p-8">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-stone-50 p-8 mt-24">
      <div className="max-w-4xl mx-auto">

        <div className="mb-6">
          <p className="text-xs font-semibold tracking-widest text-indigo-600 uppercase mb-1">
            Site structure
          </p>

          <h2 className="text-2xl font-serif font-bold text-stone-900">
            Edit Footer
          </h2>
        </div>

        <div className="bg-white border border-stone-200 rounded-xl shadow-sm p-6">

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* ABOUT TEXT */}

            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-stone-600">
                About Text
              </label>

              <textarea
                name="aboutText"
                value={form.aboutText}
                onChange={handleChange}
                rows={5}
                className="px-3 py-2 rounded-md border border-stone-200 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* QUICK LINKS */}

            <div>

              <div className="flex justify-between items-center mb-3">

                <label className="text-xs font-medium text-stone-600">
                  Quick Links
                </label>

                <button
                  type="button"
                  onClick={addQuickLink}
                  className="px-3 py-1.5 rounded-md bg-indigo-50 text-indigo-600 text-xs font-medium hover:bg-indigo-100"
                >
                  + Add Link
                </button>

              </div>

              <div className="space-y-3">

                {form.quickLinks.map((link, index) => (

                  <div
                    key={link._id || index}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 border border-stone-200 rounded-lg"
                  >

                    <input
                      type="text"
                      placeholder="Title"
                      value={link.title}
                      onChange={(e) =>
                        handleQuickLinkChange(
                          index,
                          "title",
                          e.target.value
                        )
                      }
                      className="px-3 py-2 rounded-md border border-stone-200 text-sm"
                    />

                    <input
                      type="text"
                      placeholder="URL"
                      value={link.url}
                      onChange={(e) =>
                        handleQuickLinkChange(
                          index,
                          "url",
                          e.target.value
                        )
                      }
                      className="px-3 py-2 rounded-md border border-stone-200 text-sm"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        removeQuickLink(index)
                      }
                      className="sm:col-span-2 text-left text-xs text-red-500 hover:text-red-600"
                    >
                      Remove
                    </button>

                  </div>

                ))}

              </div>
            </div>

            {/* CATEGORIES */}

            <div>

              <div className="flex justify-between items-center mb-3">

                <label className="text-xs font-medium text-stone-600">
                  Categories
                </label>

                <button
                  type="button"
                  onClick={addCategory}
                  className="px-3 py-1.5 rounded-md bg-indigo-50 text-indigo-600 text-xs font-medium hover:bg-indigo-100"
                >
                  + Add Category
                </button>

              </div>

              <div className="space-y-3">

                {form.categories.map((category, index) => (

                  <div
                    key={category._id || index}
                    className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 border border-stone-200 rounded-lg"
                  >

                    <input
                      type="text"
                      placeholder="Title"
                      value={category.title}
                      onChange={(e) =>
                        handleCategoryChange(
                          index,
                          "title",
                          e.target.value
                        )
                      }
                      className="px-3 py-2 rounded-md border border-stone-200 text-sm"
                    />

                    <input
                      type="text"
                      placeholder="URL"
                      value={category.url}
                      onChange={(e) =>
                        handleCategoryChange(
                          index,
                          "url",
                          e.target.value
                        )
                      }
                      className="px-3 py-2 rounded-md border border-stone-200 text-sm"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        removeCategory(index)
                      }
                      className="sm:col-span-2 text-left text-xs text-red-500 hover:text-red-600"
                    >
                      Remove
                    </button>

                  </div>

                ))}

              </div>
            </div>

            {/* COPYRIGHT */}

            <div className="flex flex-col gap-1">

              <label className="text-xs font-medium text-stone-600">
                Copyright
              </label>

              <input
                type="text"
                name="copyright"
                value={form.copyright}
                onChange={handleChange}
                className="px-3 py-2 rounded-md border border-stone-200 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

            </div>

            {/* BUTTONS */}

            <div className="flex items-center justify-end gap-2 pt-4 border-t border-stone-100">

              <button
                type="button"
                onClick={() => navigate("/admin/footer")}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md text-stone-600 text-sm font-medium hover:bg-stone-100"
              >
                <X size={15} />
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 disabled:opacity-60"
              >
                <Save size={15} />
                {saving ? "Saving..." : "Save Changes"}
              </button>

            </div>

          </form>

        </div>
      </div>
    </div>
  );
}

export default EditFooter;