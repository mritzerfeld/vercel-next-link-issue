export const fetchPagedata = async (webspace, { params }) => {
  // Fetch page data
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/${webspace}${
      params?.locale ? "/" + params.locale : ""
    }${
      params?.alias && (params.alias.length > 1 || params.alias[0] !== "index")
        ? "/" + params.alias.join("/")
        : ""
    }.json`,
    {
      cache:
        process.env.NODE_ENV === "development" ? "no-cache" : "force-cache",
      next: {
        tags: [
          "page",
          `${webspace}${params?.locale ? "/" + params.locale : ""}${
            params?.alias &&
            (params.alias.length > 1 || params.alias[0] !== "index")
              ? "/" + params.alias.join("/")
              : ""
          }`.replaceAll("/", ":"),
        ],
      },
    }
  );
  const data = await res.json();

  // Throw HTTP 404 for non-existent page
  if (res.status !== 200) {
    notFound();
  }

  // Return data
  return data;
};
