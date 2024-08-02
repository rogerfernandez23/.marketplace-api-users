import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'customAge', async: false })
export class AgeValidate implements ValidatorConstraintInterface {
  validate(birth: Date): boolean {
    birth: new Date(birth);
    const minAge = 17;

    return this.ageCauculate(birth) > minAge ? true : false;
  }

  defaultMessage(): string {
    return 'Minimum age is 18 years old';
  }

  private ageCauculate(birth: Date): number {
    const today = new Date(Date.now());
    const birthDate = new Date(birth);

    const comparison = Math.abs(today.getTime() - birthDate.getTime());

    const yearsComparison = Math.floor(
      comparison / (1000 * 60 * 60 * 24 * 365),
    );

    return yearsComparison;
  }
}
