import Script from "next/script";
import { SITE_INDEXABLE } from "@/lib/site";

const measurementId = "G-Y4EHHM14HF";

export function GoogleAnalytics() {
  if (!SITE_INDEXABLE) return null;

  return (
    <>
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          if (window.location.hostname === 'www.museatlas.app') {
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${measurementId}');
          }
        `}
      </Script>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
    </>
  );
}
