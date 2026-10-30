using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TelephoneBackend.Models
{
    [Table("tabel_telephone")]
    public class Telephone
    {
        [Key]
        public int Id { get; set; }

        [Column("Nama_User")]
        public string NamaUser { get; set; } = string.Empty;

        [Column("Alamat")]
        public string Alamat { get; set; } = string.Empty;

        [Column("No_Telp")]
        public string NoTelp { get; set; } = string.Empty;

        [Column("kode_post")]
        public string KodePost { get; set; } = string.Empty;

        [Column("date_time")]
        public DateTime DateTime { get; set; }
    }
}