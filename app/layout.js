/* eslint-disable @next/next/no-sync-scripts */
import GETDOC from "@/lib/getDoc";
import "./globals.css";
import { Roboto } from "next/font/google";
import dynamic from "next/dynamic";

const roboto = Roboto({
  subsets: ["cyrillic"],
  weight: ["400", "700", "300", "500", "100"],
});
export async function generateMetadata() {
  const siteURL = "https://punjabappliancecare.ca/";
  const fetchWebData = await GETDOC("customization", "Website");
  return {
    title: fetchWebData.WebsiteName,
    description: fetchWebData.Description,
    alternates: {
      canonical: siteURL,
    },
    openGraph: {
      title: fetchWebData.WebsiteName,
      description: fetchWebData.Description,
      images: [
        {
          url: fetchWebData.Thumbnail,
          width: 800,
          height: 600,
        },
      ],
      siteName: fetchWebData.WebsiteName,

      locale: "en_US",
      type: "website",
    },
  };
}

export default function RootLayout({ children }) {
  const Nav = dynamic(() => import("./components/Nav/Nav"), {
    ssr: true,
  });
  const Footer = dynamic(() => import("./components/Footer/Footer"), {
    ssr: true,
  });
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="https://firebasestorage.googleapis.com/v0/b/punjabappliancecare.appspot.com/o/customization%2FGeneral%2FFavIcon.png?alt=media&token=2d8942c0-aff9-433a-8983-876fa1eb4d1f"
        />
      </head>
      <body className={roboto.className}>
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
