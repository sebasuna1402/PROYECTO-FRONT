import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Footer } from "./components/Footer";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

export const Layout = () => {
  const queryClient = new QueryClient();
  return (
    <>
      <h1>LOOK FOR YOUR DREAM</h1>
      <Navbar />
      <div>
        <main>
          <QueryClientProvider client={queryClient}>
            <Outlet />
            <ReactQueryDevtools />
          </QueryClientProvider>
        </main>
      </div>

      <Footer />
    </>
  );
};

export default Layout;
