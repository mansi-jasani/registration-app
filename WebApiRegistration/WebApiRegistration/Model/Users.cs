using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace WebApiRegistration.Model
{
    public class Users
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [StringLength(150)]
        public string LastName { get; set; }
        [StringLength(250)]
        public string FirstName { get; set; }
        [StringLength(250)]
        public string UserName { get; set; }
        [StringLength(150)]
        public string Email { get; set; }
        public string Password { get; set; }
        public bool TermsofService { get; set; }
        public bool PrivacyPolicy { get; set; }
        public int CompanyId { get; set; }

        [NotMapped]
        public string? CompanyName { get; set; }
    }
}
