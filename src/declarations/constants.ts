export const hasOne = {
  Supplier: ['Business', 'Company', 'Regional', 'Location', 'CompanyType', 'Service'],
  Employee: [
    'Supplier',
    'Gender',
    'AcademicLevel',
    'Province',
    'City',
    'Position',
    'Arl',
    'RiskLevel',
    'RiskClass'
  ]
}
