import Button from '@components/ui/button';
import { useTranslation } from 'next-i18next';

const UpSellProducts = () => {
  const { t } = useTranslation();

  return (
    <div className="flex items-end justify-between">
      <div className="">
        <span className="font-medium text-base">Up-Sell Products</span>
        <p className="text-sm text-body max-w-[75%]">
          An up-sell item is offered to the customer as a pricier or
          higher-quality alternative to the product the customer is looking at.
        </p>
      </div>
      <div className="ml-2">
        <Button loading={false} disabled={false} size="small" className="w-max">
          <div>Add Up-Sell Products</div>
        </Button>
      </div>
    </div>
  );
};

export default UpSellProducts;
