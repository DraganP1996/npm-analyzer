export const getPackagePackedSize = async (tarball: string): Promise<number | null> => {
  const tarballResponse = await fetch(tarball, {
    method: "GET",
    headers: {
      Range: "bytes=0-0",
    },
  });
  const contentRange = tarballResponse.headers.get("content-range");
  const match = contentRange?.match(/\/(\d+)$/);
  const packedSize = match ? parseInt(match[1], 10) : null;

  return packedSize;
};
