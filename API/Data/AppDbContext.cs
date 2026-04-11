using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class AppDbContext(DbContextOptions options) : DbContext(options)
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public DbSet<AppUser> Users { get; set; }
    public required string Email { get; set; }
}
