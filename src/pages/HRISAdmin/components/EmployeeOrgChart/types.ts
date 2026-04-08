export type EmployeeOrgChartRow = {
  id: number;
  employeeCode: string;
  name: string;
  title: string;
  department: string;
  workType: string;
  location: string;
  status: string;
  email: string;
  manager: string;
};

export type OrgChartNode = {
  id: number;
  parentId: number | null;
  row: EmployeeOrgChartRow;
  children: OrgChartNode[];
};

export type OrgStructureNode = {
  id: string;
  employeeId: number;
  parentNodeId: string | null;
  sortOrder: number;
};
