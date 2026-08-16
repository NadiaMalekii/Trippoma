using Trippoma.Domain.Common;
using Trippoma.Domain.Enums;

namespace Trippoma.Domain.Entities;

public class User : AuditableEntity
{
    public required string FullName { get; set; }
    public required string Email { get; set; }
    public required string PasswordHash { get; set; }
    public string? ProfileImageUrl { get; set; }
    public UserRole Role { get; set; } = UserRole.Regular;
    public bool IsActive { get; set; } = true;
    public ICollection<Review> Reviews { get; set; } = new List<Review>();
    public ICollection<Favorite> Favorites { get; set; } = new List<Favorite>();
}