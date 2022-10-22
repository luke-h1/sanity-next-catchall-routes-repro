import groq from "groq";
import studioClient from "../utils/sanity";

export interface Page {
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

const pageQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    ...,
  }
`;

const pageService = {
  async getAllPages(): Promise<Page[]> {
    return studioClient.fetch(allPageQuery);
  },
  async getPage(slug: string): Promise<Page> {
    return studioClient.fetch(pageQuery, {
      slug
    })
  }
};

export default pageService;
