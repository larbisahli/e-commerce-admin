import { ROUTES } from '@utils/routes';
import Link from 'next/link';

export const RenderTooltipGoogleTrackId = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="text-md m-1 max-w-[300px] leading-snug text-white">
        When logged in to your Google Analytics account, you will be given
        access to a tracking ID, which should look like this: UA-12345678-1
      </div>
    </div>
  );
};

export const RenderTooltipCurrencies = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="text-md m-1 max-w-[300px] leading-snug text-white">
        Select store currencies where it will be automatically converted with a
        guaranteed rate of 8h.
      </div>
      <div className="text-md m-1 max-w-[300px] leading-snug text-white">
        All the selected currencies will be converted from the system currency
        (USD)
      </div>
    </div>
  );
};

export const RenderTooltipTaxRate = () => {
  return (
    <div>
      <div className="flex flex-col items-center">
        <div className="text-md m-1 max-w-[300px] leading-snug text-white">
          Adjust the applicable VAT rate. A default VAT rate and up to two
          reduced rates are predefined for most countries.
        </div>
        <div className="text-md m-1 max-w-[300px] leading-snug text-white">
          You can check and alter the actual VAT rates or add additional rates
          and country assignments in
        </div>
      </div>
      <Link href={ROUTES.TAX}>
        <a className="font-medium text-blue-400 underline" target="_blank">
          {'Settings ->'}
        </a>
      </Link>
    </div>
  );
};
