// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** downloadTag GET /api/excel/tag/download */
export async function downloadTagUsingGet(options?: { [key: string]: any }) {
  return request<any>('/api/excel/tag/download', {
    method: 'GET',
    ...(options || {}),
  });
}

/** importTagByExcel POST /api/excel/tag/import */
export async function importTagByExcelUsingPost(
  body: {},
  file?: File,
  options?: { [key: string]: any },
) {
  const formData = new FormData();

  if (file) {
    formData.append('file', file);
  }

  Object.keys(body).forEach((ele) => {
    const item = (body as any)[ele];

    if (item !== undefined && item !== null) {
      if (typeof item === 'object' && !(item instanceof File)) {
        if (item instanceof Array) {
          item.forEach((f) => formData.append(ele, f || ''));
        } else {
          formData.append(ele, JSON.stringify(item));
        }
      } else {
        formData.append(ele, item);
      }
    }
  });

  return request<API.BaseResponseMapStringObject_>('/api/excel/tag/import', {
    method: 'POST',
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}

/** downloadUser GET /api/excel/user/download */
export async function downloadUserUsingGet(options?: { [key: string]: any }) {
  return request<any>('/api/excel/user/download', {
    method: 'GET',
    ...(options || {}),
  });
}

/** importUserByExcel POST /api/excel/user/import */
export async function importUserByExcelUsingPost(
  body: {},
  file?: File,
  options?: { [key: string]: any },
) {
  const formData = new FormData();

  if (file) {
    formData.append('file', file);
  }

  Object.keys(body).forEach((ele) => {
    const item = (body as any)[ele];

    if (item !== undefined && item !== null) {
      if (typeof item === 'object' && !(item instanceof File)) {
        if (item instanceof Array) {
          item.forEach((f) => formData.append(ele, f || ''));
        } else {
          formData.append(ele, JSON.stringify(item));
        }
      } else {
        formData.append(ele, item);
      }
    }
  });

  return request<API.BaseResponseMapStringObject_>('/api/excel/user/import', {
    method: 'POST',
    data: formData,
    requestType: 'form',
    ...(options || {}),
  });
}
