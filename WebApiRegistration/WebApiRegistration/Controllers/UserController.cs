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
    public class UserController : ControllerBase
    {
        private readonly UsersContext _context;

        public UserController(UsersContext context)
        {
            _context = context;
        }

        // GET: api/User
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Users>>> GetUsers()
        {
            // return await _context.Users.ToListAsync();

            var user = (from u in _context.Users
                        join c in _context.Companies
                        on u.CompanyId equals c.Id

                        select new Users
                        {
                            Id = u.Id,
                            LastName = u.LastName,
                            FirstName = u.FirstName,
                            UserName = u.UserName,
                            Email = u.Email,
                            Password = u.Password,
                            TermsofService = u.TermsofService,
                            PrivacyPolicy = u.PrivacyPolicy,
                            CompanyId = u.Id,
                            CompanyName = c.CompanyName
                        }
                 ).ToListAsync();

            return await user;
        }

        // GET: api/User/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Users>> GetUsers(int id)
        {
            var users = await _context.Users.FindAsync(id);

            if (users == null)
            {
                return NotFound();
            }

            return users;
        }

        // PUT: api/User/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUsers(int id, Users users)
        {
            if (id != users.Id)
            {
                return BadRequest();
            }

            _context.Entry(users).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UsersExists(id))
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

        // POST: api/User
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Users>> PostUsers(Users users)
        {
            _context.Users.Add(users);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUsers", new { id = users.Id }, users);
        }

        // DELETE: api/User/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUsers(int id)
        {
            var users = await _context.Users.FindAsync(id);
            if (users == null)
            {
                return NotFound();
            }

            _context.Users.Remove(users);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UsersExists(int id)
        {
            return _context.Users.Any(e => e.Id == id);
        }

        // GET: api/User/CheckUsername/{username}
        [HttpGet("CheckUsername/{username}")]
        public async Task<ActionResult<bool>> CheckUsername(string username)
        {
            var usernameExists = await _context.Users.AnyAsync(u => u.UserName == username);
            return Ok(usernameExists);
        }
    }
}
