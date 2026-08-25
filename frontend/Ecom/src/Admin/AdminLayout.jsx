import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import AdminSidebar from "./AppSidebar";
import { SidebarProvider } from './Context/SidebarContext'

function AdminLayout() {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <SidebarProvider>
         <div className="min-h-screen">
            <AdminSidebar />         
           <main className="lg:ml-[290px]">
            <Outlet />
           </main>
          </div>
    </SidebarProvider>
  );
}

export default AdminLayout;