import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { getMenu, deleteMenu } from "../Services/menuService";
import { Pencil, Trash2, Plus } from "lucide-react";

function MenuList() {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMenus = async () => {
    try {
      const data = await getMenu();
      setMenus(data.menu || []);
    } catch (error) {
      console.error("Failed to load menus:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenus();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this menu item?")) return;

    try {
      await deleteMenu(id);

      setMenus((prev) => prev.filter((m) => m._id !== id));
    } catch (error) {
      console.error("Failed to delete menu item:", error);
    }
  };

  // Build parent -> child hierarchy
  const buildTree = (items, parentId = null) => {
    return items
      .filter(
        (item) =>
          String(item.parent || "") === String(parentId || "")
      )
      .sort((a, b) => a.order - b.order)
      .map((item) => ({
        ...item,
        children: buildTree(items, item._id),
      }));
  };

  const menuTree = buildTree(menus);

  if (loading) {
    return <p className="p-8">Loading...</p>;
  }

  // Recursive menu row
  const renderMenuRows = (items, level = 0) => {
    return items.flatMap((menu) => [
      <tr
        key={menu._id}
        className="border-b border-stone-100 last:border-0 hover:bg-stone-50/60 transition-colors"
      >
        {/* TITLE */}
        <td className="px-5 py-3 font-medium text-stone-800">
          <div
            className="flex items-center"
            style={{ paddingLeft: `${level * 28}px` }}
          >
            {level > 0 && (
              <span className="text-stone-300 mr-2">
                └─
              </span>
            )}

            <span>{menu.title}</span>
          </div>
        </td>

        {/* URL */}
        <td className="px-5 py-3">
          <span className="text-stone-500 font-mono text-xs">
            {menu.url}
          </span>
        </td>

        {/* ORDER */}
        <td className="px-5 py-3">
          <span className="inline-flex items-center justify-center w-6 h-6 rounded bg-stone-100 text-stone-600 text-xs font-semibold">
            {menu.order}
          </span>
        </td>

        {/* ACTIONS */}
        <td className="px-5 py-3">
          <div className="flex items-center justify-end gap-1">
            <NavLink
              to={`/admin/menu/edit/${menu._id}`}
              aria-label={`Edit ${menu.title}`}
              className="p-1.5 rounded-md text-stone-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"
            >
              <Pencil size={15} />
            </NavLink>

            <button
              onClick={() => handleDelete(menu._id)}
              aria-label={`Delete ${menu.title}`}
              className="p-1.5 rounded-md text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors"
            >
              <Trash2 size={15} />
            </button>
          </div>
        </td>
      </tr>,

      // Render children recursively
      ...renderMenuRows(menu.children, level + 1),
    ]);
  };

  return (
    <div className="min-h-screen bg-stone-50 p-8 mt-24">
      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <p className="text-xs font-semibold tracking-widest text-indigo-600 uppercase mb-1">
              Site structure
            </p>

            <h2 className="text-2xl font-serif font-bold text-stone-900">
              Navigation menu
            </h2>
          </div>

          <NavLink
            to="/admin/menu/add"
            className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-sm font-semibold px-4 py-2.5 rounded-lg transition"
          >
            <Plus size={16} strokeWidth={2.5} />
            Add menu item
          </NavLink>
        </div>

        {/* MENU TABLE */}
        <div className="bg-white border border-stone-200 rounded-xl shadow-sm overflow-hidden">

          {menus.length === 0 ? (
            <div className="px-5 py-12 text-center">
              <p className="text-sm text-stone-400">
                Nothing here yet. Add your first menu item to get started.
              </p>
            </div>
          ) : (
            <table className="w-full text-sm border-collapse">

              <thead>
                <tr className="text-left text-[11px] font-semibold uppercase tracking-wide text-stone-400 border-b border-stone-200">
                  <th className="px-5 py-3">Title</th>
                  <th className="px-5 py-3">URL</th>
                  <th className="px-5 py-3 w-20">Order</th>
                  <th className="px-5 py-3 w-32 text-right">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {renderMenuRows(menuTree)}
              </tbody>

            </table>
          )}

        </div>
      </div>
    </div>
  );
}

export default MenuList;

