using MediatR;
using Microsoft.AspNetCore.Mvc;
using Trippoma.Application.Places.Queries.GetAllPlaces;
using Trippoma.Application.Places.Queries.GetPlaceById;

namespace Trippoma.WebApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PlacesController : ControllerBase
{
    private readonly IMediator _mediator;

    public PlacesController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] string? search, [FromQuery] string? city, [FromQuery] Guid? categoryId)
    {
        var result = await _mediator.Send(new GetAllPlacesQuery(search, city, categoryId));
        return Ok(result);
    }

    [HttpGet("{id:guid}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var result = await _mediator.Send(new GetPlaceByIdQuery(id));
        return Ok(result);
    }
}