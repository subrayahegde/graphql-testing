using dotnet_graphql.Model;

using Microsoft.EntityFrameworkCore;

namespace dotnet_graphql.Data
{
    public class SeedData
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new DbContextClass(
                serviceProvider.GetRequiredService<DbContextOptions<DbContextClass>>()))
            {
                if (context.Products.Any())
                {
                    return;
                }

                context.Products.AddRange(
                    new ProductDetails
                    {
                        Id = Guid.NewGuid(),
                        ProductName = "IPhone",
                        ProductDescription = "IPhone 14",
                        ProductPrice = 120000,
                        ProductStock = 100
                    },
                    new ProductDetails
                    {
                        Id = Guid.NewGuid(),
                        ProductName = "MT Tablet",
                        ProductDescription = "Xiaomi MI Tablet ",
                        ProductPrice = 56000,
                        ProductStock = 180
                    },
                    new ProductDetails
                    {
                        Id = Guid.NewGuid(),
                        ProductName = "Samsung TV",
                        ProductDescription = "Smart TV",
                        ProductPrice = 400000,
                        ProductStock = 120
                    });
                context.SaveChanges();
            }
        }
    }
}
