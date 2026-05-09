import { usePatientAppointments } from '@/features/appointments/usePatientAppointments';
import Spinner from './Spinner';
import { useMemo } from 'react';
import StatCard from './StatCard';
import { Brain, CalendarClock, CheckCircle, CreditCard } from 'lucide-react';
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
} from 'recharts';

const PIE_COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#8b5cf6', '#ec4899', '#f43f5e'];

export default function PatientDashboard() {
  const { isFetchingUserAppointments, userAppointments } = usePatientAppointments();

  const { completed, totalSpent, upcomingCount, AISummariesCount, serviceNames, serviceExpensesDates } = useMemo(() => {
    if (!userAppointments)
      return {
        completed: 0,
        totalSpent: 0,
        upcomingCount: 0,
        AISummariesCount: 0,
        serviceNames: [],
        serviceExpensesDates: [],
      };

    const aggregatedData = userAppointments?.reduce(
      (acc, appt) => {
        if (appt.status === 'completed') acc.completed += 1;
        if (appt.status === 'confirmed') acc.upcomingCount += 1;

        if (appt.isPaid) acc.totalSpent += appt.servicePrice;
        acc.serviceExpensesDate[appt.appointmentDate] =
          (acc.serviceExpensesDate[appt.appointmentDate] || 0) + appt.servicePrice;

        if (appt.aiSummary !== null) acc.AISummariesCount += 1;

        acc.serviceNames[appt.serviceName] = (acc.serviceNames[appt.serviceName] || 0) + 1;

        return acc;
      },
      {
        completed: 0,
        totalSpent: 0,
        upcomingCount: 0,
        AISummariesCount: 0,
        serviceNames: {} as Record<string, number>,
        serviceExpensesDate: {} as Record<string, number>,
      },
    );

    const formattedServiceNames = Object.entries(aggregatedData.serviceNames).map(([name, count]) => ({ name, count }));
    const formattedServiceExpensesDates = Object.entries(aggregatedData.serviceExpensesDate)
      .map(([date, price]) => ({
        date,
        price,
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return {
      completed: aggregatedData.completed,
      totalSpent: aggregatedData.totalSpent,
      upcomingCount: aggregatedData.upcomingCount,
      AISummariesCount: aggregatedData.AISummariesCount,
      serviceNames: formattedServiceNames,
      serviceExpensesDates: formattedServiceExpensesDates,
    };
  }, [userAppointments]);

  if (isFetchingUserAppointments) return <Spinner fullScreen />;
  if (!userAppointments?.length) return <div className="p-8 text-center text-stone-500">No appointments found.</div>;

  const STAT_CARDS_DATA = [
    {
      title: 'Total Visits',
      value: completed,
      icon: <CheckCircle className="h-6 w-6 text-emerald-600" />,
    },
    {
      title: 'Total Spent',
      value: `$${totalSpent}`,
      icon: <CreditCard className="h-6 w-6 text-emerald-600" />,
    },
    {
      title: 'Upcoming',
      value: upcomingCount,
      icon: <CalendarClock className="h-6 w-6 text-emerald-600" />,
    },
    {
      title: 'AI Summaries',
      value: AISummariesCount,
      icon: <Brain className="h-6 w-6 text-emerald-600" />,
    },
  ];

  console.log(serviceExpensesDates);

  return (
    <div className="flex flex-col gap-4 p-6">
      <h1 className="text-3xl font-bold text-stone-800">Overview</h1>

      <div className="grid grid-cols-4 gap-4">
        {STAT_CARDS_DATA.map((stat) => (
          <StatCard title={stat.title} value={stat.value} icon={stat.icon} />
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-[10px] border border-stone-200 bg-white p-4">
          <h2 className="mb-6 border-b border-stone-200 pb-4 text-lg font-bold text-stone-800">Services attendance</h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={serviceNames}
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="count"
                  nameKey="name"
                >
                  {serviceNames.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <RechartsTooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-[10px] border border-stone-200 bg-white p-4">
          <h2 className="mb-6 border-b border-stone-200 pb-4 text-lg font-bold text-stone-800">Expenses by dates</h2>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={serviceExpensesDates}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis dataKey="date" tick={{ fill: '#4b5563', fontSize: 12 }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fill: '#4b5563', fontSize: 12 }} tickLine={false} axisLine={false} />
                <RechartsTooltip cursor={{ fill: '#f1f5f9' }} formatter={(value) => `$${value}`} />
                <Bar dataKey="price" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
