import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: '100% Fact-Free',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
      The Onion Daily Dispatch is scientifically engineered to contain zero
        facts, so you can binge satire without ever risking an accidental truth.
      </>
    ),
  },
  {
    title: 'Instant Outrage Relief',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
   Feeling too calm? One headline and your blood pressure will spike to
        perfectly satirical levels—no prescription required.
      </>
    ),
  },
  {
    title: 'Powered by Tears',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
Every pixel is fueled by reader tears (of laughter or despair). Extend
        your misery simply by scrolling.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
