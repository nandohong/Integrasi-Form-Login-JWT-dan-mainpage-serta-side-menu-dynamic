using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TelephoneBackend.Data;
using TelephoneBackend.Models;

namespace TelephoneBackend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TelephoneController : ControllerBase
    {
        private readonly TelephoneDbContext _context;

        public TelephoneController(TelephoneDbContext context)
        {
            _context = context;
        }

        // GET: api/Telephone
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Telephone>>> GetTelephones()
        {
            return await _context.Telephones.ToListAsync();
        }

        // GET: api/Telephone/1
        [HttpGet("{id}")]
        public async Task<ActionResult<Telephone>> GetTelephone(int id)
        {
            var telephone = await _context.Telephones.FindAsync(id);

            if (telephone == null)
            {
                return NotFound();
            }

            return telephone;
        }

        // POST: api/Telephone
        [HttpPost]
        public async Task<ActionResult<Telephone>> PostTelephone(Telephone telephone)
        {
            telephone.DateTime = DateTime.Now;

            _context.Telephones.Add(telephone);
            await _context.SaveChangesAsync();

            return CreatedAtAction(
                nameof(GetTelephone),
                new { id = telephone.Id },
                telephone
            );
        }

        // PUT: api/Telephone/1
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTelephone(
            int id,
            Telephone telephone)
        {
            if (id != telephone.Id)
            {
                return BadRequest();
            }

            _context.Entry(telephone).State = EntityState.Modified;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/Telephone/1
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTelephone(int id)
        {
            var telephone = await _context.Telephones.FindAsync(id);

            if (telephone == null)
            {
                return NotFound();
            }

            _context.Telephones.Remove(telephone);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}