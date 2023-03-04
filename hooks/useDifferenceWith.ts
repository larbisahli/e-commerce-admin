import differenceWith from 'lodash/differenceWith';
import isEqual from 'lodash/isEqual';
import { useMemo } from 'react';

export function useDifferenceWith(
  currentValue: any[] = [],
  initialValue: any[] = [],
  isUpdateMode: boolean
) {
  const mapCurrentValue = useMemo(
    () =>
      isUpdateMode
        ? currentValue?.map(({ id }) => ({ id }))?.sort((a, b) => a.id - b.id)
        : [],
    [currentValue, isUpdateMode]
  );
  const mapInitialValue = useMemo(
    () =>
      isUpdateMode
        ? initialValue?.map(({ id }) => ({ id }))?.sort((a, b) => a.id - b.id)
        : [],
    [initialValue, isUpdateMode]
  );
  const { additions = [], deletions = [] } = useMemo(() => {
    const additions = differenceWith(mapCurrentValue, mapInitialValue, isEqual);
    const deletions = differenceWith(mapInitialValue, mapCurrentValue, isEqual);
    return { additions, deletions };
  }, [mapCurrentValue, mapInitialValue]);

  return { additions, deletions };
}
