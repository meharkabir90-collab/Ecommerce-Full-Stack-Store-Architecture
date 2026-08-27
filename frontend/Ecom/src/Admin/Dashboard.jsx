import { useEffect, useState } from "react";
import { getDashboard } from "../Services/dashboardService";
import CountryMap from "./ecommerce/CountryMap";
import DemographicCard from "./ecommerce/DemographicCard";
import EcommerceMetric from "./ecommerce/EcommerceMetrics";
import MonthlySalesChart from "./ecommerce/MonthlySalesChart";
import MonthlyTarget from "./ecommerce/MonthlyTarget";
import RecentOrders from "./ecommerce/RecentOrders";
import StatisticsChart from "./ecommerce/StatisticsChart"

function Dashboard() {
  const [dashboard, setDashboard] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await getDashboard();

        console.log("Dashboard data:", data);

        setDashboard(data.dashboard);
      } catch (error) {
        console.error("Failed to load dashboard:", error);
      } finally {
        setTimeout(() => {
          setLoading(false);

        }, 500)
        
      }
    };

    fetchDashboard();
  }, []);

  if (loading) {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-[#dab37a] rounded-full animate-spin"></div>
    </div>
  );
}

  return (
    <div className="min-w-0 w-full overflow-hidden p-8">

      {/* Dashboard heading */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-stone-900">
          Admin Dashboard
        </h1>

        <p className="mt-2 text-gray-500">
          Overview of Singhania Industries
        </p>
      </div>

      {/* Ecommerce dashboard from downloaded template */}
      <div className="space-y-6">

        
          <EcommerceMetric
             totalProducts={dashboard.totalProducts}
            totalUsers={dashboard.totalUsers}
          />
        
        

        <MonthlyTarget />

        <div className="grid min-w-0 grid-cols-1 xl:grid-cols-2 gap-6">
          <MonthlySalesChart />
          <StatisticsChart />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <RecentOrders />
          <DemographicCard />
        </div>

        <CountryMap />

      </div>

    </div>
  );
}

export default Dashboard;