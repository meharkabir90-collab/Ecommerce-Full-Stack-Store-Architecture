import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import {
  LayoutDashboard,
  Package,
  FileText,
  List,
  Settings,
  PanelBottom,
  ChevronDown,
  Menu,
} from "lucide-react";

import { useSidebar } from "./Context/SidebarContext";

function AdminSidebar() {
  const {
    isExpanded,
    isMobileOpen,
    isHovered,
    setIsHovered,
    toggleSidebar,
  } = useSidebar();

  const location = useLocation();

  const [openSubmenu, setOpenSubmenu] = useState(null);
  const [subMenuHeight, setSubMenuHeight] = useState({});
  const subMenuRefs = useRef({});

  /*
  |--------------------------------------------------------------------------
  | ADMIN MENU ITEMS
  |--------------------------------------------------------------------------
  */

  const navItems = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/admin",
    },

    {
      name: "Products",
      icon: <Package size={20} />,
      path: "/admin/products",
    },

    {
      name: "Orders",
      icon: <Package size={20} />,
      path: "/admin/customer",

    },

    {
      name: "Menu",
      icon: <List size={20} />,
      path: "/admin/menu",
    },

    {
      name: "Web Settings",
      icon: <Settings size={20} />,
      path: "/admin/settings",
    },

    {
      name: "Footer",
      icon: <PanelBottom size={20} />,
      path: "/admin/footer",
    },
  ];

  /*
  |--------------------------------------------------------------------------
  | CHECK ACTIVE ROUTE
  |--------------------------------------------------------------------------
  */

  const isActive = useCallback(
    (path) => {
      return location.pathname === path;
    },
    [location.pathname]
  );

  /*
  |--------------------------------------------------------------------------
  | HANDLE SUBMENU
  |--------------------------------------------------------------------------
  */

  const handleSubmenuToggle = (index, menuType) => {
    setOpenSubmenu((prev) => {
      if (
        prev &&
        prev.type === menuType &&
        prev.index === index
      ) {
        return null;
      }

      return {
        type: menuType,
        index,
      };
    });
  };

  /*
  |--------------------------------------------------------------------------
  | OPEN SUBMENU WHEN CURRENT ROUTE MATCHES
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    let submenuMatched = false;

    navItems.forEach((nav, index) => {
      if (nav.subItems) {
        nav.subItems.forEach((subItem) => {
          if (isActive(subItem.path)) {
            setOpenSubmenu({
              type: "main",
              index,
            });

            submenuMatched = true;
          }
        });
      }
    });

    if (!submenuMatched) {
      setOpenSubmenu(null);
    }
  }, [location.pathname, isActive]);

  /*
  |--------------------------------------------------------------------------
  | SUBMENU HEIGHT
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;

      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prev) => ({
          ...prev,
          [key]: subMenuRefs.current[key].scrollHeight,
        }));
      }
    }
  }, [openSubmenu]);

  /*
  |--------------------------------------------------------------------------
  | RENDER MENU ITEMS
  |--------------------------------------------------------------------------
  */

  const renderMenuItems = (items, menuType) => (
    <ul className="flex flex-col gap-6">
      {items.map((nav, index) => (
        <li key={nav.name}>

          {/* ===================================================== */}
          {/* ITEM WITH SUBMENU */}
          {/* ===================================================== */}

          {nav.subItems ? (
            <>
              <button
                onClick={() =>
                  handleSubmenuToggle(index, menuType)
                }
                className={`menu-item group flex flex-row items-center gap-3 w-full ${
                  openSubmenu?.type === menuType &&
                  openSubmenu?.index === index
                    ? "menu-item-active"
                    : "menu-item-inactive"
                }`}
              >
                {/* ICON */}
                <span className="flex items-center justify-center w-6 h-6 shrink-0">
                  {nav.icon}
                </span>

                {/* TEXT */}
                
                  <span className="menu-item-text whitespace-nowrap">
                    {nav.name}
                  </span>
                

                {/* CHEVRON */}
                {(isExpanded ||
                  isHovered ||
                  isMobileOpen) && (
                  <ChevronDown
                    size={18}
                    className={`ml-auto transition-transform duration-200 ${
                      openSubmenu?.type === menuType &&
                      openSubmenu?.index === index
                        ? "rotate-180"
                        : ""
                    }`}
                  />
                )}
              </button>

              {/* SUBMENU */}

              {(isExpanded ||
                isHovered ||
                isMobileOpen) && (
                <div
                  ref={(el) => {
                    subMenuRefs.current[
                      `${menuType}-${index}`
                    ] = el;
                  }}
                  className="overflow-hidden transition-all duration-300"
                  style={{
                    height:
                      openSubmenu?.type === menuType &&
                      openSubmenu?.index === index
                        ? `${subMenuHeight[
                            `${menuType}-${index}`
                          ]}px`
                        : "0px",
                  }}
                >
                  <ul className="mt-2 space-y-1 ml-9">
                    {nav.subItems.map((subItem) => (
                      <li key={subItem.name}>
                        <Link
                          to={subItem.path}
                          className={`menu-dropdown-item ${
                            isActive(subItem.path)
                              ? "menu-dropdown-item-active"
                              : "menu-dropdown-item-inactive"
                          }`}
                        >
                          {subItem.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </>
          ) : (

            /* ===================================================== */
            /* NORMAL MENU ITEM */
            /* ===================================================== */

            nav.path && (
          <Link
  to={nav.path}
  className={`group flex items-center justify-center w-full ${
    isActive(nav.path)
      ? "menu-item-active"
      : "menu-item-inactive"
  }`}
>
  <div className="flex items-center w-[220px]">

    {/* ICON COLUMN */}
    <span className="w-8 flex justify-center shrink-0">
      {nav.icon}
    </span>

    {/* TEXT COLUMN */}
    {(isExpanded || isHovered || isMobileOpen) && (
      <span className="ml-4 text-left whitespace-nowrap">
        {nav.name}
      </span>
    )}

  </div>
</Link>
            )
          )}
        </li>
      ))}
    </ul>
  );

  /*
  |--------------------------------------------------------------------------
  | SIDEBAR
  |--------------------------------------------------------------------------
  */

  return (
    <>
      {/* ===================================================== */}
      {/* MENU BUTTON ABOVE SIDEBAR */}
      {/* ===================================================== */}

      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-[60] flex items-center justify-center w-10 h-10 rounded-lg bg-white border border-gray-200 shadow-sm hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <Menu size={22} />
      </button>

      {/* ===================================================== */}
      {/* SIDEBAR */}
      {/* ===================================================== */}

      <aside
        className={`fixed flex flex-col top-20 left-0
          h-[calc(100vh-5rem)]
          bg-white dark:bg-gray-900
          border-r border-gray-200 dark:border-gray-800
          z-50
          transition-all duration-300 ease-in-out

          ${
            isExpanded || isMobileOpen
              ? "w-[290px]"
              : isHovered
              ? "w-[290px]"
              : "w-[90px]"
          }

          ${
            isMobileOpen
              ? "translate-x-0"
              : "-translate-x-full lg:translate-x-0"
          }
        `}
        onMouseEnter={() => {
          if (!isExpanded) {
            setIsHovered(true);
          }
        }}
        onMouseLeave={() => {
          if (isHovered) {
            setIsHovered(false);
          }
        }}
      >

        {/* ===================================================== */}
        {/* LOGO */}
        {/* ===================================================== */}

        <div
          className={`py-8 flex ${
            isExpanded ||
            isHovered ||
            isMobileOpen
              ? "justify-start px-6"
              : "justify-center"
          }`}
        >
          <Link to="/admin">

            {isExpanded ||
            isHovered ||
            isMobileOpen ? (
              <span className="text-2xl font-bold text-gray-800 dark:text-white">
                Admin Panel
              </span>
            ) : (
              <span className="text-xl font-bold text-gray-800 dark:text-white">
                A
              </span>
            )}

          </Link>
        </div>

        {/* ===================================================== */}
        {/* MENU CONTENT */}
        {/* ===================================================== */}

        <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">

          <nav className="mb-6">

            <div className="flex flex-col gap-4">

              {/* ================================================= */}
              {/* MAIN MENU */}
              {/* ================================================= */}

              <div>

                <h2
                  className={`mb-4 flex text-xs uppercase leading-5 text-gray-400 ${
                    !(
                      isExpanded ||
                      isHovered ||
                      isMobileOpen
                    )
                      ? "lg:justify-center"
                      : "justify-start"
                  }`}
                >
                  {isExpanded ||
                  isHovered ||
                  isMobileOpen ? (
                    "Admin Menu"
                  ) : (
                    <span className="text-xs">
                      •••
                    </span>
                  )}
                </h2>

                {renderMenuItems(
                  navItems,
                  "main"
                )}

              </div>

            </div>

          </nav>

        </div>

      </aside>
    </>
  );
}

export default AdminSidebar;