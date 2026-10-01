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
    deal_value: 125000,
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
    deal_value: 240000,
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
    deal_value: 85000,
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
    deal_value: 160000,
    owner: 'Unassigned',
    notes: 'Captured via homepage conversational assistant.',
    last_contact: '2026-09-30T18:20:00Z',
  },
  {
    lead_id: 'lead-849106',
    created_at: '2026-09-27T10:15:00Z',
    name: 'Jonathan Miller',
    email: 'j.miller@bio-pharma-analytics.internal',
    company: 'BioPharma Synthesis Corp',
    job_title: 'Chief Technology Officer',
    lead_source: 'Consultation',
    landing_page: '/solutions/ai-as-a-service',
    interest: 'AI as a Service',
    business_problem: 'Enterprise clinical discovery RAG pipeline with high-fidelity citation tracing and patent search integration.',
    lead_status: 'Proposal',
    deal_value: 195000,
    owner: 'Platform Solutions Team',
    notes: 'Master services agreement and SLA framework under review by legal counsel.',
    last_contact: '2026-09-30T09:00:00Z',
  },
  {
    lead_id: 'lead-849107',
    created_at: '2026-09-25T16:00:00Z',
    name: 'Beatrice Holloway',
    email: 'b.holloway@aerospace-dynamics.internal',
    company: 'Titan Aerospace Systems',
    job_title: 'Head of Autonomous Systems',
    lead_source: 'Direct',
    landing_page: '/solutions/ai-agents',
    interest: 'AI Agents',
    business_problem: 'Autonomous telemetry diagnostics agents and maintenance schedule synthesizer for commercial airline fleet.',
    lead_status: 'Won',
    deal_value: 310000,
    owner: 'Executive Advisory',
    notes: 'Contract executed. Implementation kick-off scheduled for Q4.',
    last_contact: '2026-09-29T11:00:00Z',
  },
  {
    lead_id: 'lead-849108',
    created_at: '2026-09-26T14:20:00Z',
    name: 'Carlos Mendez',
    email: 'c.mendez@solaris-retail.internal',
    company: 'Solaris Omnichannel Retail',
    job_title: 'VP of Digital Experience',
    lead_source: 'Contact Form',
    landing_page: '/solutions/saas',
    interest: 'SaaS Products',
    business_problem: 'Real-time personalized inventory recommendation engine and customer interaction voice agents.',
    lead_status: 'Proposal',
    deal_value: 90000,
    owner: 'Commercial Enterprise Team',
    notes: 'Submitted commercial proposal with tier 1 support add-on.',
    last_contact: '2026-09-30T13:30:00Z',
  },
  {
    lead_id: 'lead-849109',
    created_at: '2026-09-24T11:00:00Z',
    name: 'Karen Wu',
    email: 'k.wu@vanguard-compliance.internal',
    company: 'Vanguard Regulatory Advisors',
    job_title: 'Managing Director',
    lead_source: 'AI Readiness Assessment',
    landing_page: '/resources/ai-readiness-assessment',
    interest: 'Consulting',
    business_problem: 'AI Governance readiness audit and regulatory compliance architecture for financial risk workflows.',
    assessment_score: 91,
    lead_status: 'Won',
    deal_value: 75000,
    owner: 'Advisory Practice',
    notes: '12-week strategic governance engagement signed.',
    last_contact: '2026-09-28T16:00:00Z',
  },
  {
    lead_id: 'lead-849110',
    created_at: '2026-09-22T08:30:00Z',
    name: 'Alex Dupont',
    email: 'a.dupont@legacy-brokerage.internal',
    company: 'Legacy Securities Group',
    job_title: 'Operations Manager',
    lead_source: 'Organic Search',
    landing_page: '/',
    interest: 'SaaS Products',
    business_problem: 'Legacy system migration inquiry without allocated budget for FY26.',
    lead_status: 'Lost',
    deal_value: 60000,
    owner: 'Outreach',
    notes: 'Budget deferred to next fiscal cycle. Kept in quarterly newsletter nurture cadence.',
    last_contact: '2026-09-27T10:00:00Z',
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
      const parsed: LeadRecord[] = JSON.parse(stored);
      let hasMigration = false;
      const migrated = parsed.map((item, idx) => {
        if (!item.deal_value) {
          hasMigration = true;
          const seedMatch = SEED_LEADS.find((s) => s.lead_id === item.lead_id);
          return {
            ...item,
            deal_value: seedMatch?.deal_value || 85000 + ((idx * 25000) % 150000),
          };
        }
        return item;
      });
      if (hasMigration) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(migrated));
        return migrated;
      }
      return parsed;
    } catch {
      return SEED_LEADS;
    }
  },

  saveLead(leadInput: Omit<LeadRecord, 'lead_id' | 'created_at' | 'lead_status'> & Partial<LeadRecord>): LeadRecord {
    const leads = this.getLeads();
    const defaultValues: Record<string, number> = {
      'AI as a Service': 150000,
      'AI Agents': 120000,
      'Custom AI Development': 180000,
      'SaaS Products': 85000,
      'Consulting': 95000,
    };
    const estimatedValue = leadInput.deal_value || defaultValues[leadInput.interest || ''] || 100000;

    const newRecord: LeadRecord = {
      lead_id: `lead-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`,
      created_at: new Date().toISOString(),
      lead_status: 'New',
      owner: 'Unassigned',
      deal_value: estimatedValue,
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

  updateLeadDealValue(lead_id: string, dealValue: number): boolean {
    const leads = this.getLeads();
    const index = leads.findIndex((l) => l.lead_id === lead_id);
    if (index === -1) return false;

    leads[index].deal_value = dealValue;
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

    const valueByStage: Record<LeadStatus, number> = {
      New: 0,
      Contacted: 0,
      Qualified: 0,
      'Meeting Booked': 0,
      Proposal: 0,
      Won: 0,
      Lost: 0,
    };

    let totalPipelineValue = 0;
    let wonValue = 0;

    leads.forEach((l) => {
      const val = l.deal_value || 0;
      if (byStatus[l.lead_status] !== undefined) {
        byStatus[l.lead_status]++;
        valueByStage[l.lead_status] += val;
      }
      if (l.lead_status !== 'Lost') {
        totalPipelineValue += val;
      }
      if (l.lead_status === 'Won') {
        wonValue += val;
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
      totalPipelineValue,
      wonValue,
      valueByStage,
      byStatus,
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
