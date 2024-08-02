export class CreateAddressDto {
  street: string;
  numberHouse: number;
  city: string;
  state: string;
  postalCode: string;
  complement?: string;
  additionalInfo?: string;
}
