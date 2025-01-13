import { GameSectionSchema, type GameSection } from '../../types/schema/game.schema';

export class GameValidator {
  static validate(data: unknown): GameSection {
    try {
      return GameSectionSchema.parse(data);
    } catch (error) {
      console.error('Game section validation error:', error);
      throw new Error('Invalid game section data');
    }
  }

  static validatePartial(data: unknown): Partial<GameSection> {
    try {
      return GameSectionSchema.partial().parse(data);
    } catch (error) {
      console.error('Partial game section validation error:', error);
      throw new Error('Invalid partial game section data');
    }
  }
}