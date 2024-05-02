export const RenderTooltipCurrency = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="text-md m-1 max-w-[300px] leading-snug text-white">
        Select your system currency. You can also opt for multiple currencies
        for your store in the settings.
      </div>
    </div>
  );
};

export const RenderTooltipLanguage = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="text-md m-1 max-w-[300px] leading-snug text-white">
        Select your system language. This will be the default language for your
        product translations. You can also choose multiple languages for your
        store and translate your products accordingly.
      </div>
    </div>
  );
};
