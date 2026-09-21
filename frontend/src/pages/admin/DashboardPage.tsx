import {
  Activity,
  ArrowUpRight,
  FileText,
  Layers3,
  Users,
} from "lucide-react";

import { useAppSelector } from "@/app/store/hooks";

export function DashboardPage() {
  const user = useAppSelector(
    (state) => state.auth.user,
  );

  const today = new Intl.DateTimeFormat(
    "en-US",
    {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    },
  ).format(new Date());

  return (
    <div className="space-y-8">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-sm font-medium text-emerald-800">
            Administration
          </p>

          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-stone-900">
            Dashboard
          </h1>

          <p className="mt-2 text-sm text-stone-500">
            Welcome back, {user?.firstName}. Here's
            what's happening with your system today.
          </p>
        </div>

        <p className="text-sm text-stone-500">
          {today}
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <SummaryCard
          title="Total Applications"
          value="120"
          description="Applications received"
          icon={<FileText size={21} />}
        />

        <SummaryCard
          title="Total Programs"
          value="8"
          description="Academic programs"
          icon={<Layers3 size={21} />}
        />

        <SummaryCard
          title="Total Users"
          value="150"
          description="Registered users"
          icon={<Users size={21} />}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-stone-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-stone-900">
                Application Status
              </h2>

              <p className="mt-1 text-sm text-stone-500">
                Current application distribution
              </p>
            </div>

            <Activity
              size={20}
              className="text-emerald-800"
            />
          </div>

          <div className="mt-8 space-y-5">
            <StatusRow
              label="Pending"
              value={30}
              total={120}
            />

            <StatusRow
              label="Under Review"
              value={25}
              total={120}
            />

            <StatusRow
              label="Approved"
              value={45}
              total={120}
            />

            <StatusRow
              label="Rejected"
              value={20}
              total={120}
            />
          </div>
        </section>

        <section className="rounded-2xl border border-stone-200 bg-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-stone-900">
                Recent Activity
              </h2>

              <p className="mt-1 text-sm text-stone-500">
                Latest system activity
              </p>
            </div>

            <ArrowUpRight
              size={20}
              className="text-emerald-800"
            />
          </div>

          <div className="mt-8 flex min-h-48 items-center justify-center rounded-xl border border-dashed border-stone-200 bg-stone-50">
            <p className="text-sm text-stone-400">
              Dashboard analytics will appear here.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

interface SummaryCardProps {
  title: string;
  value: string;
  description: string;
  icon: React.ReactNode;
}

function SummaryCard({
  title,
  value,
  description,
  icon,
}: SummaryCardProps) {
  return (
    <section className="rounded-2xl border border-stone-200 bg-white p-6">
      <div className="flex items-start justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-800">
          {icon}
        </div>

        <ArrowUpRight
          size={18}
          className="text-stone-400"
        />
      </div>

      <p className="mt-6 text-sm text-stone-500">
        {title}
      </p>

      <p className="mt-1 text-3xl font-semibold text-stone-900">
        {value}
      </p>

      <p className="mt-1 text-xs text-stone-400">
        {description}
      </p>
    </section>
  );
}

interface StatusRowProps {
  label: string;
  value: number;
  total: number;
}

function StatusRow({
  label,
  value,
  total,
}: StatusRowProps) {
  const percentage =
    Math.round((value / total) * 100);

  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="text-stone-600">
          {label}
        </span>

        <span className="font-medium text-stone-900">
          {value}
        </span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-stone-100">
        <div
          className="h-full rounded-full bg-emerald-700"
          style={{
            width: `${percentage}%`,
          }}
        />
      </div>
    </div>
  );
}