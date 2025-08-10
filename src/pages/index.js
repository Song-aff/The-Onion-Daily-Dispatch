// AIGC START
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import StatsSection from '@site/src/components/StatsSection';

import Heading from '@theme/Heading';
import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className={styles.heroBackground}></div>
      <div className="container">
        <div className={styles.heroContent}>
          <div className={styles.heroLogo}>🧅</div>
          <Heading as="h1" className={styles.heroTitle}>
            洋葱日报
          </Heading>
          <Heading as="h2" className={styles.heroSubtitle}>
            The Onion Daily Dispatch
          </Heading>
          <p className={styles.heroTagline}>
            <span className={styles.taglineHighlight}>100% 虚构</span> · 
            <span className={styles.taglineHighlight}>0% 真实</span> · 
            <span className={styles.taglineHighlight}>∞% 乐趣</span>
          </p>
          <p className={styles.heroDescription}>
            每日为您提供最新最荒诞的假新闻，让您在笑声中远离现实的烦恼
          </p>
          <div className={styles.buttons}>
            <Link
              className={clsx('button', styles.primaryButton)}
              to="/blog">
              <span>🗞️</span>
              阅读今日假新闻
            </Link>
            <Link
              className={clsx('button', styles.secondaryButton)}
              to="/blog">
              <span>🎭</span>
              浏览往期荒诞
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
// AIGC END

// AIGC START  
export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} - 每日荒诞假新闻`}
      description="洋葱日报，为您提供最新最荒诞的假新闻，100%虚构，0%真实，∞%乐趣">
      <HomepageHeader />
      <main>
        <StatsSection />
      </main>
    </Layout>
  );
}
// AIGC END
