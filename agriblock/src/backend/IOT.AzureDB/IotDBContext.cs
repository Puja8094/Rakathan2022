using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
namespace IOT.AzureDB
{
    
    public partial class IotDBContext : DbContext
    {
        public IotDBContext()
        {
        }

        public IotDBContext(DbContextOptions<IotDBContext> options)
            : base(options)
        {
        }

        public virtual DbSet<SensorDatum> SensorData { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=tcp:iothubcoreading.database.windows.net,1433;Initial Catalog=IotDB;Persist Security Info=False;User ID=netzero;Password=Jitendra@123;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<SensorDatum>(entity =>
            {
                entity.HasNoKey();

                entity.Property(e => e.Co2InPpm).HasColumnName("Co2InPPM");

                entity.Ignore(x => x.LocalDateTime);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
