using MediatR;
using Trippoma.Application.Users.DTOs;

namespace Trippoma.Application.Users.Commands.Register;

public record RegisterCommand(string FullName, string Email, string Password) : IRequest<AuthResultDto>;