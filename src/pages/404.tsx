import { useRouter } from 'next/router';
import Button from '@/components/Button';
import { Heading40, Text20 } from '@/components/Typography';
import styles from './404.module.scss';

const Custom404 = () => {
  const router = useRouter();

  const handleGoHome = () => {
    router.push('/');
  };

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.errorCode}>
          <h1 className={styles.code}>404</h1>
        </div>
        <Heading40 className={styles.title}>
          Page Not Found
        </Heading40>
        <Text20 className={styles.description}>
          The page you're looking for doesn't exist or has been moved.
        </Text20>
        <Button
          variant="contained"
          onClick={handleGoHome}
          className={styles.homeButton}
        >
          Go Back Home
        </Button>
      </div>
    </div>
  );
};

export default Custom404;