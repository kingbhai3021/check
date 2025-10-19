# Witty Wealth Unified - Design System

## Overview
This document outlines the comprehensive design system implemented for Witty Wealth Unified, ensuring visual consistency and brand cohesion across the entire application.

## Color Palette

### Primary Colors
- **Primary Blue**: `#3b82f6` (Tailwind: `primary-500`)
- **Primary Shades**: Available from `primary-50` to `primary-950`
- **Usage**: All interactive elements, accents, buttons, and brand elements

### Neutral Colors
- **Black**: `#000000` - Primary text color
- **White**: `#ffffff` - Background color
- **Gray Scale**: Available from `gray-50` to `gray-950` for secondary text and borders

### Color Usage Guidelines
1. **Primary Blue** (`#3b82f6`) should be used for:
   - All buttons and interactive elements
   - Icons and illustrations
   - Links and hover states
   - Brand accents and highlights

2. **Black** should be used for:
   - Primary text content
   - Headings and titles
   - Important information

3. **White** should be used for:
   - Background colors
   - Card backgrounds
   - Clean, minimal layouts

4. **Gray Scale** should be used for:
   - Secondary text
   - Borders and dividers
   - Subtle backgrounds

## Typography

### Font Families
- **Inter**: Primary sans-serif font for body text
- **Archivo**: Used for headings and important titles
- **Poppins**: Alternative font for special elements
- **Roboto**: Secondary body font
- **Playfair Display**: Serif font for elegant headings

### Font Usage
- **Headings**: Use Archivo for main headings, Playfair Display for elegant titles
- **Body Text**: Use Inter for primary content, Roboto for secondary content
- **UI Elements**: Use Inter for buttons, forms, and interface elements

## Illustrations

### Style Guidelines
All illustrations follow the "Bro" style from Storyset.com with the following characteristics:
- **Color**: Primary blue (`#3b82f6`) for all elements
- **Style**: Modern, friendly, minimalist
- **Format**: SVG for scalability and performance
- **Consistency**: All illustrations use the same color palette and style

### Available Illustrations
1. **FinancialPlanning**: General financial planning and tools
2. **InvestmentGrowth**: Investment and wealth growth concepts
3. **LoanApplication**: Loan processes and applications
4. **InsuranceProtection**: Insurance and protection services
5. **CreditCard**: Credit card and payment services

### Usage
```jsx
import Illustration from '../components/common/Illustration.jsx';

<Illustration 
  type="financialPlanning" 
  width={400} 
  height={300} 
  className="rounded-lg"
  alt="Financial planning illustration"
/>
```

## Component Guidelines

### Buttons
- **Primary**: `bg-primary-600 hover:bg-primary-700 text-white`
- **Secondary**: `bg-white border-2 border-primary-600 text-primary-600 hover:bg-primary-50`
- **Size**: Use consistent padding (`px-6 py-3` for standard, `px-8 py-3` for large)

### Cards
- **Background**: `bg-white` or `bg-primary-50`
- **Border**: `border-2 border-primary-200`
- **Hover**: `hover:bg-primary-100`
- **Shadow**: `shadow-md hover:shadow-lg`

### Forms
- **Input**: `border border-gray-300 focus:border-primary-500 focus:ring-primary-500`
- **Labels**: `text-gray-700 font-medium`
- **Error States**: `border-red-500 text-red-500`

## Animation Guidelines

### Transitions
- **Duration**: 200ms for quick interactions, 300ms for standard transitions
- **Easing**: `ease-in-out` for most transitions
- **Hover Effects**: Subtle scale (`scale-1.02`) and lift (`y: -8`)

### Framer Motion
- **Fade In**: `opacity: 0 → 1` with `translateY(10px → 0)`
- **Slide In**: `translateX(-20px → 0)`
- **Scale In**: `scale(0.95 → 1)`

## Implementation Notes

### Tailwind Configuration
The design system is centralized in `tailwind.config.js`:
- All colors are defined in the theme
- Custom animations are included
- Font families are configured
- The system enforces consistency by overriding default colors

### File Structure
```
src/
├── assets/
│   ├── illustrations/          # SVG illustrations
│   └── design-system/         # Documentation
├── components/
│   └── common/
│       └── Illustration.jsx   # Reusable illustration component
└── tailwind.config.js         # Central theme configuration
```

## Best Practices

1. **Consistency**: Always use the defined color palette
2. **Accessibility**: Ensure sufficient contrast ratios
3. **Performance**: Use SVG illustrations for scalability
4. **Maintainability**: Reference the design system for all new components
5. **Responsiveness**: Design for all screen sizes

## Migration Guide

When updating existing components:
1. Replace all hardcoded colors with theme colors
2. Update illustrations to use the new standardized set
3. Ensure consistent spacing and typography
4. Test across different screen sizes
5. Verify accessibility standards

## Future Updates

The design system is designed to be:
- **Scalable**: Easy to add new colors and components
- **Maintainable**: Centralized configuration
- **Flexible**: Supports future brand evolution
- **Consistent**: Enforces visual coherence across the platform
