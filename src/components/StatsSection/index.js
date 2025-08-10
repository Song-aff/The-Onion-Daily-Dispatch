import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

// 模拟统计数据
const statsData = [
  {
    number: 99.9,
    suffix: '%',
    label: '虚假度',
    icon: '🎭',
    color: '#ff6b6b'
  },
  {
    number: 1000000,
    suffix: '+',
    label: '被骗读者',
    icon: '😵',
    color: '#feca57'
  },
  {
    number: 5000,
    suffix: '+',
    label: '荒诞新闻',
    icon: '📰',
    color: '#48dbfb'
  },
  {
    number: 365,
    suffix: '天',
    label: '全年无休',
    icon: '⏰',
    color: '#ff9ff3'
  }
];

function AnimatedNumber({ number, suffix }) {
  const [currentNumber, setCurrentNumber] = useState(0);

  useEffect(() => {
    const duration = 2000; // 2秒动画
    const steps = 60; // 60帧
    const increment = number / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= number) {
        setCurrentNumber(number);
        clearInterval(timer);
      } else {
        setCurrentNumber(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [number]);

  return (
    <span>
      {currentNumber.toLocaleString()}{suffix}
    </span>
  );
}

function StatItem({ number, suffix, label, icon, color }) {
  return (
    <div className={styles.statItem}>
      <div className={styles.statIcon} style={{ color }}>
        {icon}
      </div>
      <div className={styles.statNumber} style={{ color }}>
        <AnimatedNumber number={number} suffix={suffix} />
      </div>
      <div className={styles.statLabel}>
        {label}
      </div>
    </div>
  );
}

function RandomJoke() {
  const jokes = [
    "💡 今日冷知识：洋葱会让人流眼泪，洋葱新闻会让人笑出眼泪！",
    "🎯 温馨提示：本站新闻均为虚构，如有雷同，纯属巧合！",
    "🤔 哲学思考：如果假新闻都是真的，那真新闻还是真的吗？",
    "📊 数据显示：100%的用户在看完我们的新闻后都会笑！",
    "🎪 欢迎来到洋葱的世界，这里的每一层都是惊喜！"
  ];

  const [currentJoke, setCurrentJoke] = useState(jokes[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * jokes.length);
      setCurrentJoke(jokes[randomIndex]);
    }, 5000); // 每5秒换一个笑话

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.jokeBox}>
      <div className={styles.jokeContent}>
        {currentJoke}
      </div>
    </div>
  );
}

export default function StatsSection() {
  return (
    <section className={styles.statsSection}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <Heading as="h2" className={styles.sectionTitle}>
            📊 洋葱日报的惊人数据
          </Heading>
          <p className={styles.sectionDescription}>
            用数字证明我们的"专业"程度
          </p>
        </div>

        <div className={styles.statsGrid}>
          {statsData.map((stat, index) => (
            <StatItem key={index} {...stat} />
          ))}
        </div>

        <RandomJoke />

        <div className={styles.disclaimerBox}>
          <div className={styles.disclaimerIcon}>⚠️</div>
          <div className={styles.disclaimerContent}>
            <h3>郑重声明</h3>
            <p>
              本网站所有内容均为AI生成的虚构新闻，仅供娱乐。请勿当真，如有不适，请立即停止阅读。
              如果您发现任何内容与现实相符，那一定是现实太过荒诞了！
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
