import styles from "./badge.module.css";

type ProgressBadgeProps = {
  progress: number;
};

const getTier = (progress: number) => {
  if (progress >= 100) return "master";
  if (progress >= 75) return "gold";
  if (progress >= 50) return "silver";
  if (progress >= 25) return "bronze";
  return "none";
};

const getLabel = (progress: number) => {
  if (progress >= 100) return "MASTER BADGE";
  if (progress >= 75) return "GOLD BADGE";
  if (progress >= 50) return "SILVER BADGE";
  if (progress >= 25) return "BRONZE BADGE";
  return "NO BADGE";
};

const getFlavor = (progress: number) => {
  if (progress >= 100) return "Complete dominance";
  if (progress >= 75) return "Elite challenger";
  if (progress >= 50) return "Halfway awakened";
  if (progress >= 25) return "First breakthrough";
  return "Training in progress";
};

export default function ProgressBadge({ progress }: ProgressBadgeProps) {
  if (progress < 25) return null;

  const tier = getTier(progress);
  const label = getLabel(progress);
  const flavor = getFlavor(progress);

  return (
    <section className={styles.wrapper}>
      <div className={styles.header}>
        <p className={styles.heading}>GYM BADGE</p>
        <p className={styles.caption}>{flavor}</p>
      </div>

      <div className={styles.stage}>
        <div className={`${styles.badge} ${styles[tier]}`}>
          <div className={styles.glow} />
          <div className={styles.spark} />
          <div className={styles.sparkSmall} />

          <div className={styles.wingLeft} />
          <div className={styles.wingRight} />

          <div className={styles.body}>
            <div className={styles.innerCut} />
            <div className={styles.coreRing}>
              <div className={styles.core} />
            </div>
            <div className={styles.shine} />
            <div className={styles.bottomShade} />
          </div>

          <div className={styles.spikeTop} />
          <div className={styles.spikeBottom} />
        </div>
      </div>

      <div className={styles.meta}>
        <p className={styles.label}>{label}</p>
        <p className={styles.subLabel}>{progress}% COMPLETE</p>
      </div>
    </section>
  );
}
