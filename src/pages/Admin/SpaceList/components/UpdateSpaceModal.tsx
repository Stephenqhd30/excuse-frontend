import { ModalForm, ProForm, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { message, Select } from 'antd';
import React from 'react';
import { updateSpaceUsingPost } from '@/services/excuse-backend/spaceController';
import { SPACE_LEVEL_ENUM, SPACE_LEVEL_MAP } from '@/constants/SpaceLevelEnum';

interface UpdateProps {
  oldData?: API.SpaceVO;
  onCancel: () => void;
  onSubmit: (values: API.SpaceUpdateRequest) => Promise<void>;
  visible: boolean;
}

/**
 * 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: API.SpaceUpdateRequest) => {
  const hide = message.loading('正在更新');
  try {
    const res = await updateSpaceUsingPost(fields);
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
 * 更新空间
 * @param props
 * @constructor
 */
const UpdateSpaceModal: React.FC<UpdateProps> = (props) => {
  const { oldData, visible, onSubmit, onCancel } = props;
  const [form] = ProForm.useForm<API.SpaceAddRequest>();

  if (!oldData) {
    return <></>;
  }

  return (
    <ModalForm<API.SpaceUpdateRequest>
      title={'更新空间信息'}
      open={visible}
      form={form}
      initialValues={oldData}
      onFinish={async (values: API.SpaceUpdateRequest) => {
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
          submitText: '更新空间信息',
          resetText: '取消',
        },
      }}
    >
      <ProFormText name={'spaceName'} label={'空间名'} />
      <ProFormSelect name={'spaceLevel'} label={'空间等级'}>
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
export default UpdateSpaceModal;
