"use client";
import { useState } from "react";
import { formatDate, getStatusColor, cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckSquare, Clock, AlertCircle, CheckCircle, Filter } from "lucide-react";

const STATUS_COLS = [
  { status: "TODO", label: "To Do", icon: Clock, color: "bg-slate-100" },
  { status: "IN_PROGRESS", label: "In Progress", icon: AlertCircle, color: "bg-blue-50" },
  { status: "COMPLETED", label: "Completed", icon: CheckCircle, color: "bg-green-50" },
];

const PRIORITY_COLORS: Record<string, string> = {
  LOW: "bg-slate-100 text-slate-600",
  MEDIUM: "bg-yellow-100 text-yellow-700",
  HIGH: "bg-orange-100 text-orange-700",
  URGENT: "bg-red-100 text-red-700",
};

export function TasksBoard({ tasks, isAdmin }: { tasks: any[]; isAdmin: boolean }) {
  const [view, setView] = useState<"kanban" | "list">("list");

  const getByStatus = (status: string) => tasks.filter((t) => t.status === status);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900">Tasks</h1>
          <p className="text-slate-500">Track all assigned tasks and their progress</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex gap-1 bg-slate-100 p-1 rounded-xl">
            {(["list", "kanban"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors capitalize",
                  view === v ? "bg-white shadow-sm text-slate-900" : "text-slate-500"
                )}
              >
                {v}
              </button>
            ))}
          </div>
          {isAdmin && <Button variant="primary" size="sm">+ New Task</Button>}
        </div>
      </div>

      {view === "kanban" ? (
        <div className="grid grid-cols-3 gap-4">
          {STATUS_COLS.map(({ status, label, icon: Icon, color }) => {
            const colTasks = getByStatus(status);
            return (
              <div key={status} className={`${color} rounded-2xl p-4`}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Icon className="h-4 w-4 text-slate-500" />
                    <span className="font-semibold text-slate-700 text-sm">{label}</span>
                  </div>
                  <span className="bg-white text-slate-600 text-xs font-bold px-2 py-0.5 rounded-full">
                    {colTasks.length}
                  </span>
                </div>
                <div className="space-y-3">
                  {colTasks.map((task) => (
                    <div key={task.id} className="bg-white rounded-xl p-4 shadow-sm hover:shadow-card transition-shadow">
                      <p className="font-semibold text-slate-900 text-sm mb-1">{task.title}</p>
                      {task.description && (
                        <p className="text-xs text-slate-500 line-clamp-2 mb-2">{task.description}</p>
                      )}
                      <div className="flex items-center justify-between">
                        <span className={cn("status-badge text-xs", PRIORITY_COLORS[task.priority] ?? PRIORITY_COLORS.MEDIUM)}>
                          {task.priority}
                        </span>
                        {task.dueDate && (
                          <span className="text-xs text-slate-400">{formatDate(task.dueDate)}</span>
                        )}
                      </div>
                    </div>
                  ))}
                  {colTasks.length === 0 && (
                    <p className="text-xs text-slate-400 text-center py-4">No tasks</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <table className="w-full data-table">
              <thead>
                <tr>
                  <th>Task</th>
                  {isAdmin && <th>Client</th>}
                  <th>Priority</th>
                  <th>Due Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {tasks.length === 0 ? (
                  <tr>
                    <td colSpan={isAdmin ? 6 : 5} className="text-center py-12 text-slate-400">
                      <CheckSquare className="h-8 w-8 mx-auto mb-2" />
                      No tasks found
                    </td>
                  </tr>
                ) : (
                  tasks.map((task) => (
                    <tr key={task.id}>
                      <td>
                        <p className="font-semibold text-slate-900">{task.title}</p>
                        {task.description && (
                          <p className="text-xs text-slate-400 line-clamp-1">{task.description}</p>
                        )}
                      </td>
                      {isAdmin && <td className="text-sm">{task.client?.companyName ?? "—"}</td>}
                      <td>
                        <span className={cn("status-badge", PRIORITY_COLORS[task.priority] ?? PRIORITY_COLORS.MEDIUM)}>
                          {task.priority}
                        </span>
                      </td>
                      <td className="text-sm text-slate-500">
                        {task.dueDate ? formatDate(task.dueDate) : "—"}
                      </td>
                      <td>
                        <span className={cn("status-badge", getStatusColor(task.status))}>
                          {task.status.replace("_", " ")}
                        </span>
                      </td>
                      <td>
                        <Button variant="ghost" size="sm" className="text-xs text-[#2563EB]">
                          View
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
