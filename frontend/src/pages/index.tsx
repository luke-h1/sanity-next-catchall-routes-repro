import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import pageService, { Page } from '../services/pageService';

interface Props {
  pages: Page[];
}

const IndexPage = ({ pages }: Props) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
      }}
    >
      <h2>Available slugs</h2>
      <ul>
        {pages &&
          pages.map((page) => (
            <li>
              <Link
                href={`/${page.slug.current}`}
                style={{ cursor: 'pointer' }}
              >
                {page.title}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const pages = await pageService.getAllPages();

  if (!pages.length) {
    return {
      notFound: true,
    };
  }
  return {
    revalidate: 1,
    props: {
      pages,
    },
  };
};

export default IndexPage;
