import React from 'react';
import { 
  Eye, 
  EyeOff, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  User, 
  DollarSign,
  Building,
  CreditCard,
  Shield,
  TrendingUp,
  FileText,
  Users,
  ChevronDown,
  ChevronUp,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Star
} from 'lucide-react';

const LeadDataViewer = ({ leads, expandedCards, onToggleExpansion }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'New':
        return <Clock className="w-4 h-4 text-blue-400" />;
      case 'Contacted':
        return <Phone className="w-4 h-4 text-yellow-400" />;
      case 'Qualified':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'Converted':
        return <Star className="w-4 h-4 text-purple-400" />;
      case 'Rejected':
        return <XCircle className="w-4 h-4 text-red-400" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'New':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Contacted':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Qualified':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Converted':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'Rejected':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Low':
        return 'bg-gray-500/20 text-gray-400';
      case 'Medium':
        return 'bg-blue-500/20 text-blue-400';
      case 'High':
        return 'bg-orange-500/20 text-orange-400';
      case 'Urgent':
        return 'bg-red-500/20 text-red-400';
      default:
        return 'bg-gray-500/20 text-gray-400';
    }
  };

  const formatValue = (key, value) => {
    if (value === null || value === undefined) return 'N/A';
    
    // Format dates
    if (key.toLowerCase().includes('date') || key.toLowerCase().includes('at')) {
      return new Date(value).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
    
    // Format currency
    if (key.toLowerCase().includes('salary') || key.toLowerCase().includes('income') || key.toLowerCase().includes('amount')) {
      return `₹${Number(value).toLocaleString('en-IN')}`;
    }
    
    // Format phone numbers
    if (key.toLowerCase().includes('phone') || key.toLowerCase().includes('mobile')) {
      return String(value).replace(/(\d{5})(\d{5})/, '$1 $2');
    }
    
    return String(value);
  };

  const getFieldIcon = (key) => {
    const keyLower = key.toLowerCase();
    
    if (keyLower.includes('name') || keyLower.includes('fullname')) return <User className="w-4 h-4" />;
    if (keyLower.includes('email')) return <Mail className="w-4 h-4" />;
    if (keyLower.includes('phone') || keyLower.includes('mobile')) return <Phone className="w-4 h-4" />;
    if (keyLower.includes('address')) return <MapPin className="w-4 h-4" />;
    if (keyLower.includes('salary') || keyLower.includes('income') || keyLower.includes('amount')) return <DollarSign className="w-4 h-4" />;
    if (keyLower.includes('company') || keyLower.includes('organization')) return <Building className="w-4 h-4" />;
    if (keyLower.includes('card') || keyLower.includes('credit')) return <CreditCard className="w-4 h-4" />;
    if (keyLower.includes('insurance') || keyLower.includes('policy')) return <Shield className="w-4 h-4" />;
    if (keyLower.includes('fund') || keyLower.includes('investment')) return <TrendingUp className="w-4 h-4" />;
    if (keyLower.includes('loan') || keyLower.includes('eligibility')) return <FileText className="w-4 h-4" />;
    if (keyLower.includes('dsa') || keyLower.includes('partner')) return <Users className="w-4 h-4" />;
    if (keyLower.includes('date') || keyLower.includes('created') || keyLower.includes('updated')) return <Calendar className="w-4 h-4" />;
    
    return <FileText className="w-4 h-4" />;
  };

  const getPrimaryFields = (lead) => {
    // Define primary fields based on lead type
    const primaryFields = ['name', 'fullName', 'email', 'mobileNumber', 'phone', 'mobileNo'];
    return primaryFields.filter(field => lead[field] !== undefined && lead[field] !== null);
  };

  const getSecondaryFields = (lead, primaryFields) => {
    return Object.keys(lead).filter(key => 
      !primaryFields.includes(key) && 
      !['_id', '__v', 'createdAt', 'updatedAt', 'ipAddress', 'userAgent', 'referrer'].includes(key)
    );
  };

  if (leads.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
          <FileText className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-medium text-gray-300 mb-2">No leads found</h3>
        <p className="text-gray-500">No leads match your current filters.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {leads.map((lead) => {
        const isExpanded = expandedCards.has(lead._id);
        const primaryFields = getPrimaryFields(lead);
        const secondaryFields = getSecondaryFields(lead, primaryFields);
        
        return (
          <div
            key={lead._id}
            className="bg-gray-800 border border-gray-700 rounded-lg overflow-hidden hover:border-gray-600 transition-colors"
          >
            {/* Card Header */}
            <div className="p-4 border-b border-gray-700">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {/* Status Badge */}
                  <div className={`flex items-center gap-2 px-3 py-1 rounded-full border ${getStatusColor(lead.status)}`}>
                    {getStatusIcon(lead.status)}
                    <span className="text-sm font-medium">{lead.status}</span>
                  </div>
                  
                  {/* Priority Badge */}
                  <div className={`px-3 py-1 rounded-full ${getPriorityColor(lead.priority)}`}>
                    <span className="text-sm font-medium">{lead.priority}</span>
                  </div>
                  
                  {/* Primary Info */}
                  <div className="flex items-center gap-6">
                    {primaryFields.slice(0, 3).map(field => (
                      <div key={field} className="flex items-center gap-2">
                        {getFieldIcon(field)}
                        <span className="text-sm text-gray-300">
                          {formatValue(field, lead[field])}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Expand/Collapse Button */}
                <button
                  onClick={() => onToggleExpansion(lead._id)}
                  className="flex items-center gap-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                >
                  {isExpanded ? (
                    <>
                      <EyeOff className="w-4 h-4" />
                      <span className="text-sm">Hide Details</span>
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4" />
                      <span className="text-sm">View Details</span>
                    </>
                  )}
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>
            </div>
            
            {/* Expanded Content */}
            {isExpanded && (
              <div className="p-4 bg-gray-750">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {/* Secondary Fields */}
                  {secondaryFields.map(field => (
                    <div key={field} className="flex items-start gap-3 p-3 bg-gray-700 rounded-lg">
                      <div className="text-gray-400 mt-0.5">
                        {getFieldIcon(field)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">
                          {field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        </div>
                        <div className="text-sm text-white break-words">
                          {formatValue(field, lead[field])}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Metadata Fields */}
                  <div className="flex items-start gap-3 p-3 bg-gray-700 rounded-lg">
                    <Calendar className="w-4 h-4 text-gray-400 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">
                        Created
                      </div>
                      <div className="text-sm text-white">
                        {formatValue('createdAt', lead.createdAt)}
                      </div>
                    </div>
                  </div>
                  
                  {lead.updatedAt && lead.updatedAt !== lead.createdAt && (
                    <div className="flex items-start gap-3 p-3 bg-gray-700 rounded-lg">
                      <Clock className="w-4 h-4 text-gray-400 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">
                          Updated
                        </div>
                        <div className="text-sm text-white">
                          {formatValue('updatedAt', lead.updatedAt)}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Action Buttons */}
                <div className="mt-4 pt-4 border-t border-gray-700 flex gap-3">
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors">
                    Contact Lead
                  </button>
                  <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors">
                    Mark Qualified
                  </button>
                  <button className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg text-sm font-medium transition-colors">
                    Add Note
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default LeadDataViewer;
