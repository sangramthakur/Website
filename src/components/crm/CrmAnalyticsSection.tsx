import React from 'react';
import {
  ResponsiveContainer,
  FunnelChart,
  Funnel,
  LabelList,
  Tooltip as RechartsTooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell,
} from 'recharts';
import { TrendingUp, DollarSign, Layers, CheckCircle2, ArrowDownRight, Target } from 'lucide-react';
import { LeadRecord, LeadStatus } from '../../types';

interface CrmAnalyticsSectionProps {
  leads: LeadRecord[];
  metrics: {
    total: number;
    newLeads: number;
    contacted: number;
    qualified: number;
    meetings: number;
    proposals: number;
    won: number;
    lost: number;
    totalPipelineValue?: number;
    wonValue?: number;
    valueByStage?: Record<LeadStatus, number>;
    byStatus?: Record<LeadStatus, number>;
  };
}

const STAGE_COLORS: Record<string, string> = {
  New: '#3b82f6', // blue-500
  Contacted: '#6366f1', // indigo-500
  Qualified: '#06b6d4', // cyan-500
  'Meeting Booked': '#8b5cf6', // violet-500
  Proposal: '#f59e0b', // amber-500
  Won: '#10b981', // emerald-500
  Lost: '#64748b', // slate-500
};

