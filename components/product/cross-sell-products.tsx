import Button from '@components/ui/button';
import { useTranslation } from 'next-i18next';

const CrossSellProducts = () => {
  const { t } = useTranslation();

  return (
    <div className="flex items-end justify-between">
      <div className="">
        <span className="font-medium text-base">Cross-Sell Products</span>
        <p className="text-sm text-body max-w-[75%]">{`These "impulse-buy" products appear next to the shopping cart as cross-sells to the items already in the shopping cart.`}</p>
      </div>
      <div className="ml-2">
        <Button loading={false} disabled={false} size="small" className="w-max">
          <div>Add Cross-Sell Products</div>
        </Button>
      </div>
    </div>
  );
};

export default CrossSellProducts;
