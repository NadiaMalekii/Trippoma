using MediatR;
using Trippoma.Application.Users.DTOs;

namespace Trippoma.Application.Users.Commands.Login;

public record LoginCommand(string Email, string Password) : IRequest<AuthResultDto>;