import { useRouter } from 'next/router';
const localeRTLList = ['ar', 'he'];
export function useIsRTL() {
  const { locale } = useRouter();
  if (locale && localeRTLList.includes(locale)) {
    return { isRTL: true, alignLeft: 'right', alignRight: 'left' };
  }
  return { isRTL: false, alignLeft: 'left', alignRight: 'right' };
}
// const alignLeft =
// router.locale === 'ar' || router.locale === 'he' ? 'right' : 'left';
// const alignRight =
// router.locale === 'ar' || router.locale === 'he' ? 'left' : 'right';
