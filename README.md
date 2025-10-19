# WittyWealth Unified Frontend

This is a unified frontend repository that combines two separate repositories into a single, organized codebase for the WittyWealth financial platform.

## 🚀 Features

### Main Website
- **Home Page** - Landing page with hero slider and testimonials
- **Client Login** - User authentication and dashboard access
- **Distributor Portal** - Partner management interface
- **Account Opening** - New account registration forms
- **KYC Forms** - Know Your Customer documentation

### Insurance Products
- **All Insurance** - Overview of all insurance products
- **Health Insurance** - Medical coverage options
- **Endowment Plans** - Life insurance with savings
- **Term Insurance** - Pure life coverage
- **Travel Insurance** - Trip protection
- **ULIP** - Unit Linked Insurance Plans
- **Vehicle Insurance** - Auto coverage

### Financial Tools & Calculators
- **SIP Calculator** - Systematic Investment Plan calculator
- **EMI Calculator** - Equated Monthly Installment calculator
- **Home Loan Calculator** - Mortgage payment calculator
- **Personal Loan Calculator** - Personal loan EMI calculator

### Financial Products
- **Credit Cards** - Credit card offerings and applications
- **Credit Score** - Credit score checking and monitoring
- **Loans** - Various loan products and eligibility
- **Fixed Deposits** - FD interest rates and calculators
- **Mutual Funds** - Investment fund options
- **Gold Rates** - Gold price tracking

### Admin Dashboard
- **Admin Management** - User and system management
- **Client Management** - Customer data and accounts
- **Agent Management** - Sales agent oversight
- **DSA Management** - Direct Selling Agent management
- **Leads Management** - Lead tracking and conversion
- **Services** - Service configuration
- **Loan Audit** - Loan application review
- **Employee Management** - Staff administration
- **Salary Management** - Payroll processing
- **Commissions** - Commission tracking and payout

## 📁 Project Structure

```
src/
├── components/
│   ├── FinancialTools/          # Financial calculators and tools
│   ├── Home/                    # Homepage components
│   ├── AdminDashboard/          # Admin panel components
│   ├── AgentDashboard/          # Agent portal components
│   ├── ClientDashboard/         # Client dashboard components
│   ├── distributor/             # Distributor portal components
│   └── charts/                  # Chart and visualization components
├── Pages/                       # Main page components
├── services/                    # API and service functions
├── lib/                         # Utility functions and helpers
├── styles/                      # CSS and styling files
└── assets/                      # Images, icons, and static files
```

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd wittywealth-unified
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🎯 Key Routes

### Main Routes
- `/` - Homepage
- `/client-login` - Client authentication
- `/distributor` - Distributor portal
- `/dashboard/*` - Client dashboard
- `/agent/*` - Agent dashboard

### Insurance Routes
- `/AllInsurance` - Insurance overview
- `/health` - Health insurance
- `/endowment` - Endowment plans
- `/termform` - Term insurance
- `/travel` - Travel insurance
- `/ulip` - ULIP plans
- `/vehicle` - Vehicle insurance

### Financial Tools Routes
- `/calculators/sip` - SIP calculator
- `/calculators/emi` - EMI calculator
- `/calculators/home-loan-emi` - Home loan calculator
- `/calculators/personal-loan` - Personal loan calculator

### Financial Products Routes
- `/credit-cards` - Credit cards
- `/credit-score` - Credit score
- `/loans` - Loan products
- `/investment/fixed-deposits` - Fixed deposits
- `/investment/mutual-funds` - Mutual funds
- `/gold-rate` - Gold rates

### Admin Routes
- `/admin/login` - Admin login
- `/admin/dashboard` - Admin dashboard
- `/admin/management` - Management panel
- `/admin/manage-clients` - Client management
- `/admin/manage-agents` - Agent management

## 🛠️ Technologies Used

- **React 19** - Frontend framework
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Chart.js** - Data visualization
- **Framer Motion** - Animation library
- **React Hot Toast** - Toast notifications
- **Lucide React** - Icon library

## 📝 Development Notes

- The repository combines two separate frontend codebases
- All dependencies have been merged and updated to latest versions
- Routing has been unified with logical organization
- Components are organized by feature/domain
- Admin dashboard includes comprehensive management tools
- Financial tools provide calculators and product information

## 🔧 Configuration

The project uses:
- **Vite** for build configuration (`vite.config.js`)
- **Tailwind CSS** for styling (`tailwind.config.js`)
- **ESLint** for code linting (`eslint.config.js`)
- **PostCSS** for CSS processing (`postcss.config.js`)

## 📦 Dependencies

All dependencies from both original repositories have been merged and updated to ensure compatibility and latest features.

## 🚀 Deployment

The project can be deployed using:
```bash
npm run build
```

The built files will be in the `dist/` directory, ready for deployment to any static hosting service.
