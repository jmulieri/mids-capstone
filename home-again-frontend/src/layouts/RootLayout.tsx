import { Toaster } from "@/components/ui/toaster";

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
      <>
          <>{children}</>
          <Toaster />
      </>
  );
};

export default RootLayout;
