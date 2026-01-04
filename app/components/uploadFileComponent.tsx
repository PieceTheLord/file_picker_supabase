import { Button } from "@/components/ui/button";
import { getCurrentUserData } from "../utils/getCurrentUesrData";
import { getCurrentUserLinks } from "../utils/getCurrentUserLinks";
import { EmptyOutline } from "./emptyFile";
import { URLsTable } from "./urlsTable";

export async function UploadFileComponent() {
  const {
    data: { user: userData },
    error: userError,
  } = await getCurrentUserData();

  const { data: links, error: linksError } = userData
    ? await getCurrentUserLinks(userData.email!)
    : { data: null, error: null };

  console.log("links", links);
  if (linksError) {
    console.error(
      "retrieving links error in uploadFileCmponents.tsx at 18 line"
    );
    throw new Error(`retrieving links error ${linksError}`);
  }

  if (!links) {
    return <EmptyOutline />;
  } else {
    return (
      <>
        <a href="/protected">
          <Button>Upload file</Button>
        </a>
        <URLsTable links={links!} />
      </>
    );
  }
}