export const CrmAnalyticsSection: React.FC<CrmAnalyticsSectionProps> = ({
  leads,
  metrics,
}) => {
  // Ordered linear funnel stages from acquisition to closed-won
  const FUNNEL_STAGES: LeadStatus[] = [
    'New',
    'Contacted',
    'Qualified',
    'Meeting Booked',
    'Proposal',
    'Won',
  ];

  const ALL_STAGES: LeadStatus[] = [
    'New',
    'Contacted',
    'Qualified',
    'Meeting Booked',
    'Proposal',
    'Won',
    'Lost',
  ];

  // Calculate metrics
  const totalValue =
    metrics.totalPipelineValue ??
    leads
      .filter((l) => l.lead_status !== 'Lost')
      .reduce((acc, curr) => acc + (curr.deal_value || 0), 0);

  const wonValue =
    metrics.wonValue ??
    leads
      .filter((l) => l.lead_status === 'Won')
      .reduce((acc, curr) => acc + (curr.deal_value || 0), 0);

  const inFlightValue = leads
    .filter((l) => ['Qualified', 'Meeting Booked', 'Proposal'].includes(l.lead_status))
    .reduce((acc, curr) => acc + (curr.deal_value || 0), 0);

  const nonLostLeads = leads.filter((l) => l.lead_status !== 'Lost');
  const avgDealSize = nonLostLeads.length > 0 ? Math.round(totalValue / nonLostLeads.length) : 0;
  const winRate = metrics.total > 0 ? ((metrics.won / metrics.total) * 100).toFixed(1) : '0';

  // Funnel chart data (Stages progression)
  const funnelData = FUNNEL_STAGES.map((stage) => {
    const stageLeads = leads.filter((l) => l.lead_status === stage);
    const count = stageLeads.length;
    const value = stageLeads.reduce((acc, curr) => acc + (curr.deal_value || 0), 0);

    return {
      name: stage,
      value: count,
      count,
      dealValue: value,
      fill: STAGE_COLORS[stage],
    };
  });

  // Deal Value per Stage data (Bar chart)
  const stageValueData = ALL_STAGES.map((stage) => {
    const stageLeads = leads.filter((l) => l.lead_status === stage);
    const count = stageLeads.length;
    const value = stageLeads.reduce((acc, curr) => acc + (curr.deal_value || 0), 0);

    return {
      stage,
      dealValue: value,
      displayValue: Math.round(value / 1000),
      count,
      fill: STAGE_COLORS[stage],
    };
  });

  // Custom tooltips
  const CustomFunnelTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900/95 dark:bg-slate-950/95 border border-slate-700/80 text-white p-3 rounded-xl shadow-xl text-xs backdrop-blur-md space-y-1.5 min-w-[170px]">
          <div className="flex items-center justify-between border-b border-slate-800 pb-1">
            <span className="font-bold text-slate-200">{data.name}</span>
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: data.fill }} />
          </div>
          <div className="flex items-center justify-between text-slate-300">
            <span>Leads at Stage:</span>
            <span className="font-mono font-bold text-white">{data.count}</span>
          </div>
          <div className="flex items-center justify-between text-slate-300">
            <span>Total Stage Value:</span>
            <span className="font-mono font-bold text-emerald-400">
              ${(data.dealValue || 0).toLocaleString()}
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  const CustomBarTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-slate-900/95 dark:bg-slate-950/95 border border-slate-700/80 text-white p-3 rounded-xl shadow-xl text-xs backdrop-blur-md space-y-1.5 min-w-[180px]">
          <div className="flex items-center justify-between border-b border-slate-800 pb-1">
            <span className="font-bold text-slate-200">{data.stage}</span>
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: data.fill }} />
          </div>
          <div className="flex items-center justify-between text-slate-300">
            <span>Total Deal Value:</span>
            <span className="font-mono font-bold text-emerald-400">
              ${(data.dealValue || 0).toLocaleString()}
            </span>
          </div>
          <div className="flex items-center justify-between text-slate-300">
            <span>Lead Volume:</span>
            <span className="font-mono font-bold text-white">{data.count} leads</span>
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Top Value KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 uppercase">
            <span>Total Pipeline Value</span>
            <DollarSign className="w-3.5 h-3.5 text-blue-500" />
          </div>
          <div className="text-xl sm:text-2xl font-bold font-mono text-slate-900 dark:text-white">
            ${totalValue.toLocaleString()}
          </div>
          <div className="text-[10px] text-slate-400 font-mono">
            Excludes lost opportunities
          </div>
        </div>

        <div className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-[11px] font-mono text-emerald-600 dark:text-emerald-400 uppercase">
            <span>Closed Won Revenue</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
          </div>
          <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
            ${wonValue.toLocaleString()}
          </div>
          <div className="text-[10px] text-slate-400 font-mono">
            {metrics.won} contracted enterprise deals
          </div>
        </div>

        <div className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-[11px] font-mono text-violet-500 uppercase">
            <span>In-Flight Negotiations</span>
            <TrendingUp className="w-3.5 h-3.5 text-violet-500" />
          </div>
          <div className="text-xl sm:text-2xl font-bold font-mono text-violet-600 dark:text-violet-400">
            ${inFlightValue.toLocaleString()}
          </div>
          <div className="text-[10px] text-slate-400 font-mono">
            Qualified + Meetings + Proposals
          </div>
        </div>

        <div className="p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-[11px] font-mono text-cyan-500 uppercase">
            <span>Avg. Deal Size · Win Rate</span>
            <Target className="w-3.5 h-3.5 text-cyan-500" />
          </div>
          <div className="text-xl sm:text-2xl font-bold font-mono text-slate-900 dark:text-white">
            ${avgDealSize.toLocaleString()}
          </div>
          <div className="text-[10px] text-slate-400 font-mono">
            {winRate}% conversion rate
          </div>
        </div>
      </div>

      {/* Main Charts Grid: Funnel Chart & Deal Value per Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Lead Stage Funnel Visualization */}
        <div className="lg:col-span-6 p-5 sm:p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <div className="text-xs font-mono text-blue-600 dark:text-blue-400 uppercase tracking-wider font-semibold">
                Conversion Pipeline
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Lead Stages Funnel
              </h3>
            </div>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 self-start sm:self-auto font-medium">
              {funnelData.reduce((acc, c) => acc + c.count, 0)} Active Leads
            </span>
          </div>

          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <FunnelChart>
                <RechartsTooltip content={<CustomFunnelTooltip />} />
                <Funnel
                  dataKey="value"
                  data={funnelData}
                  isAnimationActive
                >
                  <LabelList
                    position="right"
                    fill="#64748b"
                    stroke="none"
                    dataKey="name"
                    className="text-[11px] font-mono fill-slate-700 dark:fill-slate-300 font-medium"
                  />
                  <LabelList
                    position="center"
                    fill="#ffffff"
                    stroke="none"
                    dataKey="count"
                    className="text-xs font-mono font-bold"
                  />
                </Funnel>
              </FunnelChart>
            </ResponsiveContainer>
          </div>

          {/* Stage Conversion Legend */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px]">
            {funnelData.map((item) => (
              <div key={item.name} className="flex items-center gap-1.5 min-w-0">
                <span className="w-2.5 h-2.5 rounded-sm shrink-0" style={{ backgroundColor: item.fill }} />
                <span className="text-slate-600 dark:text-slate-400 truncate">{item.name}:</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white shrink-0">
                  {item.count}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Total Deal Value per Stage */}
        <div className="lg:col-span-6 p-5 sm:p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <div className="text-xs font-mono text-emerald-600 dark:text-emerald-400 uppercase tracking-wider font-semibold">
                Monetary Distribution
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Total Deal Value per Stage ($)
              </h3>
            </div>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 self-start sm:self-auto font-medium">
              ${(totalValue / 1000).toFixed(0)}k Pipeline
            </span>
          </div>

          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={stageValueData}
                margin={{ top: 15, right: 15, left: -10, bottom: 25 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} vertical={false} />
                <XAxis
                  dataKey="stage"
                  interval={0}
                  angle={-25}
                  textAnchor="end"
                  tick={{ fontSize: 10, fill: '#94a3b8' }}
                  height={45}
                />
                <YAxis
                  tickFormatter={(val) => `$${val}k`}
                  tick={{ fontSize: 10, fill: '#94a3b8' }}
                />
                <RechartsTooltip content={<CustomBarTooltip />} />
                <Bar dataKey="displayValue" radius={[6, 6, 0, 0]}>
                  {stageValueData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Stage Value Footnote */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>Values aggregated in real-time</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-medium">
              Top Stage: {stageValueData.slice().sort((a, b) => b.dealValue - a.dealValue)[0]?.stage} ($
              {Math.round(
                (stageValueData.slice().sort((a, b) => b.dealValue - a.dealValue)[0]?.dealValue || 0) /
                  1000
              )}
              k)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
