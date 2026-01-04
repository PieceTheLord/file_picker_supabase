import { Table } from "@/components/ui/table";
import { getCurrentUserData } from "../utils/getCurrentUesrData";
import { getCurrentUserLinks } from "../utils/getCurrentUserLinks";
import { EmptyOutline } from "./emptyFile";


export default async function Page() {
    const {
      data: { user: userData },
      error: userError,
    } = await getCurrentUserData();
  
    const {data:links, error:linksError} = userData
      ? await getCurrentUserLinks(userData.email!)
      : { data: null, error: null };
  
    console.log("links", links);

  if (links) {
    return <Table></Table>
  }
  else {
    return <EmptyOutline />
  }
}