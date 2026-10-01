import React, { useState, useEffect } from 'react';
import {
  Users,
  Search,
  Filter,
  CheckCircle,
  Clock,
  Briefcase,
  ChevronRight,
  X,
  FileText,
  Calendar,
  Phone,
  Mail,
  Building,
  Sparkles,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { leadService } from '../../services/leadService';
import { LeadRecord, LeadStatus } from '../../types';

export const MiniCrm: React.FC = () => {
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [metrics, setMetrics] = useState(leadService.getMetrics());
  const [viewMode, setViewMode] = useState<'pipeline' | 'table'>('pipeline');
  const [selectedLead, setSelectedLead] = useState<LeadRecord | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [notesInput, setNotesInput] = useState('');

  const PIPELINE_STAGES: LeadStatus[] = [
    'New',
    'Contacted',
    'Qualified',
    'Meeting Booked',
    'Proposal',
    'Won',
    'Lost',
  ];

  const refreshData = () => {
    const data = leadService.getLeads();
    setLeads(data);
    setMetrics(leadService.getMetrics());
  };

  useEffect(() => {
    refreshData();
  }, []);

  const handleStatusChange = (leadId: string, nextStatus: LeadStatus) => {
    leadService.updateLeadStatus(leadId, nextStatus);
    refreshData();
    if (selectedLead && selectedLead.lead_id === leadId) {
      setSelectedLead({ ...selectedLead, lead_status: nextStatus });
    }
  };

  const handleSaveNotes = () => {
    if (!selectedLead) return;
    leadService.updateLeadNotes(selectedLead.lead_id, notesInput);
    refreshData();
    setSelectedLead({ ...selectedLead, notes: notesInput });
  };

  const handleOpenDetail = (lead: LeadRecord) => {
    setSelectedLead(lead);
    setNotesInput(lead.notes || '');
  };

  // Filtered Leads
  const filteredLeads = leads.filter((l) => {
    const matchesSearch =
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (l.business_problem && l.business_problem.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesStatus = statusFilter === 'all' || l.lead_status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="text-xs font-mono text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-1">
            Internal Operations Portal · Confidential
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Systems Pipeline & Lead Management
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Engineered for 2–3 internal stakeholders to manage technical conversations and assessment leads.
          </p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
          <button
            onClick={() => setViewMode('pipeline')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
              viewMode === 'pipeline'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Pipeline Board
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
              viewMode === 'table'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Lead Table ({leads.length})
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="text-[11px] font-mono text-slate-400 uppercase">Total Leads</div>
          <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white mt-1">
            {metrics.total}
          </div>
        </div>

        <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="text-[11px] font-mono text-blue-500 uppercase">New</div>
          <div className="text-2xl font-bold font-mono text-blue-600 dark:text-blue-400 mt-1">
            {metrics.newLeads}
          </div>
        </div>

        <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="text-[11px] font-mono text-indigo-500 uppercase">Qualified</div>
          <div className="text-2xl font-bold font-mono text-indigo-600 dark:text-indigo-400 mt-1">
            {metrics.qualified}
          </div>
        </div>

        <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="text-[11px] font-mono text-cyan-500 uppercase">Meetings</div>
          <div className="text-2xl font-bold font-mono text-cyan-600 dark:text-cyan-400 mt-1">
            {metrics.meetings}
          </div>
        </div>

        <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="text-[11px] font-mono text-violet-500 uppercase">Proposals</div>
          <div className="text-2xl font-bold font-mono text-violet-600 dark:text-violet-400 mt-1">
            {metrics.proposals}
          </div>
        </div>

        <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="text-[11px] font-mono text-emerald-500 uppercase">Won</div>
          <div className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400 mt-1">
            {metrics.won}
          </div>
        </div>

        <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <div className="text-[11px] font-mono text-slate-400 uppercase">Lost</div>
          <div className="text-2xl font-bold font-mono text-slate-500 mt-1">
            {metrics.lost}
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search leads by name, company, email or requirements..."
            className="w-full pl-9 pr-3.5 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-800 dark:text-slate-200 focus:outline-none cursor-pointer"
          >
            <option value="all">All Stages</option>
            {PIPELINE_STAGES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* MAIN VIEW: Pipeline (Kanban) or Table */}
      {viewMode === 'pipeline' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-7 gap-4 overflow-x-auto pb-6">
          {PIPELINE_STAGES.map((stage) => {
            const stageLeads = filteredLeads.filter((l) => l.lead_status === stage);

            return (
              <div
                key={stage}
                className="bg-slate-50/80 dark:bg-slate-900/60 rounded-2xl p-3 border border-slate-200/60 dark:border-slate-800/80 min-w-[210px] space-y-3"
              >
                <div className="flex items-center justify-between pb-2 border-b border-slate-200/60 dark:border-slate-800">
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    {stage}
                  </span>
                  <span className="text-[10px] font-mono bg-white dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-500">
                    {stageLeads.length}
                  </span>
                </div>

                <div className="space-y-2">
                  {stageLeads.map((lead) => (
                    <div
                      key={lead.lead_id}
                      onClick={() => handleOpenDetail(lead)}
                      className="p-3 bg-white dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800 rounded-xl hover:border-blue-500/60 hover:shadow-md transition-all cursor-pointer space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-xs text-slate-900 dark:text-white truncate">
                          {lead.name}
                        </span>
                        {lead.assessment_score && (
                          <span className="text-[10px] font-mono text-blue-600 dark:text-blue-400 font-bold">
                            {lead.assessment_score}%
                          </span>
                        )}
                      </div>

                      <div className="text-[11px] text-slate-600 dark:text-slate-400 font-medium truncate">
                        {lead.company}
                      </div>

                      <div className="text-[10px] font-mono text-slate-400 truncate">
                        Source: {lead.lead_source}
                      </div>
                    </div>
                  ))}

                  {stageLeads.length === 0 && (
                    <div className="py-6 text-center text-[11px] text-slate-400 font-mono">
                      No records
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* TABLE VIEW */
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 text-[11px] font-mono uppercase text-slate-500">
                <tr>
                  <th className="px-4 py-3">Lead Contact</th>
                  <th className="px-4 py-3">Company & Role</th>
                  <th className="px-4 py-3">Interest / Need</th>
                  <th className="px-4 py-3">Source</th>
                  <th className="px-4 py-3">Stage</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                {filteredLeads.map((lead) => (
                  <tr
                    key={lead.lead_id}
                    onClick={() => handleOpenDetail(lead)}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/50 cursor-pointer transition-colors"
                  >
                    <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">
                      <div>{lead.name}</div>
                      <div className="text-[11px] text-slate-400 font-mono">{lead.email}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div>{lead.company}</div>
                      <div className="text-[11px] text-slate-400">{lead.job_title || 'Unspecified'}</div>
                    </td>
                    <td className="px-4 py-3 max-w-xs truncate">
                      <span className="font-semibold text-blue-600 dark:text-blue-400">{lead.interest}</span>
                      <p className="text-[11px] text-slate-500 truncate">{lead.business_problem}</p>
                    </td>
                    <td className="px-4 py-3 font-mono text-[11px] text-slate-500">
                      {lead.lead_source}
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[11px] font-medium text-slate-700 dark:text-slate-300">
                        {lead.lead_status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenDetail(lead);
                        }}
                        className="text-blue-600 hover:underline font-mono text-xs cursor-pointer"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* LEAD DETAIL DRAWER / MODAL */}
      {selectedLead && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex justify-end animate-in fade-in duration-200"
          onClick={() => setSelectedLead(null)}
        >
          <div
            className="w-full max-w-md bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 h-full overflow-y-auto p-6 space-y-6 shadow-2xl animate-in slide-in-from-right duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase">
                  LEAD RECORD · {selectedLead.lead_id}
                </span>
                <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
                  {selectedLead.name}
                </h2>
                <div className="text-xs text-slate-500 font-mono">
                  Created {new Date(selectedLead.created_at).toLocaleDateString()}
                </div>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Pipeline Stage Select */}
            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase text-slate-400">
                Pipeline Stage:
              </label>
              <select
                value={selectedLead.lead_status}
                onChange={(e) => handleStatusChange(selectedLead.lead_id, e.target.value as LeadStatus)}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white font-medium cursor-pointer"
              >
                {PIPELINE_STAGES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* Contact Details */}
            <div className="space-y-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 text-xs">
              <div className="flex items-center gap-2">
                <Building className="w-4 h-4 text-slate-400" />
                <span className="font-semibold">{selectedLead.company}</span>
                {selectedLead.job_title && (
                  <span className="text-slate-500">({selectedLead.job_title})</span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-slate-400" />
                <a href={`mailto:${selectedLead.email}`} className="text-blue-600 hover:underline">
                  {selectedLead.email}
                </a>
              </div>
              {selectedLead.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-slate-400" />
                  <span>{selectedLead.phone}</span>
                </div>
              )}
            </div>

            {/* Requirements & Business Problem */}
            <div className="space-y-1.5">
              <div className="text-xs font-mono uppercase text-slate-400">
                Interest & Business Problem:
              </div>
              <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                <span className="font-semibold text-blue-600 dark:text-blue-400 block mb-1">
                  {selectedLead.interest}
                </span>
                {selectedLead.business_problem}
              </div>
            </div>

            {/* Assessment Score if captured */}
            {selectedLead.assessment_score && (
              <div className="p-4 rounded-xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono text-blue-800 dark:text-blue-300 font-semibold">
                    Assessment Benchmark Score
                  </span>
                  <span className="font-mono font-bold text-blue-600 dark:text-blue-400 text-sm">
                    {selectedLead.assessment_score} / 100
                  </span>
                </div>
              </div>
            )}

            {/* Internal Notes */}
            <div className="space-y-2">
              <div className="text-xs font-mono uppercase text-slate-400">Internal Engineering Notes</div>
              <textarea
                rows={4}
                value={notesInput}
                onChange={(e) => setNotesInput(e.target.value)}
                placeholder="Log call notes, technical evaluation items, or deployment constraints..."
                className="w-full p-3 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-blue-500 resize-none"
              />
              <button
                onClick={handleSaveNotes}
                className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-semibold rounded-xl hover:bg-blue-600 dark:hover:bg-blue-500 cursor-pointer"
              >
                Save Notes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
