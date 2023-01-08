import Button from '@components/ui/button';
import { useTranslation } from 'next-i18next';

const RelatedProducts = () => {
  const { t } = useTranslation();

  return (
    <div className="flex items-end justify-between">
      <div className="">
        <span className="font-medium text-base">Related Products</span>
        <p className="text-sm text-body max-w-[75%]">
          Related products are shown to customers in addition to the item the
          customer is looking at.
        </p>
      </div>
      <div className="ml-2">
        <Button loading={false} disabled={false} size="small" className="w-max">
          <div>Add Related Products</div>
        </Button>
      </div>
    </div>
  );
};

export default RelatedProducts;
