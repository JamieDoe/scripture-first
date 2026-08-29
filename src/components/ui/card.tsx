import { cn } from '@/utils/cn';
import { cva, type VariantProps } from 'class-variance-authority';
import { View, type ViewProps } from 'react-native';

type CardProps = ViewProps &
  VariantProps<typeof cardVariants> & {
    className?: string;
  };

const cardVariants = cva('rounded-card p-5', {
  variants: {
    variant: {
      default: 'bg-card border border-border',
      muted: 'bg-card-sunk',
      elevated: 'bg-card rounded-card-hero shadow-lg',
      ghost: 'bg-transparent',
    },
  },
  defaultVariants: { variant: 'default' },
});

export function Card({ variant, className, children, ...rest }: CardProps) {
  return (
    <View className={cn(cardVariants({ variant }), className)} {...rest}>
      {children}
    </View>
  );
}
