import groq from "groq";
import studioClient from "../utils/sanity";

interface Page {
  _id: string;
  _type: "page";
  key: string;
  title: string;
  content: string;
  slug: Slug;
}
export interface Slug {
  _type: "slug";
  current: string;
}

const allPageQuery = groq`
 *[_type == "page"] {
    ...,
 }
`;

const pageService = {
  async getAllPages(): Promise<Page[]> {
    return studioClient.fetch(allPageQuery);
  },
};

export default pageService;
