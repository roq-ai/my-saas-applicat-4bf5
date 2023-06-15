const mapping: Record<string, string> = {
  companies: 'company',
  'headcount-requests': 'headcount_request',
  roles: 'role',
  stakeholders: 'stakeholder',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
