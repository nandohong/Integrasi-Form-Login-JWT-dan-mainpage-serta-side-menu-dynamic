using Microsoft.EntityFrameworkCore;
using TelephoneBackend.Models;

namespace TelephoneBackend.Data
{
    public class TelephoneDbContext : DbContext
    {
        public TelephoneDbContext(DbContextOptions<TelephoneDbContext> options)
            : base(options)
        {
        }

        public DbSet<Telephone> Telephones { get; set; }
    }
}