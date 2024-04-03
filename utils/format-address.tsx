function removeFalsy(obj: any) {
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => Boolean(v)));
}

export function formatAddress(address: any) {
  if (!address) return 'N/A';
  const temp = [
    'addressLine1',
    'city',
    'state',
    'postalCode',
    'country'
  ].reduce((acc, k) => {
    if (k === 'country') {
      return { ...acc, country: address?.country?.name };
    }
    return { ...acc, [k]: (address as any)[k] };
  }, {});
  const formattedAddress = removeFalsy(temp);
  return Object.values(formattedAddress).join(', ');
}
