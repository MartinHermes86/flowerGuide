export default function getWateringStatusColor(nextWatering: Date) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const nextWateringDate = new Date(nextWatering);
    nextWateringDate.setHours(0, 0, 0, 0);
    const dayAfterNextWatering = new Date(nextWateringDate);
    dayAfterNextWatering.setDate(dayAfterNextWatering.getDate() + 1);

    if (nextWateringDate < today) {
        return 'plantCard-overdue';
    } else if (nextWateringDate <= tomorrow) {
        return 'plantCard-soon';
    }
    return 'plantCard-normal';
}
