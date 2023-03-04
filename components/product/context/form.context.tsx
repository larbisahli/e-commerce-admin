import { ProductStatus, ProductType } from '@ts-types/generated';
import {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  useContext,
  useReducer
} from 'react';

import { Actions, ActionType, ProductFormType } from './form.types';
import { formReducer } from './reducer';

export { Actions };

export const initialState: ProductFormType = {
  name: '',
  sku: '',
  salePrice: 0,
  comparePrice: 0,
  buyingPrice: 0,
  quantity: 0,
  description: '',
  type: { id: ProductType.Simple, name: 'Simple' },
  status: ProductStatus.Draft,
  disableOutOfStock: true,
  note: '',
  thumbnail: [],
  gallery: [],
  categories: [],
  suppliers: [],
  tags: [],
  variations: [],
  variationOptions: [],
  productShippingInfo: {
    weight: 0,
    weightUnit: { unit: 'kg' },
    volume: 0,
    volumeUnit: { unit: 'l' },
    dimensionWidth: 0,
    dimensionHeight: 0,
    dimensionDepth: 0,
    dimensionUnit: { unit: 'l' }
  },
  productSeo: {
    slug: '',
    metaTitle: '',
    metaKeywords: '',
    metaDescription: '',
    metaImage: []
  },
  relatedProducts: [],
  upsellProducts: [],
  crossSellProducts: [],
  // extend for update
  isUpdateMode: false
};

const FormContext = createContext<ProductFormType>(initialState);

const ActionContext = createContext<Dispatch<ActionType>>(undefined);

interface Props {
  children: ReactNode;
}

export const FormProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(formReducer, initialState);
  return (
    <FormContext.Provider value={state}>
      <ActionContext.Provider value={dispatch}>
        {children}
      </ActionContext.Provider>
    </FormContext.Provider>
  );
};

export function useFormState() {
  return useContext(FormContext);
}

export function useFormReducer() {
  return useContext(ActionContext);
}
