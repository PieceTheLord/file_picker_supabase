import { createSignedURL_day } from "@/app/utils/createSignedURL_day";
import { insertFileDetails } from "@/app/utils/insertFileDetails";
import { uploadFile } from "@/app/utils/uplaodFile";
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request): Promise<NextResponse> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "File is required." }, { status: 400 });
    }

    const fileName = `${Date.now()}-${file.name.split(" ").join("-")}`;
    const fileBuffer = await file.arrayBuffer();

    const bucketName = process.env.SUPABASE_STORAGE_BUCKET_NAME!;
    const filePath = `uploads/${fileName}`;

    const { data: uploadedFileData, error: uploadFileError } = await uploadFile(
      bucketName,
      fileBuffer,
      filePath,
      file.type
    );

    if (uploadFileError) {
      console.error("Supabase upload error:", uploadFileError);
      return NextResponse.json(
        { error: "Failed to upload file." },
        { status: 500 }
      );
    }

    console.log("Upload data:", uploadedFileData);

    const { data: link, error: signedUrlError } = await createSignedURL_day(
      uploadedFileData.path,
      bucketName
    );

    if (signedUrlError) {
      console.error("Error creating signed URL:", signedUrlError);
      return NextResponse.json(
        { error: "Failed to create signed URL." },
        { status: 500 }
      );
    }

    const { data: fileData, error: insertFileError } = await insertFileDetails(
      uploadedFileData.path,
      file.name,
      link.signedUrl
    );

    if (insertFileError) {
      console.error("Error creating signed URL:", insertFileError);
      return NextResponse.json(
        { error: "Failed to create signed URL." },
        { status: 500 }
      );
    }

    return NextResponse.json({ URL: link.signedUrl }, { status: 200 });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { error: "Internal server error." },
      { status: 500 }
    );
  }
}
