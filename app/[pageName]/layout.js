export const generateMetadata = async ({ params }) => {
  let arPages = [];
  const fetchPages = async () => {
    const pagesResponse = await fetch(
      `${process.env.NEXT_PUBLIC_END_POINT_URL}/SidePages`
    );
    const pages = await pagesResponse.json();

    arPages = pages;
  };
  await fetchPages();
  const foundPage = arPages.find((page) => {
    return page.PageURL === params.pageName;
  });
  const pageTitle = foundPage.metaTitle || "Not Found";
  const pageDescription = foundPage.metaDescription || "Not Found";

  const siteURL = "https://punjabappliancecare.ca/";
  return {
    title: pageTitle,
    alternates: {
      canonical: `${siteURL}${foundPage?.PageURL}`,
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
    const pagesResponse = await fetch(
      `${process.env.NEXT_PUBLIC_END_POINT_URL}/SidePages`
    );
    const pages = await pagesResponse.json();

    arPages = pages;
  };
  await fetchPages();
  const filteredPages = arPages.filter((page) => page.PageURL !== "");

  return filteredPages.map((page) => {
    return { pageName: page.PageURL };
  });
}
