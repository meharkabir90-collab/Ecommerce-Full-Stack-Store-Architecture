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

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const data = await getDashboard();

        console.log("Dashboard data:", data);

        setDashboard(data.dashboard);
      } catch (error) {
        console.error("Failed to load dashboard:", error);
      }
    };

    fetchDashboard();
  }, []);

  if (!dashboard) {
    return (
      <div className="p-8">
        <p>Loading...</p>
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