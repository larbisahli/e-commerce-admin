import Link from 'next/link';

interface Props {
  tabs: {
    label: string;
    href: string;
  }[];
}
const PageTabs = ({ tabs }: Props) => {
  return (
    <div className="mb-5 bg-white p-2 shadow">
      {tabs?.map(({ label, href }, idx) => (
        <Link href={href} key={idx}>
          <div className="max-w-[150px] rounded-md px-12 py-2 capitalize">
            {label}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default PageTabs;
