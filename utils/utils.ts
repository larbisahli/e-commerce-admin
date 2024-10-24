// import { Category } from '@ts-types/generated';
import { isEmpty } from 'lodash';
import React from 'react';

export const POSTS_PER_PAGE = 8;

export const PRODUCTION_ENV = process.env.NODE_ENV === 'production';

// Utils
export const Timer = (time = 1000) => {
  // eslint-disable-next-line no-undef
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(true);
    }, time)
  );
  // Timer().then(() => setLoading(false));
};

Number.prototype.toCommas = function () {
  try {
    return this.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  } catch (error) {
    return this;
  }
};

Number.prototype.secondsToHm = function () {
  const d = Number(this);
  if (d < 60) return `${d} seconds`;
  let h = Math.floor(d / 3600);
  let m = Math.floor((d % 3600) / 60);
  let hDisplay = h > 0 ? h + ' h ' : '';
  let mDisplay = m > 0 ? m + ' min' : '';
  return hDisplay + mDisplay;
};

Number.prototype.formatBytes = function () {
  const decimals = 2;
  const bytes = Number(this);
  if (!bytes) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(+bytes) / Math.log(k));
  return `${parseFloat((+bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
};

export const replace = (array, index: number, replacerIndex: number) => {
  let results = [];
  if (array.length === 1) return array;

  try {
    results = [...array];
    results[index] = array[replacerIndex];
    results[replacerIndex] = array[index];
    return results;
  } catch (error) {
    console.log(`error`, error);
    return array;
  }
};

export const mediaURL = PRODUCTION_ENV
  ? process.env.MEDIA_URL
  : 'http://localhost:5002/media';

export const apiURL = PRODUCTION_ENV
  ? process.env.API_URL
  : 'http://localhost:5002';

// export const mediaURL = 'http://192.168.1.102:5001/media';

// export const apiURL = 'http://192.168.1.102:5001';

// function searchTree(element: Category, matchingId: string) {
//   if (element?.id === matchingId) {
//     return element;
//   } else if (element?.children != null) {
//     let i: number;
//     let result = null;
//     for (i = 0; result == null && i < element.children.length; i++) {
//       result = searchTree(element.children[i], matchingId);
//     }
//     return result;
//   }
//   return null;
// }

// function ancestorSearch(element: Category[], matchingId: string) {
//   return element?.find((ele) => {
//     if (ele?.id === matchingId) {
//       return true;
//     } else if (ele?.children != null) {
//       let i;
//       let result = null;
//       for (i = 0; result == null && i < ele.children.length; i++) {
//         result = searchTree(ele.children[i], matchingId);
//       }
//       return result;
//     }
//     return null;
//   });
// }

// function appendChild(element: Category, matchingId: string, child: Category[]) {
//   if (element?.id === matchingId) {
//     return { ...element, children: [...(element?.children ?? []), ...child] };
//   } else {
//     return {
//       ...element,
//       children: element?.children?.map((ele) => {
//         if (ele?.id === matchingId) {
//           ele.children = [...(ele.children ?? []), ...child];
//         } else if (ele?.children != null) {
//           ele.children = ele.children?.map((child_ele) => {
//             return appendChild(child_ele, matchingId, child);
//           });
//         }
//         return ele;
//       })
//     };
//   }
// }

// // TODO UNIT TEST
// export const appendChildCategory = (
//   categories: Category[],
//   id: string,
//   child: Category[]
// ) => {
//   try {
//     const children = ancestorSearch(categories, id);
//     const results = appendChild(children, id, child);
//     return categories?.map((category) => {
//       if (category?.id === results?.id) {
//         return results;
//       }
//       return category;
//     });
//   } catch (error) {
//     // INFO Log to sentry
//     return categories;
//   }
// };

export function pgFormatDate(date) {
  return new Date(new Date(date))
    .toISOString()
    .replace('T', ' ')
    .replace('Z', '');
}

/** Make sure text inside span <div onClick><span></span></div>*/
export const CopyToClipboard = (
  e: React.MouseEvent<HTMLElement>,
  callback: any
) => {
  try {
    const target = e.target as HTMLElement;

    const el = document.createElement('textarea');
    el.style.position = 'fixed';
    el.style.bottom = '-100px';
    el.value = (
      target?.firstElementChild?.innerHTML || target?.innerHTML
    )?.replace('&amp;', '&');

    document.body.appendChild(el);
    el.select();
    navigator?.clipboard
      .writeText(el.value)
      .then(callback(el.value), function (err) {
        console.error('Async: Could not copy text: ', err);
      });
    document.body.removeChild(el);
  } catch (err) {
    console.log('CopyToClipboard', err);
  }
};

// const WhoChange = reduce(initialValues?.productShippingInfo, function(result, value, key) {
//   return isEqual(value, productShippingInfo[key]) ?
//       result : result.concat(key);
// }, []);

export const translationFallback = (
  initialValues: any,
  key: string,
  placeholder
) => {
  try {
    if (
      !isEmpty(initialValues) &&
      key in initialValues &&
      !isEmpty(initialValues?.translated) &&
      key in initialValues.translated
    ) {
      return (
        initialValues[key] ?? initialValues?.translated[key] ?? placeholder
      );
    }
  } catch (err) {
    console.log('translationFallback ::>', err);
  }
  return placeholder;
};

/**
 * Desc: get value from object/array if path/key exists
 * @param {Object} object/array in which find the path/key
 * @param {String} path/key, has to find in object/array
 * @param {any} default value if path/key not present
 * @return {any} return the value if path/key matches else default value if present else undefined
 * */
export const resolvePath = (obj: any, path: string, defaultValue: any) =>
  (path || '')
    .split('.')
    .reduce(
      (o, p) => (o && o[p] !== undefined ? o[p] : defaultValue),
      obj || {}
    );

export const getBuilderSrc = (
  alias: string,
  path?: string,
  maintenancePassword?: number
) => {
  if (maintenancePassword) {
    return PRODUCTION_ENV
      ? `https://${alias}.dropgala.shop/maintenance/${maintenancePassword}`
      : `http://localhost:3000/maintenance/${maintenancePassword}`;
  }
  const pathname = path === 'home-page' ? '' : path ?? '';
  return PRODUCTION_ENV
    ? `https://${alias}.dropgala.shop/${pathname}`
    : `http://localhost:3000/${pathname}`;
};
