"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveEvent = saveEvent;
const client_1 = require("./generated/prisma/client");
const prisma = new client_1.PrismaClient();
async function saveEvent(eventInfo) {
    try {
        const dates = eventInfo.Date.map(dateStr => new Date(dateStr));
        await prisma.event.create({
            data: {
                title: eventInfo.Title,
                dates: dates,
                startTime: eventInfo.StartTime,
                endTime: eventInfo.EndTime,
                location: eventInfo.Location,
                city: eventInfo.City,
                description: eventInfo.Description || null,
                organizer: eventInfo.Organizer,
                price: eventInfo.Price,
                category: eventInfo.Category,
                email: eventInfo.Email,
                phone: eventInfo.Phone,
                rawText: eventInfo.Text
            }
        });
        console.log(`Event "${eventInfo.Title}" saved to database`);
    }
    catch (error) {
        console.error('Error saving event to database:', error);
        throw error;
    }
}
