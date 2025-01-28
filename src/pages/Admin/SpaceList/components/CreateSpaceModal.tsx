import { ModalForm, ProForm, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { message, Select } from 'antd';
import React from 'react';
import { addSpaceUsingPost } from '@/services/excuse-backend/spaceController';
import { SPACE_LEVEL_ENUM, SPACE_LEVEL_MAP } from '@/constants/SpaceLevelEnum';

interface CreateProps {
  onCancel: () => void;
  onSubmit: (values: API.SpaceAddRequest) => Promise<void>;
  visible: boolean;
}

/**
 * 添加节点
 *
 * @param fields
 */
const handleAdd = async (fields: API.SpaceAddRequest) => {
  const hide = message.loading('正在添加');
  try {
    const res = await addSpaceUsingPost({
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
const CreateSpaceModal: React.FC<CreateProps> = (props) => {
  const { visible, onSubmit, onCancel } = props;
  const [form] = ProForm.useForm<API.SpaceAddRequest>();
  return (
    <ModalForm
      title={'新建空间'}
      open={visible}
      form={form}
      onFinish={async (values: API.SpaceAddRequest) => {
        const success = await handleAdd({
          ...values,
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
          submitText: '新建空间',
        },
      }}
    >
      <ProFormText name={'spaceName'} label={'空间名'} />
      <ProFormSelect name={'spaceLevel'} label={'空间等级'} valueEnum={SPACE_LEVEL_MAP}>
        <Select>
          <Select.Option value={SPACE_LEVEL_ENUM.COMMON}>
            {SPACE_LEVEL_MAP[SPACE_LEVEL_ENUM.COMMON].text}
          </Select.Option>
          <Select.Option value={SPACE_LEVEL_ENUM.PROFESSIONAL}>
            {SPACE_LEVEL_MAP[SPACE_LEVEL_ENUM.PROFESSIONAL].text}
          </Select.Option>
          <Select.Option value={SPACE_LEVEL_ENUM.FLAGSHIP}>
            {SPACE_LEVEL_MAP[SPACE_LEVEL_ENUM.FLAGSHIP].text}
          </Select.Option>
        </Select>
      </ProFormSelect>
    </ModalForm>
  );
};
export default CreateSpaceModal;
