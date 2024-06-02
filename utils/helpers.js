export function calculateAverageRating(rating) {
    let totalRating = 0;
    for (const ratingObj of rating) {
        totalRating += ratingObj.rating;
    }

    const avgRating = totalRating / rating.length;
    return avgRating;

}