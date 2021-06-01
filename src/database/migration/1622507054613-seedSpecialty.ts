import { Specialty } from 'src/specialty/specialty.entity';
import { getRepository, MigrationInterface } from 'typeorm';
import { SpecialtySeed } from '../seed/specialty.seed';

export class seedSpecialty1622507054613 implements MigrationInterface {
  public async up(): Promise<void> {
    await Promise.all(
      SpecialtySeed.map(async (element) => {
        await getRepository(Specialty).save(element);
      }),
    );
  }

  public async down(): Promise<void> {
    // do nothing
  }
}
