import React from "react";

interface BrowserOnlyProps {
  children: React.ReactNode;
}
const BrowserOnly: React.FC<BrowserOnlyProps> = ({ children }) => {
  const [hasMounted, setHasMounted] = React.useState(false);

  React.useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return children;
};

// Then in your component:

export default BrowserOnly;
