import React, { useState, useEffect } from 'react';
import {
  FaFileAlt,
  FaCheckCircle,
  FaTimesCircle,
  FaSpinner,
  FaSearch,
  FaFilter,
  FaEye,
  FaCheck,
  FaTimes,
  FaDownload,
  FaEnvelope,
  FaCalendar,
  FaUserGraduate
} from 'react-icons/fa';
import axios from 'axios';
import toast from 'react-hot-toast';

const API_URL = 'http://localhost:5000/api';

const AdminApplications = () => {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState('pending');
  const [searchTerm, setSearchTerm] = useState('');
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    total: 0
  });
  const [actionLoading, setActionLoading] = useState(false);
  const [notes, setNotes] = useState('');

  // Fetch applications
  const fetchApplications = async (page = 1) => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const params = {
        page,
        limit: 20,
        status: filter !== 'all' ? filter : undefined,
        search: searchTerm || undefined
      };
      
      const response = await axios.get(`${API_URL}/applications`, {
        params,
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        setApplications(response.data.data);
        setPagination({
          page: response.data.page,
          totalPages: response.data.totalPages,
          total: response.data.total
        });
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
      toast.error('Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications(1);
  }, [filter, searchTerm]);

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    fetchApplications(1);
  };

  // Open modal with application details
  const viewApplication = (app) => {
    setSelectedApp(app);
    setNotes('');
    setShowModal(true);
  };

  // Handle status update (approve/reject)
  const handleStatusUpdate = async (status) => {
    if (!selectedApp) return;
    
    setActionLoading(true);
    try {
      const token = localStorage.getItem('token');
      // FIX: Use _id instead of id
      const applicationId = selectedApp._id || selectedApp.id;
      
      if (!applicationId) {
        toast.error('Invalid application ID');
        return;
      }
      
      const response = await axios.put(
        `${API_URL}/applications/${applicationId}/status`,
        { status, notes },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        toast.success(`Application ${status} successfully`);
        
        // If approved and student was created, show credentials
        if (status === 'accepted' && response.data.studentNumber) {
          toast.custom(
            (t) => (
              <div className="bg-white rounded-lg shadow-lg p-4 max-w-md">
                <h3 className="font-bold text-green-600 mb-2">🎉 Application Approved!</h3>
                <p><strong>Student Number:</strong> {response.data.studentNumber}</p>
                <p><strong>Temporary Password:</strong> {response.data.tempPassword}</p>
                <p className="text-xs text-gray-500 mt-2">Credentials have been sent to the applicant's email.</p>
              </div>
            ),
            { duration: 10000 }
          );
        }

        setShowModal(false);
        fetchApplications(pagination.page);
      }
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error(error.response?.data?.error || 'Failed to update status');
    } finally {
      setActionLoading(false);
    }
  };

  // Status badge color
  const getStatusBadge = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      reviewed: 'bg-blue-100 text-blue-800',
      accepted: 'bg-green-100 text-green-800',
      rejected: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Manage Applications</h1>

      {/* Filters and Search */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center space-x-2">
          <FaFilter className="text-gray-500" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="input-field py-2"
          >
            <option value="pending">Pending</option>
            <option value="reviewed">Reviewed</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
            <option value="all">All</option>
          </select>
        </div>

        <form onSubmit={handleSearch} className="flex items-center">
          <input
            type="text"
            placeholder="Search by name, email, or app number"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field py-2 rounded-r-none w-64"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700"
          >
            <FaSearch />
          </button>
        </form>
      </div>

      {/* Applications Table */}
      {loading ? (
        <div className="text-center py-12">
          <FaSpinner className="animate-spin text-4xl text-blue-500 mx-auto mb-4" />
          <p className="text-gray-600">Loading applications...</p>
        </div>
      ) : applications.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <FaFileAlt className="text-4xl text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">No Applications Found</h3>
          <p className="text-gray-600">Try changing your filters or search term.</p>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Application #
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Full Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Course
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {applications.map((app) => (
                  <tr key={app._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap font-mono text-sm">
                      {app.application_number}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-medium">
                      {app.full_name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {app.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {app.intended_course}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(app.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 py-1 text-xs rounded-full ${getStatusBadge(app.status)}`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <button
                        onClick={() => viewApplication(app)}
                        className="text-blue-600 hover:text-blue-900 flex items-center"
                      >
                        <FaEye className="mr-1" /> Review
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-6">
            <div className="text-sm text-gray-700">
              Showing page {pagination.page} of {pagination.totalPages} (Total: {pagination.total} applications)
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => fetchApplications(pagination.page - 1)}
                disabled={pagination.page === 1}
                className="px-4 py-2 border rounded disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => fetchApplications(pagination.page + 1)}
                disabled={pagination.page === pagination.totalPages}
                className="px-4 py-2 border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}

      {/* Application Detail Modal */}
      {showModal && selectedApp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold">Application Details</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FaTimes size={24} />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Personal Info */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-bold mb-3 flex items-center">
                    <FaUserGraduate className="mr-2 text-blue-600" /> Personal Information
                  </h3>
                  <p><strong>Full Name:</strong> {selectedApp.full_name}</p>
                  <p><strong>Date of Birth:</strong> {selectedApp.date_of_birth}</p>
                  <p><strong>ID Number:</strong> {selectedApp.id_number || 'N/A'}</p>
                  <p><strong>Nationality:</strong> {selectedApp.nationality}</p>
                  <p><strong>Gender:</strong> {selectedApp.gender}</p>
                </div>

                {/* Contact Info */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-bold mb-3 flex items-center">
                    <FaEnvelope className="mr-2 text-green-600" /> Contact Information
                  </h3>
                  <p><strong>Email:</strong> {selectedApp.email}</p>
                  <p><strong>Phone:</strong> {selectedApp.phone}</p>
                  <p><strong>Address:</strong> {selectedApp.address || 'N/A'}</p>
                  <p><strong>Emergency Contact:</strong> {selectedApp.emergency_contact || 'N/A'}</p>
                </div>

                {/* Education */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-bold mb-3">Educational Background</h3>
                  <p><strong>Highest Qualification:</strong> {selectedApp.highest_qualification || 'N/A'}</p>
                  <p><strong>Institution:</strong> {selectedApp.institution || 'N/A'}</p>
                  <p><strong>Year Completed:</strong> {selectedApp.year_completed || 'N/A'}</p>
                  <p><strong>Results:</strong> {selectedApp.results || 'N/A'}</p>
                </div>

                {/* Program */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-bold mb-3">Program Information</h3>
                  <p><strong>Intended Course:</strong> {selectedApp.intended_course}</p>
                  <p><strong>Planned Year:</strong> {selectedApp.planned_year}</p>
                  <p><strong>Study Mode:</strong> {selectedApp.study_mode}</p>
                  <p><strong>Application Number:</strong> {selectedApp.application_number}</p>
                  <p><strong>Submitted:</strong> {new Date(selectedApp.created_at).toLocaleString()}</p>
                </div>

                {/* Documents (if any) */}
                {selectedApp.documents_path && (
                  <div className="md:col-span-2 bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-bold mb-3 flex items-center">
                      <FaDownload className="mr-2 text-purple-600" /> Documents
                    </h3>
                    <a href={selectedApp.documents_path} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                      View uploaded documents
                    </a>
                  </div>
                )}
              </div>

              {/* Notes */}
              <div className="mt-6">
                <label className="block text-gray-700 font-medium mb-2">Admin Notes</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="input-field"
                  rows="3"
                  placeholder="Add notes about this application (optional)"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-4 mt-6">
                <button
                  onClick={() => handleStatusUpdate('rejected')}
                  disabled={actionLoading || selectedApp.status === 'rejected'}
                  className="px-6 py-2 border-2 border-red-600 text-red-600 rounded-lg hover:bg-red-50 disabled:opacity-50 flex items-center"
                >
                  {actionLoading ? <FaSpinner className="animate-spin mr-2" /> : <FaTimes className="mr-2" />}
                  Reject
                </button>
                <button
                  onClick={() => handleStatusUpdate('accepted')}
                  disabled={actionLoading || selectedApp.status === 'accepted'}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 flex items-center"
                >
                  {actionLoading ? <FaSpinner className="animate-spin mr-2" /> : <FaCheck className="mr-2" />}
                  Approve
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminApplications;