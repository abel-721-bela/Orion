// Mock resource database for crisis response
export const mockResources = [
  // Medical Resources
  {
    id: 'MED-001',
    name: 'District General Hospital',
    type: 'medical',
    subtype: 'hospital',
    location: 'Alappuzha Medical College Road',
    coordinates: { lat: 9.4981, lng: 76.3388 },
    capacity: 200,
    currentAvailability: 45,
    availabilityStatus: 'available',
    contact: '+91-477-2282200',
    eta: '8 mins',
    distance: '2.3 km'
  },
  {
    id: 'MED-002',
    name: 'Mobile Medical Unit Alpha',
    type: 'medical',
    subtype: 'mobile_clinic',
    location: 'Patrolling Kuttanad Area',
    coordinates: { lat: 9.4871, lng: 76.3288 },
    capacity: 20,
    currentAvailability: 12,
    availabilityStatus: 'available',
    contact: '+91-9876543210',
    eta: '15 mins',
    distance: '4.5 km'
  },
  {
    id: 'MED-003',
    name: 'St. Mary\'s Medical Center',
    type: 'medical',
    subtype: 'hospital',
    location: 'Changanassery',
    coordinates: { lat: 9.4544, lng: 76.5419 },
    capacity: 150,
    currentAvailability: 8,
    availabilityStatus: 'limited',
    contact: '+91-481-2722200',
    eta: '25 mins',
    distance: '18 km'
  },

  // Food Resources
  {
    id: 'FOOD-001',
    name: 'Community Kitchen - Temple Road',
    type: 'food',
    subtype: 'community_kitchen',
    location: 'Temple Road, Alappuzha',
    coordinates: { lat: 9.4950, lng: 76.3320 },
    capacity: 500,
    currentAvailability: 350,
    availabilityStatus: 'available',
    contact: '+91-9876543211',
    eta: '5 mins',
    distance: '1.2 km'
  },
  {
    id: 'FOOD-002',
    name: 'Relief Camp - Government School',
    type: 'food',
    subtype: 'relief_camp',
    location: 'Beach Road School',
    coordinates: { lat: 9.5010, lng: 76.3400 },
    capacity: 800,
    currentAvailability: 600,
    availabilityStatus: 'available',
    contact: '+91-9876543212',
    eta: '12 mins',
    distance: '3.8 km'
  },
  {
    id: 'FOOD-003',
    name: 'NGO Food Distribution Center',
    type: 'food',
    subtype: 'distribution_center',
    location: 'Ambalappuzha',
    coordinates: { lat: 9.3700, lng: 76.3600 },
    capacity: 1000,
    currentAvailability: 200,
    availabilityStatus: 'limited',
    contact: '+91-9876543213',
    eta: '20 mins',
    distance: '14 km'
  },

  // Water Resources
  {
    id: 'WATER-001',
    name: 'Water Tanker Unit 3',
    type: 'water',
    subtype: 'tanker',
    location: 'Cherthala Junction',
    coordinates: { lat: 9.6845, lng: 76.3362 },
    capacity: 5000,
    currentAvailability: 3500,
    availabilityStatus: 'available',
    contact: '+91-9876543214',
    eta: '18 mins',
    distance: '12 km'
  },
  {
    id: 'WATER-002',
    name: 'Municipal Water Distribution Point',
    type: 'water',
    subtype: 'distribution_point',
    location: 'Alappuzha Town Hall',
    coordinates: { lat: 9.4981, lng: 76.3388 },
    capacity: 10000,
    currentAvailability: 7000,
    availabilityStatus: 'available',
    contact: '+91-477-2251234',
    eta: '10 mins',
    distance: '2.5 km'
  },

  // Rescue Resources
  {
    id: 'RESCUE-001',
    name: 'Boat Team Alpha',
    type: 'rescue',
    subtype: 'boat',
    location: 'Vembanad Lake Base',
    coordinates: { lat: 9.5100, lng: 76.3500 },
    capacity: 8,
    currentAvailability: 8,
    availabilityStatus: 'available',
    contact: '+91-9876543215',
    eta: '22 mins',
    distance: '6.2 km'
  },
  {
    id: 'RESCUE-002',
    name: 'NDRF Unit Kochi',
    type: 'rescue',
    subtype: 'ndrf_team',
    location: 'Deployed in Kuttanad',
    coordinates: { lat: 9.4500, lng: 76.4000 },
    capacity: 15,
    currentAvailability: 10,
    availabilityStatus: 'available',
    contact: '+91-9876543216',
    eta: '35 mins',
    distance: '22 km'
  },
  {
    id: 'RESCUE-003',
    name: 'Helicopter Rescue Unit',
    type: 'rescue',
    subtype: 'helicopter',
    location: 'Kochi Naval Base',
    coordinates: { lat: 9.9312, lng: 76.2673 },
    capacity: 6,
    currentAvailability: 2,
    availabilityStatus: 'limited',
    contact: '+91-484-2668100',
    eta: '45 mins',
    distance: '65 km'
  },

  // Shelter Resources
  {
    id: 'SHELTER-001',
    name: 'Emergency Shelter - Community Center',
    type: 'shelter',
    subtype: 'community_center',
    location: 'Alappuzha Municipal Hall',
    coordinates: { lat: 9.4981, lng: 76.3388 },
    capacity: 300,
    currentAvailability: 150,
    availabilityStatus: 'available',
    contact: '+91-477-2253000',
    eta: '7 mins',
    distance: '1.8 km'
  },
  {
    id: 'SHELTER-002',
    name: 'Relief Camp - High School',
    type: 'shelter',
    subtype: 'school',
    location: 'Government High School, Cherthala',
    coordinates: { lat: 9.6845, lng: 76.3362 },
    capacity: 500,
    currentAvailability: 80,
    availabilityStatus: 'limited',
    contact: '+91-9876543217',
    eta: '15 mins',
    distance: '11 km'
  }
];
