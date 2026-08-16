using MediatR;
using Trippoma.Application.Places.DTOs;

namespace Trippoma.Application.Places.Queries.GetAllPlaces;

public record GetAllPlacesQuery(string? Search, string? City, Guid? CategoryId) : IRequest<List<PlaceDto>>;