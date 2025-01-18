import {
  ModalForm,
  ProForm,
  ProFormText,
  ProFormTextArea,
  ProFormUploadDragger,
} from '@ant-design/pro-components';
import { message, UploadProps } from 'antd';
import React from 'react';
import { FileUploadBiz } from '@/enums/FileUploadBizEnum';
import {
  updatePictureUsingPost,
  uploadPictureUsingPost,
} from '@/services/excuse-backend/pictureController';

interface Props {
  oldData?: API.Picture;
  onCancel: () => void;
  onSubmit: (values: API.PictureUpdateRequest) => Promise<void>;
  visible: boolean;
}

/**
 * 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: API.PictureUpdateRequest) => {
  const hide = message.loading('正在更新');
  try {
    const res = await updatePictureUsingPost(fields);
    if (res.code === 0 && res.data) {
      message.success('更新成功');
      return true;
    } else {
      message.error(`更新失败${res.message}, 请重试!`);
      return false;
    }
  } catch (error: any) {
    message.error(`更新失败${error.message}, 请重试!`);
    return false;
  } finally {
    hide();
  }
};

/**
 * 更新图片 Modal
 * @param props
 * @constructor
 */
const UpdatePictureModal: React.FC<Props> = (props) => {
  const { oldData, visible, onSubmit, onCancel } = props;
  // 图片信息
  const [form] = ProForm.useForm<API.PictureUpdateRequest>();
  /**
   * 上传图片
   */
  const uploadProps: UploadProps = {
    name: 'file',
    multiple: false,
    maxCount: 1,
    customRequest: async (options: any) => {
      const { onSuccess, onError, file } = options;
      try {
        const res = await uploadPictureUsingPost(
          {
            biz: FileUploadBiz.PICTURE,
            id: oldData?.id,
          },
          {
            file: file,
          },
          file,
        );
        if (res.code === 0 && res.data) {
          onSuccess(res.data);
        } else {
          onError(res);
          message.error(`文件上传失败${res.message}`);
        }
      } catch (error: any) {
        onError(error);
        message.error('文件上传失败', error.message);
      }
    },
    onRemove() {
    },
  };

  if (!oldData) {
    return <></>;
  }

  return (
    <ModalForm<API.PictureUpdateRequest>
      title={'更新图片信息'}
      open={visible}
      form={form}
      initialValues={oldData}
      onFinish={async (values: API.PictureUpdateRequest) => {
        const success = await handleUpdate({
          ...values,
          id: oldData?.id,
        });
        if (success) {
          onSubmit?.(values);
        }
      }}
      autoFocusFirstInput
      modalProps={{
        destroyOnClose: true,
        onCancel: () => {
          onCancel?.();
        },
      }}
      submitter={{
        searchConfig: {
          submitText: '更新图片信息',
          resetText: '取消',
        },
      }}
    >
      <ProFormUploadDragger
        title={'上传图片'}
        label={'图片'}
        max={1}
        fieldProps={{
          ...uploadProps,
        }}
        name="pic"
      />
      <ProFormText name={'name'} label={'名称'} />
      <ProFormText name={'category'} label={'分类'} />
      <ProFormTextArea name={'introduction'} label={'简介'} />
    </ModalForm>
  );
};
export default UpdatePictureModal;
