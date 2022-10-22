import type { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import pageService, { Page } from '../services/pageService';

interface Props {
  page: Page;
}

const Home = ({ page }: Props) => {
  return <div>{page.slug.current}</div>;
};

export const getStaticPaths: GetStaticPaths = () => {
  return {
    paths: [],
    fallback: 'blocking',
  };
};

type Params = {
  slug: string[];
};

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  if (!params?.slug.length) {
    console.warn('no slug');
    console.warn(params?.slug);
    return {
      notFound: true,
    };
  }

  const page = await pageService.getPage(params.slug.join('/'));

  if (!page) {
    return {
      notFound: true,
    };
  }
  return {
    revalidate: 1,
    props: {
      page,
    },
  };
};

export default Home;
