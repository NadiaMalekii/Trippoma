using Trippoma.Domain.Entities;

namespace Trippoma.Application.Common.Interfaces;


public interface IJwtTokenGenerator
{
    string GenerateToken(User user);
}