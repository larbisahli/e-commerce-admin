import { ROUTES } from '@utils/routes';
import Link from 'next/link';

export const CategoryTooltipContent = () => {
  return (
    <div className="flex flex-col text-gray-800">
      <div className="max-w-[300px] leading-snug">Select categories</div>
      <div className="mt-3 max-w-[200px] text-xs leading-snug text-gray-600">
        Note: If you see N/A it means that the translation is not available
      </div>
      <Link href={ROUTES.CATEGORY}>
        <a className="font-medium text-blue-600 underline" target="_blank">
          See More
        </a>
      </Link>
    </div>
  );
};

export const ManufacturerTooltipContent = () => {
  return (
    <div className="flex flex-col text-gray-800">
      <div className="max-w-[300px] leading-snug">Select Manufacturer</div>
      <div className="mt-3 max-w-[200px] text-xs leading-snug text-gray-600">
        Note: If you see N/A it means that the translation is not available
      </div>
      <Link href={ROUTES.MANUFACTURER}>
        <a className="font-medium text-blue-600 underline" target="_blank">
          See More
        </a>
      </Link>
    </div>
  );
};

export const SuppliersTooltipContent = () => {
  return (
    <div className="flex flex-col text-gray-800">
      <div className="max-w-[300px] leading-snug">Select Supplier</div>
      <div className="max-w-[300px] leading-snug">
        Supplier is only used internally
      </div>
      <div className="mt-3 max-w-[200px] text-xs leading-snug text-gray-600">
        Note: If you see N/A it means that the translation is not available
      </div>
      <Link href={ROUTES.SUPPLIER}>
        <a className="font-medium text-blue-600 underline" target="_blank">
          See More
        </a>
      </Link>
    </div>
  );
};

export const TagTooltipContent = () => {
  return (
    <div className="flex flex-col text-gray-800">
      <div className="max-w-[300px] leading-snug">Select Tags</div>
      <div className="mt-3 max-w-[200px] text-xs leading-snug text-gray-600">
        Note: If you see N/A it means that the translation is not available
      </div>
      <Link href={ROUTES.CATEGORY}>
        <a className="font-medium text-blue-600 underline" target="_blank">
          See More
        </a>
      </Link>
    </div>
  );
};

export const RenderTooltipContent = () => {
  return (
    <div className="flex flex-col items-center">
      <span>Select language for translation</span>
      <span>{`You can create with different languages`}</span>
    </div>
  );
};

export const ProductTypeTooltipContent = () => {
  return (
    <div className="flex flex-col items-center">
      <span>Select product type based on your business needs</span>
    </div>
  );
};
