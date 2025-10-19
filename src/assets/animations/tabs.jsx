import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../../lib/utils";

const TabsContext = React.createContext();

export function Tabs({ defaultValue, children, className }) {
  const [activeTab, setActiveTab] = React.useState(defaultValue);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={cn("w-full", className)}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ className, children }) {
  return (
    <div className={cn("inline-flex h-10 items-center rounded-md bg-gray-100 p-1 text-gray-500", className)}>
      {children}
    </div>
  );
}

const tabTriggerVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium transition-all",
  {
    variants: {
      active: {
        true: "bg-white text-gray-900 shadow-sm",
        false: "hover:text-gray-900 hover:bg-white/50",
      },
    },
    defaultVariants: {
      active: false,
    },
  }
);

export function TabsTrigger({ value, className, children }) {
  const { activeTab, setActiveTab } = React.useContext(TabsContext);
  const isActive = activeTab === value;

  return (
    <button
      className={cn(tabTriggerVariants({ active: isActive }), className)}
      onClick={() => setActiveTab(value)}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, className, children }) {
  const { activeTab } = React.useContext(TabsContext);

  if (activeTab !== value) return null;

  return (
    <div className={cn("mt-2 rounded-md border border-gray-200 p-4", className)}>
      {children}
    </div>
  );
}
