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
