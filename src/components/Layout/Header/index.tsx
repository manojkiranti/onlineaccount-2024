import { Row, Col, Flex } from 'antd';
import { useMenu } from '@/contexts/menuContext';

import { useAppSelector } from '@/hooks/hooks';

import HeaderNavigation from './HeaderNavigation';
import { Container, ProfileDropdown } from '@/components/Elements';

import styles from './Header.module.scss';

const Header = () => {
  const { activeTabs } = useMenu();
  const { userData } = useAppSelector((state) => state.auth);
  return (
    <>
      <header className={styles.headerContainer}>
        <Container fullWidth={true}>
          <Row gutter={30}>
            <Col xs={24} md={12}>
              <div className={styles.subMenuNavigation}>
                {activeTabs && <HeaderNavigation tabItems={activeTabs} />}
              </div>
            </Col>
            <Col xs={24} md={12}>
              <Flex
                justify="flex-end"
                style={{ height: '100%' }}
                align="center"
              >
                <div className={styles.headerMenuItem}>
                  <ProfileDropdown userDetail={userData} />
                </div>
              </Flex>
            </Col>
          </Row>
        </Container>
      </header>
    </>
  );
};

export default Header;
