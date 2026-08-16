using System.Security.Claims;
using Trippoma.Application.Common.Interfaces;

namespace Trippoma.WebApi.Services;

public class CurrentUserService : ICurrentUserService
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public CurrentUserService(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    public Guid UserId
    {
        get
        {
            var idClaim = _httpContextAccessor.HttpContext?.User
                .FindFirst(ClaimTypes.NameIdentifier)?.Value
                ?? _httpContextAccessor.HttpContext?.User
                .FindFirst("sub")?.Value;

            if (string.IsNullOrEmpty(idClaim))
                throw new UnauthorizedAccessException("User is not authenticated.");

            return Guid.Parse(idClaim);
        }
    }
}