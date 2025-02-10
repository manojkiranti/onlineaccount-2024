import styles from './Useful.module.scss';
import { services } from '../constants'; // Update the path to where your constants file is located

export const UsefulPage = () => {
  return (
    <>
      <div className={styles.firstHeading}>
        All your Expat needs under one roof
      </div>
      <div className={styles.servicesBody}>
        {services.map((service, index) => (
          <div key={index} className={styles.servicesContainer}>
            <div className={styles.logo}>
              <img src={service.logo} alt={`Service ${index + 1} Logo`} />
            </div>
            <div className={styles.bodyText}>
              <p>{service.description}</p>
            </div>
            <div className={styles.footer}>
              <a href={service.url}>
                <button>Learn More</button>
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
