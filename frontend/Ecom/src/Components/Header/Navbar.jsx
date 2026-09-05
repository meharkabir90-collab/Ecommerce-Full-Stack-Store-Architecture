import { NavLink, Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import {
    faCartShopping,
    faHeart,
    faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { getMenu } from "../../Services/menuService";
import { getSetting } from "../../Services/webSettingsService";
import { getProducts } from "../../Services/productService";
import { getCart } from "../../Services/cartService";


function Navbar() {

    // =====================================================
    // STATES
    // =====================================================

    const [scrolled, setScrolled] = useState(false);

    const [showSearch, setShowSearch] = useState(false);

    const [menus, setMenus] = useState([]);

    const [settings, setSettings] = useState(null);

    const [products, setProducts] = useState([]);

    const [searchTerm, setSearchTerm] = useState("");

    const [cartCount, setCartCount] = useState(0);


    const location = useLocation();

    const isHome = location.pathname === "/";


    // =====================================================
    // SCROLL
    // =====================================================

    useEffect(() => {

        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener(
                "scroll",
                handleScroll
            );
        };

    }, []);


    // =====================================================
    // GET MENUS
    // =====================================================

    useEffect(() => {

        const fetchMenus = async () => {

            try {

                const data = await getMenu();

                console.log(
                    "CUSTOMER MENUS:",
                    data.menu
                );

                setMenus(data.menu || []);

            } catch (error) {

                console.error(
                    "Failed to load menus:",
                    error
                );

            }

        };

        fetchMenus();

    }, []);


    // =====================================================
    // GET WEBSITE SETTINGS
    // =====================================================

    useEffect(() => {

        const fetchSettings = async () => {

            try {

                const data = await getSetting();

                /*
                 * Depending on backend,
                 * settings may be object or array.
                 */

                if (Array.isArray(data.settings)) {

                    setSettings(
                        data.settings[0] || null
                    );

                } else {

                    setSettings(
                        data.settings || null
                    );

                }

            } catch (error) {

                console.error(
                    "Failed to load settings:",
                    error
                );

            }

        };

        fetchSettings();

    }, []);


    // =====================================================
    // GET CART
    // =====================================================

    useEffect(() => {

        const fetchCart = async () => {

            const token =
                localStorage.getItem("token");

            // User is not logged in
            if (!token) {

                setCartCount(0);

                return;
            }

            try {

                const data = await getCart();

                const items =
                    data.cart?.items || [];


                // Calculate total quantity
                const totalQuantity =
                    items.reduce(
                        (total, item) =>
                            total +
                            Number(
                                item.quantity || 0
                            ),
                        0
                    );


                setCartCount(
                    totalQuantity
                );

            } catch (error) {

                console.error(
                    "Failed to load cart:",
                    error
                );

                setCartCount(0);

            }

        };

        fetchCart();

    }, [location.pathname]);


    // =====================================================
    // SEARCH
    // =====================================================

    const handleSearch = async (e) => {

        e.preventDefault();

        const search =
            searchTerm.trim();

        if (!search) {

            setProducts([]);

            return;
        }

        try {

            const data =
                await getProducts(search);

            setProducts(
                data.products || []
            );

        } catch (error) {

            console.error(
                "Search failed:",
                error
            );

            setProducts([]);

        }

    };


    // =====================================================
    // MENU HIERARCHY
    // =====================================================

    /*
     * Top-level menus:
     *
     * parent === null
     *
     * Example:
     *
     * Sports
     * About
     * Contact
     */

    const parentMenus = menus
        .filter((menu) => !menu.parent)
        .sort(
            (a, b) =>
                Number(a.order || 0) -
                Number(b.order || 0)
        );


    // =====================================================
    // GET CHILDREN
    // =====================================================

    /*
     * Supports BOTH possible API formats:
     *
     * 1. parent: "65abc123"
     *
     * 2. parent: {
     *      _id: "65abc123",
     *      title: "Sports"
     *    }
     */

    const getChildren = (parentId) => {

        return menus
            .filter((child) => {

                if (!child.parent) {
                    return false;
                }

                const childParentId =
                    typeof child.parent === "object"
                        ? child.parent._id
                        : child.parent;

                return (
                    String(childParentId) ===
                    String(parentId)
                );

            })
            .sort(
                (a, b) =>
                    Number(a.order || 0) -
                    Number(b.order || 0)
            );

    };

    const renderSubMenu = (parentId, level = 0) => {

    const children = getChildren(parentId);

    if (children.length === 0) {
        return null;
    }

    return (
        <div
            className={`
                absolute
                hidden
                group-hover:flex
                flex-col
                bg-white
                text-black
                min-w-48
                shadow-lg
                z-50

                ${
                    level === 0
                        ? "top-full left-0 rounded-b-md"
                        : "top-0 left-full rounded-md"
                }
            `}
        >

            {children.map((child) => {

                const childChildren =
                    getChildren(child._id);

                const hasChildren =
                    childChildren.length > 0;

                return (

                    <div
                        key={child._id}
                        className="
                            relative
                            group
                        "
                    >

                        <NavLink
                            to={child.url || "#"}
                            onClick={(e) => {

                                if (
                                    hasChildren &&
                                    (!child.url ||
                                        child.url === "#")
                                ) {
                                    e.preventDefault();
                                }

                            }}
                            className={({ isActive }) => `
                                px-4
                                py-3
                                whitespace-nowrap
                                flex
                                items-center
                                justify-between
                                transition

                                ${
                                    isActive
                                        ? "bg-gray-100 font-semibold"
                                        : "hover:bg-gray-100"
                                }
                            `}
                        >

                            <span>
                                {child.title}
                            </span>

                            {hasChildren && (
                                <span className="ml-4 text-xs">
                                    ▶
                                </span>
                            )}

                        </NavLink>


                        {/* RECURSIVE LEVEL */}

                        {hasChildren &&
                            renderSubMenu(
                                child._id,
                                level + 1
                            )}

                    </div>

                );

            })}

        </div>
    );
};


    // =====================================================
    // RETURN
    // =====================================================

    return (

        <>

            {/* =================================================
                NAVBAR
            ================================================= */}

            <header
                className={`
                    fixed
                    top-0
                    left-0
                    w-full
                    h-24
                    z-[999]
                    flex
                    items-center
                    justify-between
                    px-16
                    transition-all
                    duration-300
                    ${
                        isHome && !scrolled
                            ? "bg-transparent"
                            : "bg-black"
                    }
                `}
            >


                {/* =================================================
                    LOGO
                ================================================= */}

                <section className="flex items-center">

                    {settings?.logo && (

                        <Link to="/">

                            <img
                                src={settings.logo}
                                alt="Logo"
                                className="w-24 h-16 object-contain"
                            />

                        </Link>

                    )}

                </section>


                {/* =================================================
                    NAVIGATION
                ================================================= */}

                <section
                    className="
                        flex
                        flex-row
                        items-center
                        text-white
                        gap-8
                        text-md
                        font-normal
                    "
                    style={{
                        fontFamily: "Poppins",
                    }}
                >

                    {parentMenus.map(
                        (menu) => {

                            // Get children belonging
                            // to this parent
                            const children =
                                getChildren(
                                    menu._id
                                );


                            return (

                                <div
                                    key={menu._id}
                                    className="
                                        relative
                                        group
                                        h-24
                                        flex
                                        items-center
                                    "
                                >

                                    {/* =================================================
                                        PARENT MENU
                                    ================================================= */}

                                    <NavLink
                                        to={
                                            menu.url || "#"
                                        }
                                        onClick={(e) => {

                                            /*
                                             * If the parent has
                                             * children and doesn't
                                             * have a useful URL,
                                             * prevent navigation.
                                             */

                                            if (
                                                children.length >
                                                    0 &&
                                                (!menu.url ||
                                                    menu.url ===
                                                        "#")
                                            ) {
                                                e.preventDefault();
                                            }

                                        }}
                                        className={({
                                            isActive,
                                        }) =>
                                            `
                                            decoration-2
                                            underline-offset-8
                                            whitespace-nowrap
                                            ${
                                                isActive
                                                    ? "underline"
                                                    : "hover:underline"
                                            }
                                            `
                                        }
                                    >

                                        {menu.title}

                                        {/* Dropdown indicator */}

                                        {children.length >
                                            0 && (

                                            <span
                                                className="
                                                    ml-2
                                                    text-xs
                                                "
                                            >
                                                ▼
                                            </span>

                                        )}

                                    </NavLink>


                                    {/* =================================================
                                        SUBMENU
                                    ================================================= */}

                                    {children.length >
                                        0 && (

                                        <div
                                            className="
                                                absolute
                                                top-full
                                                left-0
                                                hidden
                                                group-hover:flex
                                                flex-col
                                                bg-white
                                                text-black
                                                min-w-48
                                                shadow-lg
                                                rounded-b-md
                                                overflow-hidden
                                            "
                                        >

                                            {children.map(
                                                (child) => (

                                                    <NavLink
                                                        key={
                                                            child._id
                                                        }
                                                        to={
                                                            child.url ||
                                                            "#"
                                                        }
                                                        className={({
                                                            isActive,
                                                        }) =>
                                                            `
                                                            px-4
                                                            py-3
                                                            whitespace-nowrap
                                                            transition
                                                            ${
                                                                isActive
                                                                    ? "bg-gray-100 font-semibold"
                                                                    : "hover:bg-gray-100"
                                                            }
                                                            `
                                                        }
                                                    >

                                                        {
                                                            child.title
                                                        }

                                                    </NavLink>
                                                   

                                                )
                                            )}

                                        </div>

                                    )}
                                     {children.length > 0 &&
                                                     renderSubMenu(menu._id)}

                                </div>

                            );

                        }
                    )}

                </section>


                {/* =================================================
                    RIGHT ICONS
                ================================================= */}

                <section
                    className="
                        flex
                        items-center
                        text-white
                        gap-4
                        text-xl
                    "
                >


                    {/* =================================================
                        SEARCH
                    ================================================= */}

                    <button
                        type="button"
                        onClick={() =>
                            setShowSearch(
                                (prev) => !prev
                            )
                        }
                        className="
                            px-4
                            cursor-pointer
                        "
                    >

                        <FontAwesomeIcon
                            icon={
                                faMagnifyingGlass
                            }
                        />

                    </button>


                    {/* =================================================
                        HEART
                    ================================================= */}

                    <button
                        type="button"
                        className="
                            px-4
                            cursor-pointer
                        "
                    >

                        <FontAwesomeIcon
                            icon={faHeart}
                        />

                    </button>


                    {/* =================================================
                        CART
                    ================================================= */}

                    <Link
                        to="/cart"
                        className="
                            relative
                            px-4
                            cursor-pointer
                        "
                    >

                        <FontAwesomeIcon
                            icon={
                                faCartShopping
                            }
                        />


                        {/* CART BADGE */}

                        {cartCount > 0 && (

                            <span
                                className="
                                    absolute
                                    -top-2
                                    right-0
                                    bg-white
                                    text-black
                                    text-[10px]
                                    font-bold
                                    w-5
                                    h-5
                                    rounded-full
                                    flex
                                    items-center
                                    justify-center
                                "
                            >

                                {cartCount}

                            </span>

                        )}

                    </Link>

                </section>


                {/* =================================================
                    SEARCH BOX
                ================================================= */}

                {showSearch && (

                    <div
                        className="
                            absolute
                            top-24
                            right-10
                            w-96
                            bg-white
                            text-black
                            shadow-xl
                            rounded-b-lg
                            p-4
                        "
                    >

                        {/* SEARCH FORM */}

                        <form
                            onSubmit={
                                handleSearch
                            }
                            className="
                                flex
                                items-center
                                gap-2
                            "
                        >

                            <input
                                value={
                                    searchTerm
                                }
                                onChange={
                                    (e) =>
                                        setSearchTerm(
                                            e.target.value
                                        )
                                }
                                placeholder="Search products..."
                                type="text"
                                className="
                                    flex-1
                                    px-3
                                    py-2
                                    border
                                    border-gray-300
                                    rounded
                                    outline-none
                                    focus:border-black
                                "
                            />


                            <button onClick={() => setShowSearch}
                                type="submit"
                                className="
                                    bg-black
                                    text-white
                                    px-4
                                    py-2
                                    rounded
                                "
                            >

                                <FontAwesomeIcon
                                    icon={
                                        faMagnifyingGlass
                                    }
                                />

                            </button>

                        </form>


                        {/* SEARCH RESULTS */}

                        {products.length > 0 && (

                            <div
                                className="
                                    mt-3
                                    max-h-80
                                    overflow-y-auto
                                "
                            >

                                {products.map(
                                    (product) => (

                                        <Link
                                            key={
                                                product._id
                                            }
                                            to={`/product/${product._id}`}
                                            onClick={() =>
                                                setShowSearch(
                                                    false
                                                )
                                            }
                                            className="
                                                flex
                                                items-center
                                                gap-3
                                                p-2
                                                hover:bg-gray-100
                                                rounded
                                            "
                                        >

                                            <img
                                                src={
                                                    product.image
                                                }
                                                className="
                                                    w-12
                                                    h-12
                                                    object-cover
                                                    rounded
                                                "
                                                alt={
                                                    product.title
                                                }
                                            />


                                            <div>

                                                <p
                                                    className="
                                                        font-semibold
                                                        text-sm
                                                    "
                                                >
                                                    {
                                                        product.title
                                                    }
                                                </p>


                                                <p
                                                    className="
                                                        text-xs
                                                        text-gray-500
                                                    "
                                                >
                                                    Rs.{" "}
                                                    {
                                                        product.discountPrice ||
                                                        product.price
                                                    }
                                                </p>

                                            </div>

                                        </Link>

                                    )
                                )}

                            </div>

                        )}


                        {/* NO RESULTS */}

                        {searchTerm.trim() &&
                            products.length === 0 && (

                                <p
                                    className="
                                        text-sm
                                        text-gray-500
                                        mt-3
                                    "
                                >
                                    No products found.
                                </p>

                            )}

                    </div>

                )}

            </header>

        </>

    );
}

export default Navbar;