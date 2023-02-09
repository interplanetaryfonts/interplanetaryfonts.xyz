import connectContract from "@/utils/connectContract";

export async function createIPFontProject({
  files,
  name,
  description,
  perCharacterMintPrice,
  mintLimit,
}) {
  const ipfontsContract = connectContract();

  if (!ipfontsContract) {
    console.log("Cound not connect to contract");
    return;
  }

  const formData = new FormData();

  for (let i = 0; i < files.length; i++) {
    formData.append("fonts", files[i]);
  }

  try {
    const uploadFontResponse = await fetch("/api/upload-font", {
      method: "POST",
      body: formData,
    });

    const {
      ok: fontUploadOk,
      cid: fontFilesCID,
      error: fontUploadError,
    } = await uploadFontResponse.json();

    console.log({
      fontUploadOk,
      fontFilesCID,
      fontUploadError,
    });

    if (!fontUploadOk) {
      console.log(fontUploadError);
      return;
    }

    const uploadMetadataResponse = await fetch("/api/upload-metadata", {
      method: "POST",
      body: JSON.stringify({
        name,
        description,
      }),
    });

    const {
      ok: metadataUploadOk,
      cid: fontMetadataCID,
      error: metadataUploadError,
    } = await uploadMetadataResponse.json();

    console.log({
      metadataUploadOk,
      fontMetadataCID,
      metadataUploadError,
    });

    if (!metadataUploadOk) {
      console.log(metadataUploadError);
      return;
    }

    const createdAt = Date.now();

    const txn = await ipfontsContract.createFontProject(
      createdAt,
      createdAt,
      perCharacterMintPrice,
      mintLimit,
      process.env.NEXT_PUBLIC_SUPERFLUID_MATICX_TOKEN_ADDRESS,
      fontMetadataCID,
      fontFilesCID,
      { gasLimit: 900000 }
    );
    console.log("IPFonts : Creating font project entity", txn.hash);

    await txn.wait();
    console.log("IPFonts : Font project entity created", txn.hash);
  } catch (err) {
    console.log(err);
  }
}
