import { useMemo } from 'react';
import { useDoctorAppointments } from '@/features/appointments/useDoctorAppointments';
import Spinner from '@/components/custom/Spinner';
import StatCard from './StatCard';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
} from 'recharts';
import { Activity, CheckCircle, DollarSign, Users } from 'lucide-react';

const STATUS_COLORS = {
  completed: '#10b981',
  cancelled: '#ef4444',
  confirmed: '#f59e0b',
  unconfirmed: '#94a3b8',
};

export default function DoctorDashboard() {
  const { doctorAppointments, isFetchingDoctorAppointments } = useDoctorAppointments();

  const { statusData, servicesData, dateData, totalRevenue, completedCount } = useMemo(() => {
    if (!doctorAppointments)
      return { statusData: [], servicesData: [], dateData: [], totalRevenue: 0, completedCount: 0 };

    const aggregatedData = doctorAppointments.reduce(
      (acc, appt) => {
        if (appt.isPaid) acc.revenue += appt.servicePrice || 0;

        if (appt.status === 'completed') acc.completed += 1;
        acc.statusCounts[appt.status] = (acc.statusCounts[appt.status] || 0) + 1;

        const serviceName = appt.serviceName || 'Unknown';
        acc.serviceCounts[serviceName] = (acc.serviceCounts[serviceName] || 0) + 1;

        acc.dateCounts[appt.appointmentDate] = (acc.dateCounts[appt.appointmentDate] || 0) + 1;

        return acc;
      },
      {
        revenue: 0,
        completed: 0,
        statusCounts: {} as Record<string, number>,
        serviceCounts: {} as Record<string, number>,
        dateCounts: {} as Record<string, number>,
      },
    );

    const formattedStatusData = Object.entries(aggregatedData.statusCounts).map(([name, value]) => ({ name, value }));
    const formattedServicesData = Object.entries(aggregatedData.serviceCounts).map(([name, value]) => ({
      name,
      value,
    }));
    const formattedDateData = Object.entries(aggregatedData.dateCounts)
      .map(([date, count]) => ({
        date,
        count,
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    console.log(formattedDateData);

    return {
      statusData: formattedStatusData,
      servicesData: formattedServicesData,
      dateData: formattedDateData,
      totalRevenue: aggregatedData.revenue,
      completedCount: aggregatedData.completed,
    };
  }, [doctorAppointments]);

  if (isFetchingDoctorAppointments) return <Spinner fullScreen />;
  if (!doctorAppointments?.length) return <div className="p-8 text-center text-stone-500">No appointments found.</div>;

  return (
    <div className="flex flex-col gap-4 p-6">
      <h1 className="text-3xl font-bold text-stone-800">Overview</h1>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Appointments"
          value={doctorAppointments.length}
          icon={<Users className="h-6 w-6 text-emerald-600" />}
        />
        <StatCard
          title="Completed"
          value={completedCount}
          icon={<CheckCircle className="h-6 w-6 text-emerald-600" />}
        />
        <StatCard
          title="Total Revenue"
          value={`$${totalRevenue}`}
          icon={<DollarSign className="h-6 w-6 text-emerald-600" />}
        />
        <StatCard
          title="Success Rate"
          value={`${Math.round((completedCount / doctorAppointments.length) * 100) || 0}%`}
          icon={<Activity className="h-6 w-6 text-emerald-600" />}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="rounded-[10px] border border-stone-200 bg-white p-4">
          <h2 className="mb-6 border-b border-stone-200 pb-4 text-lg font-bold text-stone-800">
            Appointments by Status
          </h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={statusData} innerRadius={60} outerRadius={100} paddingAngle={5} dataKey="value">
                  {statusData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={STATUS_COLORS[entry.name as keyof typeof STATUS_COLORS] || '#cbd5e1'}
                    />
                  ))}
                </Pie>
                <RechartsTooltip />
                <Legend className="capitalize" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-[10px] border border-stone-200 bg-white p-4">
          <h2 className="mb-6 border-b border-stone-200 pb-4 text-lg font-bold text-stone-800">
            Most Popular Services
          </h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={servicesData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="name" tick={{ fill: '#4b5563', fontSize: 12 }} tickLine={false} axisLine={false} />
                <YAxis
                  allowDecimals={false}
                  tick={{ fill: '#4b5563', fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                />
                <RechartsTooltip cursor={{ fill: '#f1f5f9' }} />
                <Bar dataKey="value" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="col-span-1 rounded-[10px] border border-stone-200 bg-white p-4 lg:col-span-2 lg:p-6">
          <h2 className="mb-6 border-b border-stone-100 pb-4 text-lg font-bold text-stone-800">
            Appointments Over Time
          </h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={dateData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="date" tick={{ fill: '#4b5563', fontSize: 12 }} tickLine={false} axisLine={false} />
                <YAxis
                  allowDecimals={false}
                  tick={{ fill: '#4b5563', fontSize: 12 }}
                  tickLine={false}
                  axisLine={false}
                />
                <RechartsTooltip cursor={{ stroke: '#cbd5e1', strokeWidth: 1, strokeDasharray: '3 3' }} />\{' '}
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#10b981"
                  strokeWidth={3}
                  activeDot={{ r: 8, fill: '#047857', stroke: '#fff', strokeWidth: 2 }}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
