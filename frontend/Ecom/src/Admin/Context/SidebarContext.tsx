import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

const SidebarContext = createContext(undefined);

export const useSidebar = () => {
  const context = useContext(SidebarContext);

  if (!context) {
    throw new Error(
      "useSidebar must be used within a SidebarProvider"
    );
  }

  return context;
};

export const SidebarProvider = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const [activeItem, setActiveItem] = useState(null);
  const [openSubmenu, setOpenSubmenu] = useState(null);

  /*
  |--------------------------------------------------------------------------
  | CHECK MOBILE SCREEN
  |--------------------------------------------------------------------------
  */

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;

      setIsMobile(mobile);

      if (!mobile) {
        setIsMobileOpen(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  /*
  |--------------------------------------------------------------------------
  | TOGGLE DESKTOP SIDEBAR
  |--------------------------------------------------------------------------
  */

  const toggleSidebar = () => {
    setIsExpanded((prev) => !prev);
  };

  /*
  |--------------------------------------------------------------------------
  | TOGGLE MOBILE SIDEBAR
  |--------------------------------------------------------------------------
  */

  const toggleMobileSidebar = () => {
    setIsMobileOpen((prev) => !prev);
  };

  /*
  |--------------------------------------------------------------------------
  | TOGGLE SUBMENU
  |--------------------------------------------------------------------------
  */

  const toggleSubmenu = (item) => {
    setOpenSubmenu((prev) =>
      prev === item ? null : item
    );
  };

  /*
  |--------------------------------------------------------------------------
  | PROVIDER
  |--------------------------------------------------------------------------
  */

  return (
    <SidebarContext.Provider
      value={{
        isExpanded: isMobile ? false : isExpanded,

        isMobileOpen,

        isHovered,

        activeItem,

        openSubmenu,

        toggleSidebar,

        toggleMobileSidebar,

        setIsHovered,

        setActiveItem,

        toggleSubmenu,
      }}
    >
      {children}
    </SidebarContext.Provider>
  );
};