export type Plant = {
    id: string,
    name: string,
    species: string,
    description: string,
    lastWatered: Date,
    lastFertilized : Date,
    nextWatering: Date,
    nextFertilizing: Date,
    careInstructions: string,
    soilRequirements: string,
    locationRequirements: string,
    fertilizingInstructions: string,
}