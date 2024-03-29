using Microsoft.EntityFrameworkCore;

namespace WebApiRegistration.Model
{
    public class UsersContext : DbContext
    {
        public UsersContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<Users> Users { get; set; }
        public DbSet<Companies> Companies { get; set; }
        public DbSet<Industries> Industries { get; set; }

    }
}
