import { useState } from 'react';
import { listTagByTreeUsingGet } from '@/services/excuse-backend/tagController';

/**
 * 获取标签树
 */
export default () => {
  const [tags, setTags] = useState<API.TagDTO[]>([]);

  const loadData = async () => {
    try {
      const res = await listTagByTreeUsingGet();
      if (res.code === 0 && res.data) {
        setTags(res.data);
      } else {
        setTags([]);
      }
    } catch (error: any) {
      setTags([]);
    }
  };

  return {
    tags,
    loadData,
  };
};
