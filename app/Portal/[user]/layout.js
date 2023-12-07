import decrypt from "@/lib/decrypt";
import GETDOC from "@/lib/getDoc";

export const generateMetadata = async ({ params }) => {
  const userID = decrypt(params.user);
  const fetchedUser = await GETDOC("users", userID);
  return {
    title: fetchedUser.Fname + " " + fetchedUser.Lname,
    description: `this is the page of the user ${
      fetchedUser.Fname + " " + fetchedUser.Lname
    } `,
    openGraph: {
      title: fetchedUser.Fname + " " + fetchedUser.Lname,
      description: `this is the page of the user ${
        fetchedUser.Fname + " " + fetchedUser.Lname
      } `,
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
export default function UserLayout({ children }) {
  return <main>{children}</main>;
}
