export const RenderTooltipTaxName = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="text-md m-1 max-w-[300px] leading-snug text-white">
        Enter a general name that describes the type of tax applied to orders on
        your store. This will be shown to your customers when tax is displayed
        in your store during the checkout process or on manual orders when taxes
        are shown as one summarized line item. Some suggested names include:
        Tax, Sales Tax, or GST.
      </div>
    </div>
  );
};
