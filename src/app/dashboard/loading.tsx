export default function DashboardLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <div>
          <div className="h-7 w-48 bg-slate-200 rounded-xl mb-2" />
          <div className="h-4 w-64 bg-slate-100 rounded-lg" />
        </div>
        <div className="h-9 w-32 bg-slate-200 rounded-xl" />
      </div>

      {/* Stats cards skeleton */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-white rounded-2xl border border-slate-100 p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 bg-slate-100 rounded-xl" />
              <div className="w-12 h-5 bg-slate-100 rounded-full" />
            </div>
            <div className="h-7 w-20 bg-slate-200 rounded-lg mb-1" />
            <div className="h-4 w-32 bg-slate-100 rounded-lg" />
          </div>
        ))}
      </div>

      {/* Content skeleton */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-100 p-6">
          <div className="h-5 w-40 bg-slate-200 rounded-lg mb-4" />
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl">
                <div className="flex-1 h-4 bg-slate-200 rounded-lg" />
                <div className="w-16 h-5 bg-slate-100 rounded-full" />
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-100 p-6">
            <div className="h-5 w-32 bg-slate-200 rounded-lg mb-4" />
            <div className="space-y-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-16 bg-slate-50 rounded-xl" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
