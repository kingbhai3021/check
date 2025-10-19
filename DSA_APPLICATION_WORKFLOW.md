# DSA Application Workflow Documentation

## Overview

The DSA Application Workflow is a new admin-approval-based system for onboarding DSA (Direct Selling Agent) candidates. This system replaces the previous direct DSA creation process, ensuring proper vetting and approval before DSA accounts are activated.

## Key Features

- **Admin-Approval Based**: All DSA applications must be reviewed and approved by an Admin
- **BDE Submission**: BDEs (Business Development Executives) can submit DSA candidate applications
- **Unique DSA ID Generation**: DSA IDs are generated based on the BDE's ID and approval date
- **Comprehensive Application Form**: Includes all necessary personal, professional, and banking information
- **Status Tracking**: Applications can be Pending, Approved, or Rejected
- **Audit Trail**: Complete tracking of who submitted, reviewed, and approved applications

## User Roles

### 1. BDE (Business Development Executive)
- **Can**: Submit DSA applications for review
- **Can**: View their own submitted applications
- **Cannot**: Create DSA accounts directly
- **Cannot**: Approve or reject applications

### 2. Admin
- **Can**: View all pending DSA applications
- **Can**: Approve or reject DSA applications
- **Can**: View all applications (pending, approved, rejected)
- **Can**: Generate DSA credentials upon approval

### 3. DSA (Direct Selling Agent)
- **Can**: Access their account after approval
- **Cannot**: Submit applications (done by BDEs)

## DSA ID Format

The new DSA ID format is: `{BDE_ID}{DDMMYYYY}{LETTER}`

### Examples:
- `ww100127012025A` - First DSA approved by BDE `ww1001` on 27/01/2025
- `ww100127012025B` - Second DSA approved by BDE `ww1001` on 27/01/2025
- `ww100228012025A` - First DSA approved by BDE `ww1001` on 28/01/2025
- `ww100227012025A` - First DSA approved by BDE `ww1002` on 27/01/2025

### Format Breakdown:
- **BDE_ID**: The username of the BDE who submitted the application (e.g., `ww1001`)
- **DDMMYYYY**: Date of approval in DDMMYYYY format (e.g., `27012025`)
- **LETTER**: Sequential letter (A, B, C, etc.) for multiple DSAs approved by the same BDE on the same date

## API Endpoints

### BDE Endpoints

#### Submit DSA Application
```
POST /api/dsa-applications/submit
```
**Authentication**: BDE (Employee) required
**Body**: Complete DSA application form data
**Response**: Application created with status "Pending"

#### Get My Applications
```
GET /api/dsa-applications/bde/me
```
**Authentication**: BDE (Employee) required
**Response**: List of applications submitted by the current BDE

### Admin Endpoints

#### Get Pending Applications
```
GET /api/dsa-applications/pending
```
**Authentication**: Admin required
**Response**: List of all pending DSA applications

#### Get All Applications
```
GET /api/dsa-applications?status=Pending|Approved|Rejected
```
**Authentication**: Admin required
**Response**: List of applications filtered by status

#### Approve Application
```
POST /api/dsa-applications/:id/approve
```
**Authentication**: Admin required
**Response**: DSA user created with generated credentials

#### Reject Application
```
POST /api/dsa-applications/:id/reject
```
**Authentication**: Admin required
**Body**: `{ "rejectionReason": "string" }`
**Response**: Application status updated to "Rejected"

## Database Schema

### DSAApplication Model

```javascript
{
  // Basic Information
  name: String (required),
  phone: String (required, unique),
  email: String (required, unique),
  
  // Personal Information
  dateOfBirth: Date (required),
  gender: String (required, enum: ['Male', 'Female', 'Other']),
  maritalStatus: String (enum: ['Single', 'Married', 'Divorced', 'Widowed']),
  
  // Identity Documents
  panNumber: String (required, format: ABCDE1234F),
  aadharNumber: String (required, 12 digits),
  
  // Address Information
  permanentAddress: {
    address: String (required),
    city: String (required),
    state: String (required),
    pincode: String (required),
    country: String (default: 'India')
  },
  currentAddress: {
    address: String,
    city: String,
    state: String,
    pincode: String,
    country: String (default: 'India')
  },
  
  // Banking Information
  bankDetails: {
    bankName: String,
    accountNumber: String,
    ifscCode: String,
    accountType: String (enum: ['Savings', 'Current', 'Salary']),
    branchName: String,
    branchAddress: String
  },
  
  // Emergency Contact
  emergencyContact: {
    name: String,
    relationship: String,
    phone: String,
    address: String
  },
  
  // Professional Information
  workExperience: [Object],
  education: [Object],
  
  // Additional Information
  skills: [String],
  languages: [String],
  certifications: [Object],
  
  // Application Management
  status: String (enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending'),
  submittedByBDE: ObjectId (ref: 'User', required),
  reviewedByAdmin: ObjectId (ref: 'User'),
  reviewDate: Date,
  rejectionReason: String,
  
  // Generated DSA Details (after approval)
  generatedDSAId: String,
  generatedUsername: String,
  generatedPassword: String,
  
  // Timestamps
  createdAt: Date (default: Date.now),
  updatedAt: Date (default: Date.now)
}
```

