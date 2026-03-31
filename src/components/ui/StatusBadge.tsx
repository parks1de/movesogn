import styles from './StatusBadge.module.css';

interface StatusBadgeProps {
  label: string;
  variant?: 'orange' | 'blue';
  pulse?: boolean;
  className?: string;
}

export default function StatusBadge({
  label,
  variant = 'orange',
  pulse = false,
  className,
}: StatusBadgeProps) {
  return (
    <span className={`${styles.badge} ${styles[variant]} ${className ?? ''}`}>
      {pulse && <span className={styles.dot} aria-hidden="true" />}
      {label}
    </span>
  );
}
