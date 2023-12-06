/* eslint-disable @next/next/no-sync-scripts */
import "./globals.css";
import { Roboto } from "next/font/google";
import dynamic from "next/dynamic";

const roboto = Roboto({
  subsets: ["cyrillic"],
  weight: ["400", "700", "300", "500", "100"],
});
export async function generateMetadata() {
  const siteURL = "https://punjabappliancecare.ca/";
  const fetchWebData = await fetch(
    `${process.env.NEXT_PUBLIC_END_POINT_URL}/WebSite`
  ).then((res) => res.json());
  return {
    title: fetchWebData[0].WebsiteName,
    description: fetchWebData[0].Description,
    alternates: {
      canonical: siteURL,
    },
    openGraph: {
      title: fetchWebData[0].WebsiteName,
      description: fetchWebData[0].Description,
      images: [
        {
          url: fetchWebData[0].Thumbnail,
          width: 800,
          height: 600,
        },
      ],
      siteName: fetchWebData[0].WebsiteName,

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
