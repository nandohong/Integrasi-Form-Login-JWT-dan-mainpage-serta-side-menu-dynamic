
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace TelephoneBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class MenusController : ControllerBase
    {
        [HttpGet("{userId}")]
        public IActionResult GetMenus(int userId)
        {
            var menus = new[]
            {
                new
                {
                    MenuId = 1,
                    MenuName = "Dashboard",
                    MenuUrl = "/dashboard",
                    ParentId = 0,
                    CanRead = true
                },
                new
                {
                    MenuId = 2,
                    MenuName = "Telephone List",
                    MenuUrl = "/telephones",
                    ParentId = 0,
                    CanRead = true
                },
                new
                {
                    MenuId = 3,
                    MenuName = "User List",
                    MenuUrl = "/users",
                    ParentId = 0,
                    CanRead = true
                }
            };

            if (userId != 1)
            {
                return NotFound(new
                {
                    message = "User tidak ditemukan."
                });
            }

            return Ok(menus);
        }
    }
}
