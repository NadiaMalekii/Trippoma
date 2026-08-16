using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Trippoma.Application.Favorites.Commands.AddFavorite;
using Trippoma.Application.Favorites.Commands.RemoveFavorite;
using Trippoma.Application.Favorites.Queries.GetUserFavorites;

namespace Trippoma.WebApi.Controllers;

[ApiController]
[Route("api/favorites")]
[Authorize]
public class FavoritesController : ControllerBase
{
    private readonly IMediator _mediator;

    public FavoritesController(IMediator mediator)
    {
        _mediator = mediator;
    }

    [HttpGet]
    public async Task<IActionResult> GetMyFavorites()
    {
        var result = await _mediator.Send(new GetUserFavoritesQuery());
        return Ok(result);
    }

    [HttpPost("{placeId:guid}")]
    public async Task<IActionResult> Add(Guid placeId)
    {
        await _mediator.Send(new AddFavoriteCommand(placeId));
        return NoContent();
    }

    [HttpDelete("{placeId:guid}")]
    public async Task<IActionResult> Remove(Guid placeId)
    {
        await _mediator.Send(new RemoveFavoriteCommand(placeId));
        return NoContent();
    }
}