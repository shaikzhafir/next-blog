import "../styles/globals.css";
import router, { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Spinner from "components/Spinner";

function MyApp({ Component, pageProps }) {
  const [pageLoading, setPageLoading] = useState(false);
  useEffect(() => {
    const handleStart = () => {
      setPageLoading(true);
    };
    const handleComplete = () => {
      setPageLoading(false);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
  }, [router]);

  return pageLoading ? (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Spinner />
    </div>
  ) : (
    <Component {...pageProps} />
  );
}

export default MyApp;
