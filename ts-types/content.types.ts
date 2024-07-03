import { Scalars } from './custom.types';

export interface PromoBannerType {
  id?: Scalars['Int'];
  animationSpeed: { value: number; name: string };
  delaySpeed: { value: number; name: string };
  backgroundColor: string;
  direction: 'horizontal' | 'vertical';
  slidesPerView: number;
  langDirection: { value: 'LTR' | 'RTL' };
  loop?: Scalars['Boolean'];
  draggable?: Scalars['Boolean'];
  items?: {
    content: string;
    position?: Scalars['Int'];
  }[];
}
