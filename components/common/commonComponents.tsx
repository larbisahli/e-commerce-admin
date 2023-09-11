export const LanguageDefaultDescInfo = ({ label, isVisible }) => {
  if (!isVisible) {
    return null;
  }
  return (
    <p className="mb-12 text-sm text-gray-600">
      {`"${label}" is displayed in the system default language.
         Always maintain new data in your chosen system default language.`}
    </p>
  );
};
