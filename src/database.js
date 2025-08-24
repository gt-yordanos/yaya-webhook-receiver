// In-memory "set" as a database
// Set data types is selected because it's appropriate to store unique list of items
// This will help us in not processing events from the hook more than once

export const processedEvents = new Set();