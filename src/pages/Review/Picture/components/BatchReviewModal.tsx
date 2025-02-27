import { message } from 'antd';
import {
  ModalForm,
  ProColumns,
  ProForm,
  ProFormSelect,
  ProFormTextArea,
} from '@ant-design/pro-components';
import React from 'react';
import { doPictureReviewByBatchUsingPost } from '@/services/excuse-backend/pictureController';
import { REVIEW_STATUS_ENUM, REVIEW_STATUS_MAP } from '@/constants/ReviewStatusEnum';

interface ReviewModalProps {
  visible: boolean;
  onCancel?: () => void;
  columns: ProColumns<API.Picture>[];
  selectedRowKeys: any[];
  onSubmit: (values: API.PictureReviewRequest) => Promise<void>;
}

/**
 * 批量审核弹窗
 * @param props
 * @constructor
 */
const BatchReviewModal: React.FC<ReviewModalProps> = (props) => {
  const { visible, onCancel, selectedRowKeys, onSubmit } = props;
  const [form] = ProForm.useForm();
  return (
    <ModalForm
      title={'批量审核证书信息'}
      open={visible}
      form={form}
      onFinish={async (values: API.PictureReviewRequest) => {
        try {
          const success = await doPictureReviewByBatchUsingPost({
            ...values,
            idList: selectedRowKeys,
          });
          if (success.code === 0 && success.data) {
            onSubmit?.(values);
            message.success('审核信息已更新');
          } else {
            message.error(`审核失败`);
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
      <ProFormSelect
        name={'reviewStatus'}
        label={'审核状态'}
        options={[
          {
            label: REVIEW_STATUS_MAP[REVIEW_STATUS_ENUM.REVIEWING].text,
            value: REVIEW_STATUS_ENUM.REVIEWING,
          },
          {
            label: REVIEW_STATUS_MAP[REVIEW_STATUS_ENUM.PASS].text,
            value: REVIEW_STATUS_ENUM.PASS,
          },
          {
            label: REVIEW_STATUS_MAP[REVIEW_STATUS_ENUM.REJECT].text,
            value: REVIEW_STATUS_ENUM.REJECT,
          },
        ]}
      />
      <ProFormTextArea name={'reviewMessage'} label={'审核信息'} />
    </ModalForm>
  );
};

export default BatchReviewModal;
