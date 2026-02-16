import React from 'react';
import AnimatedFooter from './ui/animated-footer';

const Footer: React.FC = () => {
  return (
    <AnimatedFooter
      leftLinks={[
        { href: "#", label: "Work" },
        { href: "#", label: "Studio" },
        { href: "#", label: "Careers" },
      ]}
      rightLinks={[
        { href: "#", label: "Instagram" },
        { href: "#", label: "Twitter" },
        { href: "#", label: "LinkedIn" },
        { href: "#", label: "Contact" },
      ]}
      copyrightText={`Clyde © ${new Date().getFullYear()}`}
      barCount={50}
    />
  );
};

export default Footer;