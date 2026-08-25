import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { getFooter } from "../Services/FooterSettings";
import { Pencil } from "lucide-react";

function Footer() {
  const [footer, setFooter] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchFooter = async () => {
    try {
      const data = await getFooter();
      setFooter(data.footer);
    } catch (error) {
      console.error("Failed to load footer:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFooter();
  }, []);

  if (loading) {
    return <p className="p-8">Loading...</p>;
  }

   return (
    <div className="min-h-screen bg-stone-50 p-8 mt-24">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-xs font-semibold tracking-widest text-indigo-600 uppercase mb-1">
              Site structure
            </p>

            <h2 className="text-2xl font-serif font-bold text-stone-900">
              Footer
            </h2>
          </div>

          {footer && (
            <NavLink
              to={`/admin/footer/edit/${footer._id}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700"
            >
              <Pencil size={15} />
              Edit Footer
            </NavLink>
          )}
        </div>

        {/* Content */}
        <div className="bg-white border border-stone-200 rounded-xl shadow-sm overflow-hidden">

          {!footer ? (
            <div className="px-5 py-12 text-center">
              <p className="text-sm text-stone-400">
                No footer settings found.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-stone-100">

              {/* About */}
              <div className="p-6">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-stone-400 mb-2">
                  About Text
                </h3>

                <p className="text-sm text-stone-600 leading-6">
                  {footer.aboutText}
                </p>
              </div>

              {/* Quick Links */}
              <div className="p-6">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-stone-400 mb-4">
                  Quick Links
                </h3>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-[11px] font-semibold uppercase tracking-wide text-stone-400 border-b border-stone-200">
                        <th className="pb-3">Title</th>
                        <th className="pb-3">URL</th>
                      </tr>
                    </thead>

                    <tbody>
                      {footer.quickLinks?.map((link) => (
                        <tr
                          key={link._id}
                          className="border-b border-stone-100 last:border-0"
                        >
                          <td className="py-3 font-medium text-stone-700">
                            {link.title}
                          </td>

                          <td className="py-3 text-stone-500">
                            {link.url}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Categories */}
              <div className="p-6">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-stone-400 mb-4">
                  Categories
                </h3>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-[11px] font-semibold uppercase tracking-wide text-stone-400 border-b border-stone-200">
                        <th className="pb-3">Title</th>
                        <th className="pb-3">URL</th>
                      </tr>
                    </thead>

                    <tbody>
                      {footer.categories?.map((category) => (
                        <tr
                          key={category._id}
                          className="border-b border-stone-100 last:border-0"
                        >
                          <td className="py-3 font-medium text-stone-700">
                            {category.title}
                          </td>

                          <td className="py-3 text-stone-500">
                            {category.url}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Copyright */}
              <div className="p-6">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-stone-400 mb-2">
                  Copyright
                </h3>

                <p className="text-sm text-stone-600">
                  {footer.copyright}
                </p>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default Footer;