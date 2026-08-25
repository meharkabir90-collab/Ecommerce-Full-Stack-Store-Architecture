import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { User, Mail, Shield, ShoppingBag, LogOut } from "lucide-react";

function MyProfile() {

  const navigate = useNavigate();

  const [user] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (

    <div className="min-h-screen bg-stone-50 p-8 mt-24">

      <div className="max-w-3xl mx-auto">

        {/* HEADER */}

        <div className="mb-6">

          <p className="text-xs font-semibold tracking-widest text-indigo-600 uppercase mb-1">
            Account
          </p>

          <h1 className="text-3xl font-bold text-stone-900">
            My Profile
          </h1>

          <p className="text-sm text-stone-500 mt-1">
            Manage your account information
          </p>

        </div>


        {/* PROFILE CARD */}

        <div className="bg-white border border-stone-200 rounded-xl shadow-sm overflow-hidden">

          {/* PROFILE HEADER */}

          <div className="bg-stone-900 px-6 py-7 text-white">

            <div className="flex items-center gap-4">

              {/* AVATAR */}

              <div className="w-16 h-16 rounded-full bg-white text-stone-900 flex items-center justify-center text-2xl font-bold">

                {user?.name?.charAt(0).toUpperCase()}

              </div>


              <div>

                <h2 className="text-xl font-semibold">
                  {user?.name}
                </h2>

                <p className="text-sm text-stone-300">
                  @{user?.username}
                </p>

              </div>

            </div>

          </div>


          {/* PROFILE INFORMATION */}

          <div className="p-6">

            <h3 className="text-lg font-semibold text-stone-900 mb-5">
              Personal Information
            </h3>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">


              {/* NAME */}

              <div className="border border-stone-200 rounded-lg p-4">

                <div className="flex items-center gap-3 mb-2">

                  <User size={18} className="text-indigo-600" />

                  <p className="text-sm text-stone-500">
                    Full Name
                  </p>

                </div>

                <p className="font-medium text-stone-900">
                  {user?.name}
                </p>

              </div>


              {/* USERNAME */}

              <div className="border border-stone-200 rounded-lg p-4">

                <div className="flex items-center gap-3 mb-2">

                  <User size={18} className="text-indigo-600" />

                  <p className="text-sm text-stone-500">
                    Username
                  </p>

                </div>

                <p className="font-medium text-stone-900">
                  @{user?.username}
                </p>

              </div>


              {/* EMAIL */}

              <div className="border border-stone-200 rounded-lg p-4">

                <div className="flex items-center gap-3 mb-2">

                  <Mail size={18} className="text-indigo-600" />

                  <p className="text-sm text-stone-500">
                    Email Address
                  </p>

                </div>

                <p className="font-medium text-stone-900 break-all">
                  {user?.email}
                </p>

              </div>


              {/* ACCOUNT TYPE */}

              <div className="border border-stone-200 rounded-lg p-4">

                <div className="flex items-center gap-3 mb-2">

                  <Shield size={18} className="text-indigo-600" />

                  <p className="text-sm text-stone-500">
                    Account Type
                  </p>

                </div>

                <p className="font-medium text-stone-900 capitalize">
                  {user?.role}
                </p>

              </div>

            </div>


            {/* USER ID */}

            <div className="mt-5 border border-stone-200 rounded-lg p-4">

              <p className="text-sm text-stone-500 mb-1">
                Account ID
              </p>

              <p className="text-xs text-stone-600 break-all">
                {user?._id}
              </p>

            </div>


            {/* ACTIONS */}

            <div className="border-t border-stone-200 mt-6 pt-6">

              <h3 className="text-lg font-semibold text-stone-900 mb-4">
                Account Actions
              </h3>


              <div className="flex flex-col sm:flex-row gap-3">


                {/* MY ORDERS */}

                <NavLink
                  to="/my-orders"
                  className="flex items-center justify-center gap-2 px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition"
                >

                  <ShoppingBag size={18} />

                  My Orders

                </NavLink>


                {/* LOGOUT */}

                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-2 px-5 py-3 border border-red-200 text-red-600 hover:bg-red-50 rounded-lg font-medium transition"
                >

                  <LogOut size={18} />

                  Logout

                </button>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>

  );
}

export default MyProfile;