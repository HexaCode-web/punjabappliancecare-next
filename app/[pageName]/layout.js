import GETDOC from "@/lib/getDoc";

export const generateMetadata = async ({ params }) => {
  let arPages = [];
  const fetchPages = async () => {
    const pages = await GETDOC("customization", "Sidepages");
    for (const key in pages) {
      if (Object.hasOwnProperty.call(pages, key)) {
        const element = pages[key];
        arPages.push(element);
      }
    }
  };
  await fetchPages();

  const foundPage = arPages.find((page) => page.PageURL === params.pageName);
  const isTemplate3 = foundPage?.Template === "Template3";
  const pageTitle = foundPage
    ? isTemplate3
      ? foundPage.Header?.metaTitle || "Not Found"
      : foundPage.metaTitle || "Not Found"
    : "Not Found";

  const pageDescription = foundPage
    ? isTemplate3
      ? foundPage.Header?.metaDescription || "Not Found"
      : foundPage.metaDescription || "Not Found"
    : "Not Found";
  const siteURL = "https://punjabappliancecare.ca/";
  return {
    title: pageTitle,
    alternates: {
      canonical: `${siteURL}${foundPage.PageURL}`,
    },
    description: pageDescription,
    openGraph: {
      title: pageTitle,
      description: pageDescription,

      images: [
        {
          url: "https://firebasestorage.googleapis.com/v0/b/punjabappliancecare.appspot.com/o/customization%2FGeneral%2FThumbnail?alt=media&token=17619904-17f2-4384-b652-c25718627135",
          width: 800,
          height: 600,
        },
      ],
      locale: "en_US",
      type: "website",
    },
  };
};
export default function SidePagesLayout({ children }) {
  return <main>{children}</main>;
}
export async function generateStaticParams() {
  let arPages = [];
  const fetchPages = async () => {
    const pages = await GETDOC("customization", "Sidepages");
    for (const key in pages) {
      if (Object.hasOwnProperty.call(pages, key)) {
        const element = pages[key];
        arPages.push(element);
      }
    }
  };
  await fetchPages();
  const filteredPages = arPages.filter((page) => page.PageURL !== "");

  return filteredPages.map((page) => {
    return { pageName: page.PageURL };
  });
}
