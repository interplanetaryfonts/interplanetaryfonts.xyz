import Navbar from "./Navbar";

const Layout = ({ children }) => {
  return (
    <div className="font-sans flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
};

export default Layout;
