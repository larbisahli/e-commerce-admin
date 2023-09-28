import { ROUTES } from '@utils/routes';
import Link from 'next/link';

export const CategoryTooltipContent = () => {
  return (
    <div className="flex flex-col">
      <div className="max-w-[300px] leading-snug">Select categories</div>
      <div className="mt-3 max-w-[200px] text-xs leading-snug">
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
    <div className="flex flex-col">
      <div className="max-w-[300px] leading-snug">Select Manufacturer</div>
      <div className="mt-3 max-w-[200px] text-xs leading-snug">
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
    <div className="flex flex-col">
      <div className="max-w-[300px] leading-snug">Select Supplier</div>
      <div className="max-w-[300px] leading-snug">
        Supplier is only used internally
      </div>
      <div className="mt-3 max-w-[200px] text-xs leading-snug">
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
    <div className="flex flex-col">
      <div className="max-w-[300px] leading-snug">Select Tags</div>
      <div className="mt-3 max-w-[200px] text-xs leading-snug">
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

export const RenderTooltipSlug = () => {
  return (
    <div className="flex flex-col items-center">
      <span>Select language for translation</span>
      <span>{`You can create with different languages`}</span>
    </div>
  );
};

export const RenderTooltipMetaTitle = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="mt-3 max-w-[300px] text-xs leading-snug">
        The meta title is the most important SEO element and should be unique
        for each page. You should limit yourself in length to a maximum of 56
        characters. Your keyword should ideally be placed at the very front.
      </div>
    </div>
  );
};

export const RenderTooltipMetaKeywords = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="mt-3 max-w-[300px] text-xs leading-snug">
        Here you can define optionally three to five keywords under which your
        product should be found.
      </div>
    </div>
  );
};

export const RenderTooltipMetaDescription = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="mt-3 max-w-[300px] text-xs leading-snug">
        With the meta description, you confirm to your customers that they are
        in the right place in your store. You create incentives, build trust and
        invite to an action. You should limit yourself to a maximum of 155
        characters. Dropgala allows a maximum length of 160 characters.
      </div>
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

export const RenderTooltipHiddenNote = () => {
  return (
    <div className="flex flex-col items-center">
      <span>Add your notes here and it's only visible to you</span>
    </div>
  );
};

export const RenderTooltipUpsell = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="mt-3 max-w-[300px] text-xs leading-snug">
        Upsells encourage customers to buy more expensive products instead of
        the ones they are viewing.
      </div>
    </div>
  );
};

export const RenderTooltipCrossSell = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="mt-3 max-w-[300px] text-xs leading-snug">
        Cross-sells are products displayed on the main product page and shopping
        cart to encourage customers to buy more products.
      </div>
    </div>
  );
};

export const RenderTooltipRelated = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="mt-3 max-w-[300px] text-xs leading-snug">
        Related products are meant to be purchased in addition to the item the
        customer is viewing.
      </div>
    </div>
  );
};
