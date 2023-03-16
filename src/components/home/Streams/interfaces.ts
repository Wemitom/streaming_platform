import { Categories } from '@/utils/constants';

export interface StreamPreviewInterface {
  avatar: string;
  username: string;
  views: number;
  preview: string;
  title?: string;
  categories?: Set<Categories>;
}
