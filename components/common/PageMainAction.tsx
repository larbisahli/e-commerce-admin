import { Add } from '@components/icons/add';
import LinkButton from '@components/ui/link-button';
import { useTranslation } from 'next-i18next';

interface Props {
  href?: string;
  title: string;
  label: string;
  onClick?: (e: any) => void;
  RenderIcon?: () => any;
}

const PageMainAction = ({ href, title, label, onClick, RenderIcon }: Props) => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center mb-5 justify-between border-y border-gray-300 p-3">
      <h1 className="text-2xl text-gray-700 font-bold">{title}</h1>
      {href && (
        <LinkButton href={href} onClick={onClick} className="h-12 ms-4 md:ms-6">
          <div className="w-full flex items-center justify-center">
            <div className="hidden md:flex items-center justify-center">
              {RenderIcon ? <RenderIcon /> : <Add width="1rem" height="1rem" />}
              <span className="m-1">{label}</span>
            </div>
            <div className="md:hidden flex items-center justify-center">
              {RenderIcon ? <RenderIcon /> : <Add width="1rem" height="1rem" />}
              <span className="m-1">{t('form:button-label-add')}</span>
            </div>
          </div>
        </LinkButton>
      )}
    </div>
  );
};

export default PageMainAction;
