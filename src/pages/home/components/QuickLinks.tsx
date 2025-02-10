import { memo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhoneVolume,
  faFilePen,
  faVideo,
  faUserGear,
} from "@fortawesome/pro-light-svg-icons";
import useToken from "antd/es/theme/useToken";

import styles from "../scss/quicklinks.module.scss";

const QuickLinks = memo(() => {
  const token = useToken();
  return (
    <div className={styles["aside-menu"]}>
      <ul>
        <li>
          <span className={styles["aside-icon"]}>
            <FontAwesomeIcon icon={faFilePen} />
          </span>
          <span className={styles["aside-title"]}>Resume Application</span>
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
  );
});

export default QuickLinks;
