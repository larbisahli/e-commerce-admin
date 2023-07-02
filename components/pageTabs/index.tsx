import Link from 'next/link';

interface Props {
  tabs: {
    label: string;
    href: string;
  }[];
}
const PageTabs = ({ tabs }: Props) => {
  return (
    <div className="bg-white p-2 shadow mb-5">
      {tabs?.map(({ label, href }, idx) => (
        <Link href={href} key={idx}>
          <a className="px-12 rounded-md py-2 max-w-[150px] capitalize">
            {label}
          </a>
        </Link>
      ))}
    </div>
  );
};

export default PageTabs;
