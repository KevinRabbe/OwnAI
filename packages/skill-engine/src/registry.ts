import type {
  SkillDefinition,
  SkillRegistryEntry
} from './types.js';

export class SkillRegistry {
  private skills = new Map<string, SkillDefinition>();

  register(skill: SkillDefinition): void {
    this.skills.set(skill.id, skill);
  }

  get(skillId: string): SkillDefinition | undefined {
    return this.skills.get(skillId);
  }

  list(): SkillRegistryEntry[] {
    return [...this.skills.values()].map(skill => ({
      id: skill.id,
      name: skill.name,
      category: skill.category,
      description: skill.description,
      requiredSystems: skill.requiredSystems,
      allowedTools: skill.allowedTools
    }));
  }
}
