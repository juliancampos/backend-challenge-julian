import { Matches, Length, IsDefined, IsUUID } from 'class-validator';

export class CreatePlaceDto {
  @IsUUID()
  countryId: string;

  @IsDefined({ message: 'Local need be defined' })
  local?: string;

  @Length(7,7, { message: 'Invalid character numbers' })
  @Matches(/^(0[1-9]|1[012])\/(19|20)\d{2}$/, { message: 'Invalid date for meta'})
  meta?: string;
}
