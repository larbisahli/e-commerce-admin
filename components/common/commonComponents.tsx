import { FormPlaceholder } from '@components/ui/placeholders/Form';
import { FormActionPlaceholder } from '@components/ui/placeholders/FormAction';

export const LanguageDefaultDescInfo = ({ label, isVisible }) => {
  if (!isVisible) {
    return null;
  }
  return (
    <p className="mb-12 text-sm text-gray-600">
      {`"${label}" is displayed in the system language.
         Always maintain new data in the system language (English-US).`}
    </p>
  );
};

export const PageFormPlaceholder = () => {
  return (
    <div>
      <FormActionPlaceholder />
      <FormPlaceholder />
    </div>
  );
};
