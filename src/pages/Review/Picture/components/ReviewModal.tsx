import { message, Select } from 'antd';
import { ModalForm, ProForm, ProFormSelect, ProFormTextArea } from '@ant-design/pro-components';
import React from 'react';
import { doPictureReviewUsingPost } from '@/services/excuse-backend/pictureController';
import {REVIEW_STATUS_ENUM, REVIEW_STATUS_MAP} from '@/constants/ReviewStatusEnum';

interface ReviewModalProps {
  visible: boolean;
  onCancel?: () => void;
  picture: API.Picture;
  onSubmit: (values: API.PictureReviewRequest) => Promise<void>;
}

/**
 * 审核信息模态框
 * @param props
 * @constructor
 */
const ReviewModal: React.FC<ReviewModalProps> = (props) => {
  const { visible, onCancel, picture, onSubmit } = props;
  const [form] = ProForm.useForm();
  return (
    <ModalForm
      title={'审核证书信息'}
      open={visible}
      form={form}
      initialValues={picture}
      onFinish={async (values: API.PictureReviewRequest) => {
        try {
          const success = await doPictureReviewUsingPost({
            ...values,
            id: picture.id,
          });
          if (success.code === 0 && success.data) {
            onSubmit?.(values);
            message.success('审核信息已更新');
          } else {
            message.error('审核失败');
          }
        } catch (error: any) {
          message.error('审核失败' + error.message);
        } finally {
          onCancel?.();
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
          submitText: '审核',
          resetText: '取消',
        },
      }}
    >
      <ProFormSelect name={'reviewStatus'} label={'审核状态'}>
        <Select.Option value={REVIEW_STATUS_ENUM.REVIEWING}>
          {REVIEW_STATUS_MAP[REVIEW_STATUS_ENUM.REVIEWING].text}
        </Select.Option>
        <Select.Option value={REVIEW_STATUS_ENUM.PASS}>
          {REVIEW_STATUS_MAP[REVIEW_STATUS_ENUM.PASS].text}
        </Select.Option>
        <Select.Option value={REVIEW_STATUS_ENUM.REJECT}>
          {REVIEW_STATUS_MAP[REVIEW_STATUS_ENUM.REJECT].text}
        </Select.Option>
      </ProFormSelect>
      <ProFormTextArea name={'reviewMessage'} label={'审核信息'} />
    </ModalForm>
  );
};

export default ReviewModal;
