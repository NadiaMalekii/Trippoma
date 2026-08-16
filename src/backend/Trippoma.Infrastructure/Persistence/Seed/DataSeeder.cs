using Microsoft.EntityFrameworkCore;
using Trippoma.Domain.Entities;

namespace Trippoma.Infrastructure.Persistence.Seed;

public static class DataSeeder
{
    public static async Task SeedAsync(AppDbContext context)
    {
        if (await context.Categories.AnyAsync())
            return; 

        var categories = new List<Category>
        {
            new() { Name = "Beaches", Description = "Coastal spots along the Gulf of Oman and Arabian Sea." },
            new() { Name = "Desert", Description = "Dune fields and desert camps." },
            new() { Name = "Mountains", Description = "The Hajar mountain range and its terraced villages." },
            new() { Name = "Historical", Description = "Forts, castles, and archaeological sites." },
            new() { Name = "Nature", Description = "Wadis, sinkholes, and natural landscapes." },
            new() { Name = "Cultural", Description = "Mosques, souqs, and heritage sites." },
            new() { Name = "Activities", Description = "Hiking, diving, and outdoor experiences." }
        };

        context.Categories.AddRange(categories);
        await context.SaveChangesAsync();

        Guid CategoryId(string name) => categories.First(c => c.Name == name).Id;

        var places = new List<Place>
        {
            new()
            {
                Name = "Wadi Shab",
                City = "Tiwi",
                Description = "A canyon carved by a spring-fed watercourse, reached by a short boat crossing and a walk between limestone cliffs. The trail ends at a narrow gap you swim through into a hidden cave with a waterfall.",
                Latitude = 22.8390,
                Longitude = 59.2451,
                CategoryId = CategoryId("Nature")
            },
            new()
            {
                Name = "Nizwa Fort",
                City = "Nizwa",
                Description = "Built in the 17th century by Imam Sultan bin Saif Al Ya'arubi, this fort took twelve years to complete. Its massive circular tower was designed to withstand cannon fire and defend the old capital.",
                Latitude = 22.9333,
                Longitude = 57.5333,
                CategoryId = CategoryId("Historical")
            },
            new()
            {
                Name = "Mutrah Souq",
                City = "Muscat",
                Description = "One of the oldest marketplaces in the Arab world, a covered maze of lanes along the Mutrah corniche selling frankincense, textiles, spices, and silver.",
                Latitude = 23.6153,
                Longitude = 58.5658,
                CategoryId = CategoryId("Cultural")
            },
            new()
            {
                Name = "Sultan Qaboos Grand Mosque",
                City = "Muscat",
                Description = "Oman's largest mosque, completed in 2001, holding a hand-woven Persian carpet that covers the entire prayer hall floor and a chandelier over 14 metres tall.",
                Latitude = 23.5852,
                Longitude = 58.2908,
                CategoryId = CategoryId("Cultural")
            },
            new()
            {
                Name = "Bimmah Sinkhole",
                City = "Dibab",
                Description = "Known locally as Hawiyat Najm ('falling star'), a collapsed limestone crater filled with blue-green water, connected to the sea and stepped for swimmers.",
                Latitude = 23.0233,
                Longitude = 59.0453,
                CategoryId = CategoryId("Nature")
            },
            new()
            {
                Name = "Jebel Akhdar",
                City = "Al Jabal al Akhdar",
                Description = "The 'Green Mountain', a plateau over 2,000 metres up in the Hajar range, terraced with rose, pomegranate, and walnut orchards around villages perched on the canyon edge.",
                Latitude = 23.0667,
                Longitude = 57.6667,
                CategoryId = CategoryId("Mountains")
            },
            new()
            {
                Name = "Wahiba Sands",
                City = "Al Wasil",
                Description = "Known locally as Sharqiya Sands, a belt of dunes reaching up to 100 metres high, home to Bedouin communities and used for overnight desert camps.",
                Latitude = 22.0667,
                Longitude = 58.4167,
                CategoryId = CategoryId("Desert")
            }
        };

        context.Places.AddRange(places);
        await context.SaveChangesAsync();
    }
}