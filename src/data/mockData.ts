export type Customer = {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  totalSpent: number;
  status: 'Active' | 'Inactive';
};

export type JobStatus = 'Pending' | 'Scheduled' | 'In Progress' | 'Completed' | 'Cancelled';
export type ServiceType = 'Plumbing' | 'HVAC' | 'Maintenance' | 'Emergency';

export type Job = {
  id: string;
  customerId: string;
  title: string;
  description: string;
  status: JobStatus;
  serviceType: ServiceType;
  scheduledDate: string;
  assignedTech: string;
  price: number;
};

export const MOCK_CUSTOMERS: Customer[] = [
  { id: 'c1', name: 'Sarah Jenkins', email: 'sarah.j@example.com', phone: '(949) 555-0198', address: '456 Newport Blvd, Costa Mesa, CA', totalSpent: 1250, status: 'Active' },
  { id: 'c2', name: 'Michael Chen', email: 'mchen88@example.com', phone: '(657) 555-0234', address: '789 Harbor Blvd, Costa Mesa, CA', totalSpent: 450, status: 'Active' },
  { id: 'c3', name: 'Emily Rodriguez', email: 'emily.r@example.com', phone: '(714) 555-0912', address: '123 Victoria St, Costa Mesa, CA', totalSpent: 3200, status: 'Active' },
  { id: 'c4', name: 'David Thompson', email: 'dthompson@example.com', phone: '(949) 555-0456', address: '890 Placentia Ave, Costa Mesa, CA', totalSpent: 0, status: 'Inactive' },
  { id: 'c5', name: 'Lisa Wong', email: 'lwong.design@example.com', phone: '(657) 555-0789', address: '345 17th St, Costa Mesa, CA', totalSpent: 850, status: 'Active' },
];

export const MOCK_JOBS: Job[] = [
  { id: 'j1', customerId: 'c1', title: 'Water Heater Replacement', description: 'Replace old 40-gallon tank with new tankless system.', status: 'Completed', serviceType: 'Plumbing', scheduledDate: '2026-03-25T09:00:00Z', assignedTech: 'Mike R.', price: 1250 },
  { id: 'j2', customerId: 'c2', title: 'AC Tune-Up', description: 'Annual maintenance and filter replacement.', status: 'Scheduled', serviceType: 'HVAC', scheduledDate: '2026-03-29T14:00:00Z', assignedTech: 'Sarah T.', price: 150 },
  { id: 'j3', customerId: 'c3', title: 'Sewer Line Inspection', description: 'Camera inspection of main sewer line due to backups.', status: 'In Progress', serviceType: 'Plumbing', scheduledDate: '2026-03-28T10:30:00Z', assignedTech: 'John D.', price: 299 },
  { id: 'j4', customerId: 'c5', title: 'Clogged Drain Repair', description: 'Kitchen sink draining slowly.', status: 'Pending', serviceType: 'Plumbing', scheduledDate: '2026-03-30T08:00:00Z', assignedTech: 'Unassigned', price: 185 },
  { id: 'j5', customerId: 'c1', title: 'Furnace Repair', description: 'Heating not turning on.', status: 'Scheduled', serviceType: 'HVAC', scheduledDate: '2026-03-31T13:00:00Z', assignedTech: 'Sarah T.', price: 450 },
];

export const REVENUE_DATA = [
  { name: 'Oct', revenue: 42000 },
  { name: 'Nov', revenue: 38000 },
  { name: 'Dec', revenue: 51000 },
  { name: 'Jan', revenue: 48000 },
  { name: 'Feb', revenue: 55000 },
  { name: 'Mar', revenue: 62000 },
];
