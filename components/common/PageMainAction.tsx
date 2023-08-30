import { Add } from '@components/icons/add';
import { QuestionMark } from '@components/icons/questionMark';
import Label from '@components/ui/label';
import LinkButton from '@components/ui/link-button';
import SelectInput from '@components/ui/select-input';
import { LanguageType, StoreViewType } from '@ts-types/generated';
import isEmpty from 'lodash/isEmpty';
import { useTranslation } from 'next-i18next';
import { useForm } from 'react-hook-form';
import { Tooltip } from 'react-tooltip';

interface Props {
  href?: string;
  title: string;
  label: string;
  onClick?: (e: any) => void;
  RenderIcon?: () => any;
}

type FormValues = {
  language: LanguageType;
  storeView: StoreViewType;
};

const defaultValues = {
  language: { name: 'English', id: 1 },
  storeView: { name: 'All Store Views', id: 0 }
};

const initialValues = {};

const storeViewOptions = [
  { name: 'All Store Views', id: 0 },
  { name: 'English Store', id: 1 },
  { name: 'Arabic Store', id: 2 }
];

const PageMainAction = ({ href, title, label, onClick, RenderIcon }: Props) => {
  const { t } = useTranslation();

  const {
    control,
    formState: { errors }
  } = useForm<FormValues>({
    defaultValues: isEmpty(initialValues) ? defaultValues : {}
  });

  return (
    <>
      <Tooltip id="actions-selectors" />
      <h1 className="text-2xl text-gray-700 font-bold mb-6">{title}</h1>
      <div className="flex items-center mb-5 justify-between  border-y border-gray-300 p-3">
        {/* ----------- */}

        <div className="flex items-center justify-end">
          <div className="mr-3 flex items-center relative">
            <Label className="pr-1 mt-1">{t('common:store-view')}:</Label>
            <SelectInput
              isSimple
              name="storeView"
              control={control}
              getOptionLabel={(option: { name: string }) => option.name}
              getOptionValue={(option: { id: string }) => option.id}
              options={storeViewOptions}
            />
            <div
              className="h-[45px] flex items-center pb-1 ml-1 cursor-pointer"
              data-tooltip-id="actions-selectors"
              data-tooltip-content={'Select your store view'}
            >
              <QuestionMark width="20" height="20" />
            </div>
          </div>
        </div>
        {/* ------------ */}
        {href && (
          <LinkButton
            href={href}
            onClick={onClick}
            className="h-[45px] ms-4 md:ms-6"
          >
            <div className="w-full flex items-center justify-center">
              <div className="hidden md:flex items-center justify-center">
                {RenderIcon ? (
                  <RenderIcon />
                ) : (
                  <Add width="1rem" height="1rem" />
                )}
                <span className="m-1">{label}</span>
              </div>
              <div className="md:hidden flex items-center justify-center">
                {RenderIcon ? (
                  <RenderIcon />
                ) : (
                  <Add width="1rem" height="1rem" />
                )}
                <span className="m-1">{t('form:button-label-add')}</span>
              </div>
            </div>
          </LinkButton>
        )}
      </div>
    </>
  );
};

export default PageMainAction;
