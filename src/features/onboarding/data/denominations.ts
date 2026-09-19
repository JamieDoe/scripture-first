export enum DenominationValue {
  CATHOLIC = 'catholic',
  ORTHODOX = 'orthodox',
  PROTESTANT = 'protestant',
  BAPTIST = 'baptist',
  NON_DENOMINATIONAL = 'non-denominational',
  EXPLORING = 'exploring',
  NOT_SURE = 'not-sure',
}

export type DenominationOption = {
  value: DenominationValue;
  label: string;
};

export const DENOMINATION_OPTIONS: DenominationOption[] = [
  { value: DenominationValue.CATHOLIC, label: 'Catholic' },
  { value: DenominationValue.ORTHODOX, label: 'Orthodox' },
  { value: DenominationValue.PROTESTANT, label: 'Protestant' },
  { value: DenominationValue.BAPTIST, label: 'Baptist' },
  { value: DenominationValue.NON_DENOMINATIONAL, label: 'Non-denominational' },
  { value: DenominationValue.EXPLORING, label: 'Exploring' },
  { value: DenominationValue.NOT_SURE, label: 'Not Sure' },
];
