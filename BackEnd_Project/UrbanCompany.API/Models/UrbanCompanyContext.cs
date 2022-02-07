using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace UrbanCompany.API.Models
{
    public partial class UrbanCompanyContext : DbContext
    {
        public UrbanCompanyContext()
        {
        }

        public UrbanCompanyContext(DbContextOptions<UrbanCompanyContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Cart> Carts { get; set; }
        public virtual DbSet<Category> Categories { get; set; }
        public virtual DbSet<Customer> Customers { get; set; }
        public virtual DbSet<Order> Orders { get; set; }
        public virtual DbSet<OrderHistory> OrderHistories { get; set; }
        public virtual DbSet<OrderOngoing> OrderOngoings { get; set; }
        public virtual DbSet<Provider> Providers { get; set; }
        public virtual DbSet<Service> Services { get; set; }
        public virtual DbSet<SubService> SubServices { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=LAPTOP-3P2R1D3J\\SQLEXPRESS;Database=UrbanCompany;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            modelBuilder.Entity<Cart>(entity =>
            {
                entity.ToTable("Cart");

                entity.HasOne(d => d.CustomerNavigation)
                    .WithMany(p => p.Carts)
                    .HasForeignKey(d => d.Customer)
                    .HasConstraintName("FK_Cart_Customer");

                entity.HasOne(d => d.ServiceNavigation)
                    .WithMany(p => p.Carts)
                    .HasForeignKey(d => d.Service)
                    .HasConstraintName("FK_Cart_Service_category");

                entity.HasOne(d => d.SubServiceNavigation)
                    .WithMany(p => p.Carts)
                    .HasForeignKey(d => d.SubService)
                    .HasConstraintName("FK_Cart_Service");
            });

            modelBuilder.Entity<Category>(entity =>
            {
                entity.ToTable("Category");

                entity.HasIndex(e => e.CategoryName, "Unique_Category")
                    .IsUnique();

                entity.Property(e => e.CategoryName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Customer>(entity =>
            {
                entity.ToTable("Customer");

                entity.Property(e => e.CustomerAddress1)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.CustomerCity)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.CustomerDistrict)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.CustomerEmail).HasMaxLength(256);

                entity.Property(e => e.CustomerName)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.CustomerPhone).HasMaxLength(10);
            });

            modelBuilder.Entity<Order>(entity =>
            {
                entity.Property(e => e.OrderStatus)
                    .HasColumnName("Order_Status")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.TotalCost).HasColumnName("Total_Cost");

                entity.HasOne(d => d.CustomerNavigation)
                    .WithMany(p => p.Orders)
                    .HasForeignKey(d => d.Customer)
                    .HasConstraintName("FK_Order_Customer");
            });

            modelBuilder.Entity<OrderHistory>(entity =>
            {
                entity.ToTable("Order_History");

                entity.Property(e => e.ServiceDate)
                    .IsRequired()
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("service_date");

                entity.HasOne(d => d.CustomerNavigation)
                    .WithMany(p => p.OrderHistories)
                    .HasForeignKey(d => d.Customer)
                    .HasConstraintName("FK_OrderHistory_Customer");

                entity.HasOne(d => d.Order)
                    .WithMany(p => p.OrderHistories)
                    .HasForeignKey(d => d.OrderId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_OrderId");

                entity.HasOne(d => d.ProviderNavigation)
                    .WithMany(p => p.OrderHistories)
                    .HasForeignKey(d => d.Provider)
                    .HasConstraintName("FK_OrderHistory_Provider");

                entity.HasOne(d => d.ServiceNavigation)
                    .WithMany(p => p.OrderHistories)
                    .HasForeignKey(d => d.Service)
                    .HasConstraintName("FK_OrderHistory_Service_category");

                entity.HasOne(d => d.SubServiceNavigation)
                    .WithMany(p => p.OrderHistories)
                    .HasForeignKey(d => d.SubService)
                    .HasConstraintName("FK_OrderHistory_Service");
            });

            modelBuilder.Entity<OrderOngoing>(entity =>
            {
                entity.ToTable("Order_Ongoing");

                entity.Property(e => e.ServiceDate)
                    .IsRequired()
                    .HasMaxLength(10)
                    .IsUnicode(false)
                    .HasColumnName("service_date");

                entity.Property(e => e.ServiceTime)
                    .IsRequired()
                    .HasMaxLength(5)
                    .IsUnicode(false)
                    .HasColumnName("service_time");

                entity.HasOne(d => d.CustomerNavigation)
                    .WithMany(p => p.OrderOngoings)
                    .HasForeignKey(d => d.Customer)
                    .HasConstraintName("FK_OrderOngoing_Customer");

                entity.HasOne(d => d.Order)
                    .WithMany(p => p.OrderOngoings)
                    .HasForeignKey(d => d.OrderId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_OrderOngoing_OrderId");

                entity.HasOne(d => d.ProviderNavigation)
                    .WithMany(p => p.OrderOngoings)
                    .HasForeignKey(d => d.Provider)
                    .HasConstraintName("FK_OrderOngoing_Provider");

                entity.HasOne(d => d.ServiceNavigation)
                    .WithMany(p => p.OrderOngoings)
                    .HasForeignKey(d => d.Service)
                    .HasConstraintName("FK_OrderOngoing_Service_category");

                entity.HasOne(d => d.SubServiceNavigation)
                    .WithMany(p => p.OrderOngoings)
                    .HasForeignKey(d => d.SubService)
                    .HasConstraintName("FK_OrderOngoing_Service");
            });

            modelBuilder.Entity<Provider>(entity =>
            {
                entity.ToTable("Provider");

                entity.Property(e => e.FirstName)
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.LastName)
                    .HasMaxLength(25)
                    .IsUnicode(false);

                entity.Property(e => e.ProviderCity)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ProviderDistrict)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ProviderEmail).HasMaxLength(256);

                entity.Property(e => e.ProviderPhone).HasMaxLength(20);

                entity.Property(e => e.UserName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.CategoryNavigation)
                    .WithMany(p => p.Providers)
                    .HasForeignKey(d => d.Category)
                    .HasConstraintName("FK_Provider_Service");
            });

            modelBuilder.Entity<Service>(entity =>
            {
                entity.HasIndex(e => e.ServiceName, "Unique_Service")
                    .IsUnique();

                entity.Property(e => e.ServiceName)
                    .IsRequired()
                    .HasMaxLength(256)
                    .IsUnicode(false);

                entity.HasOne(d => d.Category)
                    .WithMany(p => p.Services)
                    .HasForeignKey(d => d.CategoryId)
                    .HasConstraintName("Fk_Services_Category");
            });

            modelBuilder.Entity<SubService>(entity =>
            {
                entity.ToTable("Sub_Service");

                entity.HasIndex(e => e.SubServiceName, "Unique_SubService")
                    .IsUnique();

                entity.Property(e => e.SubServiceName)
                    .IsRequired()
                    .HasMaxLength(256)
                    .IsUnicode(false);

                entity.HasOne(d => d.Service)
                    .WithMany(p => p.SubServices)
                    .HasForeignKey(d => d.ServiceId)
                    .HasConstraintName("FK_subservice_service");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
