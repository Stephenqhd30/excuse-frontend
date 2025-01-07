import { message } from 'antd';
import { ModalForm, ProForm, ProFormRadio, ProFormText } from '@ant-design/pro-components';
import React from 'react';
import { updateTagByBatchUsingPost } from '@/services/excuse-backend/tagController';
import { tagStatus, TagStatusEnum } from '@/enums/TagStatusEnum';

interface Props {
  visible: boolean;
  onCancel?: () => void;
  selectedRowKeys: any[];
  onSubmit: (values: API.TagAddRequest) => Promise<void>;
}

/**
 * 批量处理模态框
 * @param props
 * @constructor
 */
const BatchTagModal: React.FC<Props> = (props) => {
  const { visible, onCancel, selectedRowKeys, onSubmit } = props;
  const [form] = ProForm.useForm();
  return (
    <ModalForm
      title={'批量处理'}
      open={visible}
      form={form}
      onFinish={async (values: API.TagAddRequest) => {
        const hide = message.loading('正在处理...');
        try {
          const res = await updateTagByBatchUsingPost({
            ...values,
            idList: selectedRowKeys,
          });
          if (res.code === 0 && res.data) {
            onSubmit?.(values);
            message.success('处理成功');
          } else {
            message.error(`处理失败${res.message}`);
          }
        } catch (error: any) {
          message.error(`处理失败${error.message}`);
          return false;
        } finally {
          hide();
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
          submitText: '确认',
          resetText: '取消',
        },
      }}
    >
      <ProFormRadio.Group
        options={[
          {
            label: tagStatus[TagStatusEnum.IS_PARENT].text,
            value: TagStatusEnum.IS_PARENT,
          },
          {
            label: tagStatus[TagStatusEnum.NOT_IS_PARENT].text,
            value: TagStatusEnum.NOT_IS_PARENT,
          },
        ]}
        label={'是否为父标签'}
        placeholder={'请选择是否为父标签'}
        name={'isParent'}
      />
      <ProFormText label={'父标签名'} placeholder={'请输入父标签名'} name={'tagName'} />
    </ModalForm>
  );
};

export default BatchTagModal;
