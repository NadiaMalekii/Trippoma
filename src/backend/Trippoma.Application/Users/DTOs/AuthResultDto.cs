namespace Trippoma.Application.Users.DTOs;

public class AuthResultDto
{
    public Guid UserId { get; set; }
    public string FullName { get; set; } = default!;
    public string Email { get; set; } = default!;
    public string Token { get; set; } = default!;
}
