using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApiRegistration.Model;

namespace WebApiRegistration.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IndustryController : ControllerBase
    {
        private readonly UsersContext _context;

        public IndustryController(UsersContext context)
        {
            _context = context;
        }

        // GET: api/Industry
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Industries>>> GetIndustries()
        {
            return await _context.Industries.ToListAsync();
        }

        // GET: api/Industry/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Industries>> GetIndustries(int id)
        {
            var industries = await _context.Industries.FindAsync(id);

            if (industries == null)
            {
                return NotFound();
            }

            return industries;
        }

        // PUT: api/Industry/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutIndustries(int id, Industries industries)
        {
            if (id != industries.Id)
            {
                return BadRequest();
            }

            _context.Entry(industries).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!IndustriesExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Industry
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Industries>> PostIndustries(Industries industries)
        {
            _context.Industries.Add(industries);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetIndustries", new { id = industries.Id }, industries);
        }

        // DELETE: api/Industry/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteIndustries(int id)
        {
            var industries = await _context.Industries.FindAsync(id);
            if (industries == null)
            {
                return NotFound();
            }

            _context.Industries.Remove(industries);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool IndustriesExists(int id)
        {
            return _context.Industries.Any(e => e.Id == id);
        }
    }
}
