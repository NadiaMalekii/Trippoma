using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using Trippoma.Application.Categories.DTOs;
using Trippoma.Application.Places.DTOs;

namespace Trippoma.Application.Places.Queries.GetPlaceById;

public record GetPlaceByIdQuery(Guid Id) : IRequest<PlaceDto>;
