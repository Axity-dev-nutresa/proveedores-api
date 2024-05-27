export const oneToMany = {
  Supplier: ['Business', 'Company', 'Regional', 'Location', 'CompanyType', 'Service'],
  City: ['Province'],
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
