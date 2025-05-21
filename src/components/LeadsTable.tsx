
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChevronDown, ChevronUp } from 'lucide-react';

type Lead = {
  id: number;
  name: string;
  submitted: string;
  status: 'Pending' | 'Reached Out';
  country: string;
};

const mockLeads: Lead[] = [
  { id: 1, name: 'Jorge Ruiz', submitted: '02/02/2024, 2:45 PM', status: 'Pending', country: 'Mexico' },
  { id: 2, name: 'Bahar Zamir', submitted: '02/02/2024, 2:45 PM', status: 'Pending', country: 'Mexico' },
  { id: 3, name: 'Mary Lopez', submitted: '02/02/2024, 2:45 PM', status: 'Pending', country: 'Brazil' },
  { id: 4, name: 'Li Zijin', submitted: '02/02/2024, 2:45 PM', status: 'Pending', country: 'South Korea' },
  { id: 5, name: 'Mark Antonov', submitted: '02/02/2024, 2:45 PM', status: 'Pending', country: 'Russia' },
  { id: 6, name: 'Jane Ma', submitted: '02/02/2024, 2:45 PM', status: 'Pending', country: 'Mexico' },
  { id: 7, name: 'Anand Jain', submitted: '02/02/2024, 2:45 PM', status: 'Reached Out', country: 'Mexico' },
  { id: 8, name: 'Anna Voronova', submitted: '02/02/2024, 2:45 PM', status: 'Pending', country: 'France' },
];

const LeadsTable: React.FC = () => {
  const [leads, setLeads] = useState<Lead[]>(mockLeads);
  const [sortField, setSortField] = useState<keyof Lead | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>('');

  const leadsPerPage = 5;

  // Update lead status
  const updateStatus = (id: number) => {
    setLeads(leads.map(lead =>
      lead.id === id ? { ...lead, status: 'Reached Out' as const } : lead
    ));
  };

  // Handle sorting
  const handleSort = (field: keyof Lead) => {
    const isAsc = sortField === field && sortDirection === 'asc';
    setSortDirection(isAsc ? 'desc' : 'asc');
    setSortField(field);

    const sortedLeads = [...leads].sort((a, b) => {
      if (a[field] < b[field]) return isAsc ? 1 : -1;
      if (a[field] > b[field]) return isAsc ? -1 : 1;
      return 0;
    });

    setLeads(sortedLeads);
  };

  // Filter leads based on search and status
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.country.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === '' || lead.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Pagination
  const indexOfLastLead = currentPage * leadsPerPage;
  const indexOfFirstLead = indexOfLastLead - leadsPerPage;
  const currentLeads = filteredLeads.slice(indexOfFirstLead, indexOfLastLead);
  const totalPages = Math.ceil(filteredLeads.length / leadsPerPage);

  const SortIcon = ({ field }: { field: keyof Lead }) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />;
  };

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className='w-full max-w-xs'>
          <Input
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-xs rounded-lg"
          />
        </div>
        <div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="p-2 border rounded-lg w-full sm:w-auto"
          >
            <option value="">Status</option>
            <option value="Pending">Pending</option>
            <option value="Reached Out">Reached Out</option>
          </select>
        </div>
      </div>

      {/* Table for larger screens */}
      <div className="hidden md:block border rounded-3xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th
                className="px-6 py-3 cursor-pointer text-gray-400 font-medium"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center">
                  Name <SortIcon field="name" />
                </div>
              </th>
              <th
                className="px-6 py-3 cursor-pointer text-gray-400 font-medium"
                onClick={() => handleSort('submitted')}
              >
                <div className="flex items-center">
                  Submitted <SortIcon field="submitted" />
                </div>
              </th>
              <th
                className="px-6 py-3 cursor-pointer text-gray-400 font-medium"
                onClick={() => handleSort('status')}
              >
                <div className="flex items-center">
                  Status <SortIcon field="status" />
                </div>
              </th>
              <th
                className="px-6 py-3 cursor-pointer text-gray-400 font-medium"
                onClick={() => handleSort('country')}
              >
                <div className="flex items-center">
                  Country <SortIcon field="country" />
                </div>
              </th>
              <th className="px-6 py-3 text-gray-400 font-medium">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {currentLeads.map((lead) => (
              <tr key={lead.id} className="border-t hover:bg-gray-50">
                <td className="px-6 py-3">{lead.name}</td>
                <td className="px-6 py-3">{lead.submitted}</td>
                <td className="px-6 py-3">
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${lead.status === 'Reached Out'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                    }`}>
                    {lead.status}
                  </span>
                </td>
                <td className="px-6 py-3">{lead.country}</td>
                <td className="px-6 py-3">
                  {lead.status === 'Pending' && (
                    <Button
                      onClick={() => updateStatus(lead.id)}
                      variant="outline"
                      size="sm"
                    >
                      Mark as Reached
                    </Button>
                  )}
                </td>
              </tr>
            ))}
            <tr className="border-t hover:bg-gray-50">
              <td className="px-6 py-3" colSpan={5}>
                <div className="flex justify-end items-center space-x-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 rounded border flex items-center justify-center text-sm ${currentPage === page
                        ? 'bg-gray-900 text-white'
                        : 'bg-white hover:bg-gray-100 text-gray-700'
                        }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Card view for mobile */}
      <div className="md:hidden space-y-4">
        {currentLeads.map((lead) => (
          <div key={lead.id} className="border rounded-md p-4 bg-white">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium">{lead.name}</h3>
              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${lead.status === 'Reached Out'
                ? 'bg-green-100 text-green-800'
                : 'bg-yellow-100 text-yellow-800'
                }`}>
                {lead.status}
              </span>
            </div>
            <div className="text-sm text-gray-500 mb-1">
              Submitted: {lead.submitted}
            </div>
            <div className="text-sm text-gray-500 mb-3">
              Country: {lead.country}
            </div>
            {lead.status === 'Pending' && (
              <Button
                onClick={() => updateStatus(lead.id)}
                variant="outline"
                size="sm"
                className="w-full"
              >
                Mark as Reached
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeadsTable;
