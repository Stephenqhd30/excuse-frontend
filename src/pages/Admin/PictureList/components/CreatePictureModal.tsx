import {
  ModalForm,
  ProForm,
  ProFormText,
  ProFormTextArea,
  ProFormUploadDragger,
} from '@ant-design/pro-components';
import { message, UploadProps } from 'antd';
import React, { useState } from 'react';
import { FileUploadBiz } from '@/enums/FileUploadBizEnum';
import {
  updatePictureUsingPost,
  uploadPictureUsingPost,
} from '@/services/excuse-backend/pictureController';

interface Props {
  onCancel: () => void;
  onSubmit: (values: API.PictureAddRequest) => Promise<void>;
  visible: boolean;
}

/**
 * 添加节点
 *
 * @param fields
 */
const handleAdd = async (fields: API.PictureUpdateRequest) => {
  const hide = message.loading('正在添加');
  try {
    const res = await updatePictureUsingPost({
      ...fields,
    });
    if (res.code === 0 && res.data) {
      message.success('添加成功');
      return true;
    } else {
      message.error(`添加失败${res.message}, 请重试!`);
      return false;
    }
  } catch (error: any) {
    message.error(`添加失败${error.message}, 请重试!`);
    return false;
  } finally {
    hide();
  }
};



/**
 * 常见弹窗
 * @param props
 * @constructor
 */
const CreatePictureModal: React.FC<Props> = (props) => {
  const { visible, onSubmit, onCancel } = props;
  // 图片信息
  const [pictureInfo, setPictureInfo] = useState<API.PictureVO>();
  const [form] = ProForm.useForm<API.PictureAddRequest>();
  /**
   * 图片更新头像
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
          },
          {
            file: file,
          },
          file,
        );
        if (res.code === 0 && res.data) {
          onSuccess(res.data);
          setPictureInfo(res.data);
        } else {
          onError(new Error(res.message));
          message.error(`文件上传失败${res.message}`);
        }
      } catch (error: any) {
        onError(error);
        message.error('文件上传失败', error.message);
      }
    },
    onRemove() {
      setPictureInfo(undefined);
    },
  };



  return (
    <ModalForm<API.PictureAddRequest>
      title={'新建图片'}
      open={visible}
      form={form}
      onFinish={async (values: API.PictureUpdateRequest) => {
        const success = await handleAdd({
          ...values,
          id: pictureInfo?.id,
        });
        if (success) {
          onSubmit?.(values);
        }
      }}
      modalProps={{
        destroyOnClose: true,
        onCancel: () => {
          onCancel?.();
        },
      }}
      submitter={{
        searchConfig: {
          submitText: '新建图片',
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
export default CreatePictureModal;
