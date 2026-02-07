import { mockResources } from '../data/mockResources.js';

/**
 * Calculate simple distance between two points (simplified for prototype)
 */
function calculateDistance(loc1, loc2) {
    const R = 6371; // Earth's radius in km
    const dLat = (loc2.lat - loc1.lat) * Math.PI / 180;
    const dLon = (loc2.lng - loc1.lng) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(loc1.lat * Math.PI / 180) * Math.cos(loc2.lat * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

/**
 * Simple location geocoding for known landmarks (prototype version)
 */
function geocodeLocation(locationString) {
    const locationMap = {
        'temple road': { lat: 9.4950, lng: 76.3320 },
        'alappuzha': { lat: 9.4981, lng: 76.3388 },
        'alleppey': { lat: 9.4981, lng: 76.3388 },
        'kuttanad': { lat: 9.4500, lng: 76.4000 },
        'cherthala': { lat: 9.6845, lng: 76.3362 },
        'ambalappuzha': { lat: 9.3700, lng: 76.3600 },
        'beach road': { lat: 9.5010, lng: 76.3400 },
        'default': { lat: 9.4981, lng: 76.3388 } // Alappuzha center
    };

    const normalized = locationString.toLowerCase();

    for (const [key, coords] of Object.entries(locationMap)) {
        if (normalized.includes(key)) {
            return coords;
        }
    }

    return locationMap.default;
}

/**
 * Match the best resource for the distress request
 */
export function findBestResource(analysis) {
    const { need, location, urgencyScore } = analysis;

    // Get coordinates for the distress location
    const distressCoords = geocodeLocation(location);

    // Filter resources by need type
    let relevantResources = mockResources.filter(resource => resource.type === need);

    // If no exact match, fall back to all resources
    if (relevantResources.length === 0) {
        relevantResources = mockResources;
    }

    // Calculate distances and rank resources
    const rankedResources = relevantResources.map(resource => {
        const distance = calculateDistance(distressCoords, resource.coordinates);
        const availabilityScore = resource.currentAvailability / resource.capacity;

        // Scoring algorithm
        let score = 0;

        // Distance factor (closer is better)
        score += Math.max(0, 100 - (distance * 5));

        // Availability factor
        if (resource.availabilityStatus === 'available') {
            score += 50;
        } else if (resource.availabilityStatus === 'limited') {
            score += 20;
        }

        // Capacity factor
        score += availabilityScore * 30;

        // For critical cases, prioritize medical and rescue
        if (urgencyScore >= 75) {
            if (resource.type === 'medical' || resource.type === 'rescue') {
                score += 40;
            }
        }

        return {
            ...resource,
            distance: distance.toFixed(1),
            matchScore: score
        };
    });

    // Sort by match score (highest first)
    rankedResources.sort((a, b) => b.matchScore - a.matchScore);

    // Return the best match
    const bestMatch = rankedResources[0];

    if (!bestMatch) {
        return {
            name: 'No resources available',
            type: 'unknown',
            location: 'N/A',
            distance: 'N/A',
            eta: 'N/A',
            availabilityStatus: 'unavailable',
            contact: 'Emergency hotline: 112',
            message: 'Please contact emergency services directly'
        };
    }

    // Calculate ETA based on distance (simplified: 3 km per 10 mins)
    const distanceNum = parseFloat(bestMatch.distance);
    const etaMins = Math.ceil((distanceNum / 3) * 10);

    return {
        id: bestMatch.id,
        name: bestMatch.name,
        type: bestMatch.type,
        subtype: bestMatch.subtype,
        location: bestMatch.location,
        distance: `${bestMatch.distance} km`,
        eta: `${etaMins} mins`,
        availabilityStatus: bestMatch.availabilityStatus,
        capacity: bestMatch.capacity,
        currentAvailability: bestMatch.currentAvailability,
        contact: bestMatch.contact,
        matchScore: Math.round(bestMatch.matchScore)
    };
}
