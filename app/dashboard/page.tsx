'use client'

import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabase'

type Lead = {
  id: string
  created_at: string
  full_name: string | null
  email: string | null
  phone: string | null
  event_type: string | null
  event_date: string | null
  servings: string | null
  theme_style: string | null
  budget: string | null
  venue_city: string | null
  inspiration_link: string | null
  notes: string | null
  lead_status: string | null
  ai_category: string | null
  ai_priority: string | null
  ai_draft_reply: string | null
  ai_followup_draft: string | null
  ai_price_guidance: string | null
  ai_quote_notes: string | null
  policy_decision: string | null
  policy_rush_fee: string | null
  policy_notice_notes: string | null
  initial_responder: string | null
  followup_responder: string | null
  initial_sent: boolean | null
  followup_sent: boolean | null
  initial_sent_at: string | null
  followup_sent_at: string | null
  internal_notes: string | null
}

const STATUS_OPTIONS = ['new', 'contacted', 'quoting', 'booked', 'lost']

export default function Dashboard() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterPriority, setFilterPriority] = useState('all')

  useEffect(() => {
    fetchLeads()
  }, [])

  async function fetchLeads() {
    setLoading(true)

    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Supabase error:', error)
    } else {
      setLeads(data || [])
    }

    setLoading(false)
  }

  const filteredLeads = leads.filter((lead) => {
    const statusMatch =
      filterStatus === 'all' || lead.lead_status === filterStatus
    const priorityMatch =
      filterPriority === 'all' || lead.ai_priority === filterPriority
    return statusMatch && priorityMatch
  })

  const countByStatus = (status: string) =>
    leads.filter((lead) => lead.lead_status === status).length

  return (
    <main className="min-h-screen bg-neutral-950 text-white p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold">Lead Dashboard</h1>
            <p className="mt-2 text-sm text-neutral-400">
              Manage inquiries, track statuses, and review lead activity.
            </p>
          </div>

          <button
            onClick={fetchLeads}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-white transition hover:bg-white hover:text-black"
          >
            Refresh
          </button>
        </div>

        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {STATUS_OPTIONS.map((status) => (
            <div
              key={status}
              className="rounded-2xl border border-white/10 bg-white/5 p-5"
            >
              <p className="text-sm capitalize text-neutral-400">{status}</p>
              <p className="mt-3 text-3xl font-semibold">{countByStatus(status)}</p>
            </div>
          ))}
        </div>

        <div className="mb-6 flex flex-col gap-4 sm:flex-row">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none"
          >
            <option value="all">All Statuses</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="quoting">Quoting</option>
            <option value="booked">Booked</option>
            <option value="lost">Lost</option>
          </select>

          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none"
          >
            <option value="all">All Priorities</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm text-neutral-400">Lead List</p>

            <div className="mt-4 space-y-3">
              {loading ? (
                <div className="rounded-xl border border-dashed border-white/10 p-8 text-center text-neutral-500">
                  Loading leads...
                </div>
              ) : filteredLeads.length === 0 ? (
                <div className="rounded-xl border border-dashed border-white/10 p-8 text-center text-neutral-500">
                  No leads yet
                </div>
              ) : (
                filteredLeads.map((lead) => (
                  <button
                    key={lead.id}
                    onClick={() => setSelectedLead(lead)}
                    className={`w-full rounded-xl border p-4 text-left transition ${
                      selectedLead?.id === lead.id
                        ? 'border-white bg-white/10'
                        : 'border-white/10 bg-black/20 hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="font-medium">
                          {lead.full_name || 'Unnamed Lead'}
                        </p>
                        <p className="mt-1 text-sm text-neutral-400">
                          {lead.event_type || 'No event type'}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-sm capitalize text-white/90">
                          {lead.lead_status || 'new'}
                        </p>
                        <p className="mt-1 text-xs text-neutral-500">
                          {lead.ai_priority || 'No priority'}
                        </p>
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <p className="text-sm text-neutral-400">Lead Details</p>

            {!selectedLead ? (
              <div className="mt-4 rounded-xl border border-dashed border-white/10 p-8 text-center text-neutral-500">
                Select a lead to view details
              </div>
            ) : (
              <div className="mt-4 space-y-4">
                <div>
                  <h2 className="text-2xl font-semibold">
                    {selectedLead.full_name}
                  </h2>
                  <p className="mt-1 text-sm text-neutral-400">
                    {selectedLead.event_type}
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                    <p className="text-xs text-neutral-400">Email</p>
                    <p className="mt-1 text-sm">{selectedLead.email || '—'}</p>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                    <p className="text-xs text-neutral-400">Phone</p>
                    <p className="mt-1 text-sm">{selectedLead.phone || '—'}</p>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                    <p className="text-xs text-neutral-400">Event Date</p>
                    <p className="mt-1 text-sm">
                      {selectedLead.event_date || '—'}
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                    <p className="text-xs text-neutral-400">Servings</p>
                    <p className="mt-1 text-sm">
                      {selectedLead.servings || '—'}
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                    <p className="text-xs text-neutral-400">Budget</p>
                    <p className="mt-1 text-sm">{selectedLead.budget || '—'}</p>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                    <p className="text-xs text-neutral-400">Venue City</p>
                    <p className="mt-1 text-sm">
                      {selectedLead.venue_city || '—'}
                    </p>
                  </div>
                </div>

                <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                  <p className="text-xs text-neutral-400">Notes</p>
                  <p className="mt-2 text-sm leading-6">
                    {selectedLead.notes || '—'}
                  </p>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                    <p className="text-xs text-neutral-400">AI Category</p>
                    <p className="mt-1 text-sm">
                      {selectedLead.ai_category || '—'}
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                    <p className="text-xs text-neutral-400">AI Priority</p>
                    <p className="mt-1 text-sm">
                      {selectedLead.ai_priority || '—'}
                    </p>
                  </div>
                </div>

                <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                  <p className="text-xs text-neutral-400">AI Draft Reply</p>
                  <p className="mt-2 text-sm leading-6">
                    {selectedLead.ai_draft_reply || '—'}
                  </p>
                </div>

                <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                  <p className="text-xs text-neutral-400">AI Follow-up Draft</p>
                  <p className="mt-2 text-sm leading-6">
                    {selectedLead.ai_followup_draft || '—'}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}