import React, { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
}

const Section: React.FC<SectionProps> = ({ 
  children, 
  id, 
  className = "" 
}) => {
  return (
    <section 
      id={id}
      className={`flex flex-col items-center w-full ${className}`}
    >
      {children}
    </section>
  );
};

export default Section;
