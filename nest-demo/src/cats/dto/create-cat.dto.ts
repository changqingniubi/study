import { z } from 'zod';
import { IsString, IsInt } from 'class-validator';

export const createCatSchema = z
  .object({
    name: z.string(),
    age: z.number(),
    breed: z.string(),
  })
  .required();

export type CreateCatDto2 = z.infer<typeof createCatSchema>;

export class CreateCatDto {
  @IsString()
  name: string;

  @IsString()
  age: string;

  @IsString()
  breed: string;
}