## Frontend Components

### 1. DSASubmissionForm.jsx
**Location**: `src/components/EmployeeDashboard/DSASubmissionForm.jsx`
**Purpose**: Form for BDEs to submit DSA applications
**Features**:
- Comprehensive form with all required fields
- Real-time validation
- Success/error messaging
- Modal-based interface

### 2. DSAApplicationManagement.jsx
**Location**: `src/components/AdminDashboard/DSAApplicationManagement.jsx`
**Purpose**: Admin interface for managing DSA applications
**Features**:
- View pending applications
- Approve/reject applications
- Detailed application view
- Status filtering
- Generated credentials display

### 3. MyDSAApplications.jsx
**Location**: `src/components/EmployeeDashboard/MyDSAApplications.jsx`
**Purpose**: BDE interface to view their submitted applications
**Features**:
- List of submitted applications
- Application status tracking
- Detailed view of applications
- Status-based filtering

## Workflow Process

### 1. BDE Submission Process
1. BDE logs into the system
2. Navigates to DSA submission form
3. Fills out comprehensive application form
4. Submits application for review
5. Application status: "Pending"

### 2. Admin Review Process
1. Admin logs into the system
2. Navigates to DSA Application Management
3. Views pending applications
4. Reviews application details
5. Makes decision: Approve or Reject

### 3. Approval Process
1. Admin clicks "Approve" button
2. System generates unique DSA ID
3. System creates DSA user account
4. System generates temporary password
5. Application status: "Approved"
6. Admin receives generated credentials

### 4. Rejection Process
1. Admin clicks "Reject" button
2. Admin provides rejection reason
3. Application status: "Rejected"
4. BDE can view rejection reason

## Security Considerations

1. **Authentication**: All endpoints require proper authentication
2. **Authorization**: Role-based access control (BDE vs Admin)
3. **Data Validation**: Comprehensive server-side validation
4. **Unique Constraints**: Phone and email uniqueness enforced
5. **Audit Trail**: Complete tracking of all actions
6. **Password Security**: Temporary passwords with proper hashing

## Testing

### Test Script
**Location**: `backend/scripts/testDSAWorkflow.js`
**Purpose**: Test DSA ID generation and parsing functionality

### Running Tests
```bash
cd backend
node scripts/testDSAWorkflow.js
```

### Test Coverage
- DSA ID generation for different BDEs
- DSA ID generation for different dates
- DSA ID parsing and validation
- Temporary password generation
- Format validation

## Integration Points

### Existing Systems
1. **User Model**: DSA users are created in the existing User collection
2. **Authentication**: Uses existing JWT-based authentication
3. **Employee System**: BDEs are existing employees in the system
4. **Admin System**: Admins use existing admin authentication

### New Components
1. **DSAApplication Model**: New collection for application management
2. **DSA ID Generator**: New utility for unique ID generation
3. **Application Controller**: New controller for application management
4. **Application Routes**: New routes for application workflow

## Future Enhancements

1. **Email Notifications**: Notify BDEs of application status changes
2. **Document Upload**: Support for document attachments
3. **Bulk Operations**: Bulk approve/reject functionality
4. **Advanced Filtering**: More sophisticated filtering options
5. **Reporting**: Application statistics and reports
6. **Mobile Support**: Mobile-optimized interfaces

## Troubleshooting

### Common Issues

1. **DSA ID Generation Fails**
   - Check BDE username format
   - Verify date format
   - Ensure database connection

2. **Application Submission Fails**
   - Validate all required fields
   - Check for duplicate phone/email
   - Verify BDE authentication

3. **Approval Process Fails**
   - Ensure admin authentication
   - Check application status
   - Verify BDE exists

### Error Codes
- `400`: Bad Request (validation errors)
- `401`: Unauthorized (authentication required)
- `403`: Forbidden (insufficient permissions)
- `404`: Not Found (application not found)
- `500`: Internal Server Error (system error)

## Support

For technical support or questions about the DSA Application Workflow, please contact the development team or refer to the system documentation.

