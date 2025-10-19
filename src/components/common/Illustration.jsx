import React from 'react';

// Import all illustrations
import FinancialPlanning from '../../assets/illustrations/FinancialPlanning.svg';
import InvestmentGrowth from '../../assets/illustrations/InvestmentGrowth.svg';
import LoanApplication from '../../assets/illustrations/LoanApplication.svg';
import InsuranceProtection from '../../assets/illustrations/InsuranceProtection.svg';
import CreditCard from '../../assets/illustrations/CreditCard.svg';

const illustrations = {
  financialPlanning: FinancialPlanning,
  investmentGrowth: InvestmentGrowth,
  loanApplication: LoanApplication,
  insuranceProtection: InsuranceProtection,
  creditCard: CreditCard,
};

const Illustration = ({ 
  type, 
  width = 400, 
  height = 300, 
  className = "",
  alt = "Illustration"
}) => {
  const IllustrationComponent = illustrations[type];
  
  if (!IllustrationComponent) {
    console.warn(`Illustration type "${type}" not found. Available types:`, Object.keys(illustrations));
    return null;
  }

  return (
    <img
      src={IllustrationComponent}
      alt={alt}
      width={width}
      height={height}
      className={`${className}`}
      loading="lazy"
    />
  );
};

export default Illustration;
