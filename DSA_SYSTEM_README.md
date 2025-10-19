# DSA Management System

## Overview
This system implements a comprehensive DSA (Direct Selling Agent) management system where only employees can create DSAs, and each employee can only view and manage the DSAs they have created.

## Key Features

### 🔐 **Unique DSA ID Generation**
- **Format**: `ww(year)(month)(date)(unique two digit number)(any alphabet)`
- **Example**: `ww2025090444A` (created on 4/9/2025)
- **Guaranteed Uniqueness**: Each DSA ID is unique with collision detection
- **Date-Based**: IDs include creation date for easy tracking

### 👥 **Employee-Only DSA Creation**
- Only employees can create new DSAs
- Each employee can only see DSAs they created
- Complete isolation between employees' DSA lists
- Employee dashboard with DSA management interface

### 🚪 **Simplified DSA Login**
- **DSA ID + Password only** (no email login)
- Secure authentication against employee-created accounts
- Automatic redirect to DSA dashboard after login

## System Architecture

### Components
1. **Employee Dashboard** (`/src/Pages/EmployeeDashboard.jsx`)
   - DSA Management section
   - Create new DSAs
   - View created DSAs
   - Delete DSAs
   - Statistics dashboard

2. **DSA Login** (`/src/components/dsalogin.jsx`)
   - Simplified login with DSA ID + Password
   - Authentication against stored DSAs
   - Link to signup page

3. **DSA Signup** (`/src/components/dsasignup.jsx`)
   - Automatic DSA ID generation
   - Form validation
   - User-friendly interface

4. **DSA ID Generator** (`/src/utils/dsaIdGenerator.js`)
   - Unique ID generation
   - Validation functions
   - Date extraction utilities

5. **System Demo** (`/src/components/DSASystemDemo.jsx`)
   - Interactive demonstration
   - Testing interface
   - System overview

## User Flow

### Employee Flow
1. **Login**: Employee logs in at `/employee/login`
2. **Dashboard**: Access employee dashboard
3. **DSA Management**: Navigate to "DSA Management" section
4. **Create DSA**: Click "Create New DSA" button
5. **Fill Form**: Enter DSA details (name, email, phone, password)
6. **Generate ID**: System automatically generates unique DSA ID
7. **Save**: DSA is created and stored
8. **View**: Employee can view all their created DSAs

### DSA Flow
1. **Get Credentials**: DSA receives ID and password from employee
2. **Login**: DSA logs in at `/dsa-login` with ID + password
3. **Authentication**: System validates against stored DSAs
4. **Dashboard**: Redirected to DSA dashboard

## Data Storage

### LocalStorage Structure
```javascript
// DSAs are stored in localStorage under 'dsas' key
[
  {
    id: "ww2025090444A",
    name: "John Doe",
    email: "john@example.com",
    phone: "+911234567890",
    password: "hashed_password",
    createdBy: "employee_id",
    createdByName: "Employee Name",
    createdAt: "2025-09-04T10:30:00.000Z",
    status: "active"
  }
]
```

## API Endpoints (Future Implementation)

### Employee Endpoints
- `POST /api/employee/dsas` - Create new DSA
- `GET /api/employee/dsas` - Get employee's DSAs
- `DELETE /api/employee/dsas/:id` - Delete DSA
- `PUT /api/employee/dsas/:id` - Update DSA

### DSA Endpoints
- `POST /api/dsa/login` - DSA authentication
- `GET /api/dsa/profile` - Get DSA profile
- `PUT /api/dsa/profile` - Update DSA profile

## Security Features

1. **Unique ID Generation**: Prevents ID collisions
2. **Employee Isolation**: Each employee only sees their DSAs
3. **Password Validation**: Secure password handling
4. **Authentication**: Proper login validation
5. **Data Validation**: Form validation and sanitization

## Testing

### Demo Page
Visit `/dsa-demo` to see an interactive demonstration of the system.

### Test Credentials
- **Employee Login**: Use the employee login system
- **DSA Login**: Use any created DSA ID + password

## File Structure

```
src/
├── Pages/
│   └── EmployeeDashboard.jsx          # Main employee dashboard
├── components/
│   ├── dsalogin.jsx                   # DSA login component
│   ├── dsasignup.jsx                  # DSA signup component
│   └── DSASystemDemo.jsx              # System demonstration
├── utils/
│   └── dsaIdGenerator.js              # DSA ID generation utilities
└── App.jsx                            # Main app with routing
```

## Future Enhancements

1. **Database Integration**: Replace localStorage with proper database
2. **Password Hashing**: Implement secure password hashing
3. **Email Notifications**: Send DSA credentials via email
4. **Audit Trail**: Track all DSA creation/modification activities
5. **Role-Based Permissions**: Different employee roles with different permissions
6. **DSA Performance Tracking**: Track DSA activities and performance
7. **Bulk DSA Creation**: Create multiple DSAs at once
8. **DSA Status Management**: Activate/deactivate DSAs
9. **Reporting**: Generate reports on DSA activities
10. **Mobile App**: Mobile application for DSA management

## Installation & Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```

3. **Access the System**:
   - Employee Dashboard: `/employee/login`
   - DSA Login: `/dsa-login`
   - System Demo: `/dsa-demo`

## Contributing

1. Follow the existing code structure
2. Maintain the unique DSA ID format
3. Ensure employee isolation is preserved
4. Add proper error handling
5. Include comprehensive testing

## License

This project is part of the WittyWealth application system.
