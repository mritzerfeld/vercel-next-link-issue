import { fetchPagedata } from "./pagedata";

const Page = async ({ params }) => {
  // Fetch page data
  const data = await fetchPagedata("enea", params);

  // Output
  const { content, extension, template, view } = data,
    { blocks } = content;

  return <p>{extension?.seo?.title || content?.title}</p>;
};

export default Page;
