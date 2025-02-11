import { memo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhoneVolume,
  faFilePen,
  faVideo,
  faUserGear,
} from "@fortawesome/pro-light-svg-icons";
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import useToken from "antd/es/theme/useToken";

import styles from "../scss/quicklinks.module.scss";
import { Button, Card, Col, Modal, Row } from "antd";
import { InputField } from "@/components/Form";

export const resumeFormSchema = yup.object().shape({
  referenceNumber: yup
    .string()
    .required('Reference number is required.')
});
export type ResumeFormType = yup.InferType<typeof resumeFormSchema>;

const QuickLinks = memo(() => {
  const token = useToken();
  const [openResumeApplicationModal, setOpenResumeApplicationModal] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ResumeFormType>({
    defaultValues: {},
    resolver: yupResolver(resumeFormSchema),
  });

  const handleResumeApplication = () => {
    setOpenResumeApplicationModal(true);
  };
  const onSubmit = (data: ResumeFormType) => {
  }
  return (
    <>
      <div className={styles["aside-menu"]}>
        <ul>
          <li onClick={handleResumeApplication}>
            <span className={styles["aside-icon"]}>
              <FontAwesomeIcon icon={faFilePen} />
            </span>
            <span className={styles["aside-title"]} >Resume Application</span>
          </li>
          <li>
            <a className={styles["aside-icon"]} href="tel:01-5111183">
              <FontAwesomeIcon icon={faPhoneVolume} />
            </a>
            <span className={styles["aside-title"]}>Support</span>
          </li>
          <li>
            <a className={styles["aside-icon"]} href="tel:01-5111183">
              <FontAwesomeIcon icon={faVideo} />
            </a>
            <span className={styles["aside-title"]}>Update KYC</span>
          </li>
          <li>
            <span className={styles["aside-icon"]}>
              <FontAwesomeIcon icon={faUserGear} />
            </span>
            <span className={styles["aside-title"]}>Repair Account</span>
          </li>
        </ul>
      </div>
      <Modal  title="Enter your reference number to resume application" open={openResumeApplicationModal}  footer={null} onCancel={() => setOpenResumeApplicationModal(false)} >
          <Card>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Row gutter={30}>
                      <Col xs={24} md={24}>
                        <InputField
                          label="Reference Number"
                          name="referenceNumber"
                          control={control}
                          error={errors.referenceNumber?.message ?? ""}
                          placeholder="Enter your reference number"
                          size="large"
                          required={true}
                        />
                      </Col>
                      <Col xs={24} md={24}>
                        <Button size="large" htmlType="submit" type="primary" style={{width:"100%"}}>Submit</Button>
                      </Col>
                  </Row>
            </form>
          </Card>
      </Modal>
    </>
  );
});

export default QuickLinks;
