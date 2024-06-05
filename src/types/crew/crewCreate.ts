export interface CreateCrew {
  crewName: string;
  category: string;
  tags: string[];
  approvalType: string
  introduction: string;
  rule: Rule;
}

export interface Rule {
  weeklyRun: number;
  distance: number;
}
