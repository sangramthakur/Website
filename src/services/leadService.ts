import { LeadRecord, LeadStatus, LeadSource } from '../types';

const STORAGE_KEY = 'apex_enterprise_ai_leads';

const SEED_LEADS: LeadRecord[] = [
  {
    lead_id: 'lead-849102',
    created_at: '2026-09-28T14:32:00Z',
    name: 'Elena Rostova',
    email: 'e.rostova@global-logistics-corp.internal',
    phone: '+1 415 555 0192',
    company: 'Global Freight & Intermodal Systems',
    job_title: 'VP of Engineering Systems',
    lead_source: 'Consultation',
    landing_page: '/solutions/ai-agents',
    interest: 'AI Agents',
    business_problem: 'Automating multi-carrier customs documentation reconciliation and exceptions routing across 14 international ports.',
    assessment_score: 72,
    assessment_categories: { Strategy: 80, Data: 65, Technology: 75, Processes: 70, People: 60, Governance: 80 },
    lead_status: 'Meeting Booked',
    owner: 'Platform Solutions Team',
    notes: 'Needs architecture deep-dive on agent deterministic execution loops and SAP ERP integration boundaries.',
    last_contact: '2026-09-29T10:00:00Z',
  },
  {
    lead_id: 'lead-849103',
    created_at: '2026-09-29T09:15:00Z',
    name: 'David Chen',
    email: 'david.chen@fintech-clearinghouse.internal',
    company: 'Apex Clearing Solutions',
    job_title: 'Head of Infrastructure',
    lead_source: 'Demo',
    landing_page: '/solutions/ai-as-a-service',
    interest: 'AI as a Service',
    business_problem: 'High-throughput low-latency inference gateway with semantic caching to reduce model token expenditure by 40%.',
    assessment_score: 84,
    assessment_categories: { Strategy: 90, Data: 85, Technology: 90, Processes: 80, People: 75, Governance: 85 },
    lead_status: 'Qualified',
    owner: 'Distributed Systems Group',
    notes: 'Interested in private VPC deployment on Google Cloud with strict p95 sub-350ms SLA.',
    last_contact: '2026-09-29T15:30:00Z',
  },
  {
    lead_id: 'lead-849104',
    created_at: '2026-09-30T11:45:00Z',
    name: 'Marcus Vance',
    email: 'm.vance@precision-telematics.internal',
    phone: '+1 212 555 0831',
    company: 'Precision Telematics Network',
    job_title: 'Chief Information Officer',
    lead_source: 'AI Readiness Assessment',
    landing_page: '/resources/ai-readiness-assessment',
    interest: 'SaaS Products',
    business_problem: 'Predictive failure anticipation for industrial sensor fleets and autonomous dispatching of field technicians.',
    assessment_score: 58,
    assessment_categories: { Strategy: 60, Data: 50, Technology: 65, Processes: 55, People: 50, Governance: 70 },
    lead_status: 'Contacted',
    owner: 'Applied Solutions Team',
    notes: 'Completed full AI Readiness Assessment. Identified data fragmentation as key bottleneck.',
    last_contact: '2026-09-30T14:00:00Z',
  },
  {
    lead_id: 'lead-849105',
    created_at: '2026-09-30T18:20:00Z',
    name: 'Sarah Lindqvist',
    email: 'sarah.l@nordic-energetics.internal',
    company: 'Nordic Clean Energy Grid',
    job_title: 'Director of AI Architecture',
    lead_source: 'Chatbot',
    landing_page: '/',
    interest: 'Custom AI Development',
    business_problem: 'Real-time grid load balancing simulation and multi-agent coordination during volatile renewable generation swings.',
    lead_status: 'New',
    owner: 'Unassigned',
    notes: 'Captured via homepage conversational assistant.',
    last_contact: '2026-09-30T18:20:00Z',
  },
];

export const leadService = {
  getLeads(): LeadRecord[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_LEADS));
        return SEED_LEADS;
      }
      return JSON.parse(stored);
    } catch {
      return SEED_LEADS;
    }
  },

  saveLead(leadInput: Omit<LeadRecord, 'lead_id' | 'created_at' | 'lead_status'> & Partial<LeadRecord>): LeadRecord {
    const leads = this.getLeads();
    const newRecord: LeadRecord = {
      lead_id: `lead-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`,
      created_at: new Date().toISOString(),
      lead_status: 'New',
      owner: 'Unassigned',
      ...leadInput,
    };

    leads.unshift(newRecord);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
    } catch (e) {
      console.error('Failed to persist lead to local storage', e);
    }

    // Google Sheets Backup Abstraction Hook (Server-side architecture ready)
    this.backupToGoogleSheetHook(newRecord);

    return newRecord;
  },

  updateLeadStatus(lead_id: string, newStatus: LeadStatus): boolean {
    const leads = this.getLeads();
    const index = leads.findIndex((l) => l.lead_id === lead_id);
    if (index === -1) return false;

    leads[index].lead_status = newStatus;
    leads[index].last_contact = new Date().toISOString();
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
    } catch (e) {
      console.error(e);
    }
    return true;
  },

  updateLeadNotes(lead_id: string, notes: string): boolean {
    const leads = this.getLeads();
    const index = leads.findIndex((l) => l.lead_id === lead_id);
    if (index === -1) return false;

    leads[index].notes = notes;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));
    } catch (e) {
      console.error(e);
    }
    return true;
  },

  getMetrics() {
    const leads = this.getLeads();
    const total = leads.length;
    const byStatus: Record<LeadStatus, number> = {
      New: 0,
      Contacted: 0,
      Qualified: 0,
      'Meeting Booked': 0,
      Proposal: 0,
      Won: 0,
      Lost: 0,
    };

    leads.forEach((l) => {
      if (byStatus[l.lead_status] !== undefined) {
        byStatus[l.lead_status]++;
      }
    });

    return {
      total,
      newLeads: byStatus['New'],
      contacted: byStatus['Contacted'],
      qualified: byStatus['Qualified'],
      meetings: byStatus['Meeting Booked'],
      proposals: byStatus['Proposal'],
      won: byStatus['Won'],
      lost: byStatus['Lost'],
    };
  },

  /**
   * Server-side ready Google Sheets backup pipeline abstraction.
   * In a live deployment, this forwards to a secure proxy endpoint (/api/integrations/google-sheets)
   * or a Cloud Function with service account credentials, keeping keys off the browser.
   */
  async backupToGoogleSheetHook(record: LeadRecord): Promise<void> {
    // Architectural hook: logs payload format for enterprise auditing
    if (typeof window !== 'undefined' && (window as any).__AI_STUDIO_DEBUG__) {
      console.info('[Google Sheet Backup Hook Triggered]', {
        timestamp: record.created_at,
        leadId: record.lead_id,
        email: record.email,
        company: record.company,
      });
    }
  },
};
