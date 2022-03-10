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

        public virtual DbSet<Area> Areas { get; set; }
        public virtual DbSet<Cart> Carts { get; set; }
        public virtual DbSet<Category> Categories { get; set; }
        public virtual DbSet<City> Cities { get; set; }
        public virtual DbSet<Country> Countries { get; set; }
        public virtual DbSet<Customer> Customers { get; set; }
        public virtual DbSet<EmailOtp> EmailOtps { get; set; }
        public virtual DbSet<Order> Orders { get; set; }
        public virtual DbSet<OrderHistory> OrderHistories { get; set; }
        public virtual DbSet<OrderOngoing> OrderOngoings { get; set; }
        public virtual DbSet<Provider> Providers { get; set; }
        public virtual DbSet<ReviewRating> ReviewRatings { get; set; }
        public virtual DbSet<Service> Services { get; set; }
        public virtual DbSet<State> States { get; set; }
        public virtual DbSet<SubService> SubServices { get; set; }

        public DbSet<SearchbarFilter> searchbarFilters { get; set; }

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

            modelBuilder.Entity<Area>(entity =>
            {
                entity.ToTable("Area");

                entity.Property(e => e.AreaName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.City)
                    .WithMany(p => p.Areas)
                    .HasForeignKey(d => d.CityId)
                    .HasConstraintName("Fk_Area_City");
            });

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

                entity.Property(e => e.BgImg)
                    .IsUnicode(false)
                    .HasColumnName("bg_img");

                entity.Property(e => e.CategoryName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.Description)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.LogoImg)
                    .IsUnicode(false)
                    .HasColumnName("logo_img");
            });

            modelBuilder.Entity<City>(entity =>
            {
                entity.ToTable("City");

                entity.Property(e => e.CityName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.State)
                    .WithMany(p => p.Cities)
                    .HasForeignKey(d => d.StateId)
                    .HasConstraintName("Fk_City_State");
            });

            modelBuilder.Entity<Country>(entity =>
            {
                entity.ToTable("Country");

                entity.Property(e => e.CountryName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<Customer>(entity =>
            {
                entity.ToTable("Customer");

                entity.Property(e => e.CustomerAddress1)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.CustomerAddress2)
                    .HasMaxLength(100)
                    .IsUnicode(false);

                entity.Property(e => e.CustomerArea1)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.CustomerArea2)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.CustomerCity)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.CustomerCity1)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.CustomerCity2)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.CustomerCountry)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.CustomerEmail).HasMaxLength(256);

                entity.Property(e => e.CustomerName)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.CustomerPhone).HasMaxLength(10);

                entity.Property(e => e.CustomerState1)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.CustomerState2)
                    .HasMaxLength(50)
                    .IsUnicode(false);
            });

            modelBuilder.Entity<EmailOtp>(entity =>
            {
                entity.ToTable("Email_OTP");

                entity.Property(e => e.Id).HasColumnName("id");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(256);

                entity.Property(e => e.Otp).HasColumnName("OTP");

                entity.Property(e => e.UserName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
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

                entity.Property(e => e.DeliveryAddress)
                    .HasMaxLength(100)
                    .IsUnicode(false);

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

                entity.Property(e => e.DeliveryAddress)
                    .HasMaxLength(100)
                    .IsUnicode(false);

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

                entity.Property(e => e.ProviderArea)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ProviderCity)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ProviderCountry)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.ProviderEmail).HasMaxLength(256);

                entity.Property(e => e.ProviderPhone).HasMaxLength(20);

                entity.Property(e => e.ProviderState)
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.Property(e => e.UserName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.CategoryNavigation)
                    .WithMany(p => p.Providers)
                    .HasForeignKey(d => d.Category)
                    .HasConstraintName("FK_Provider_Service");
            });

            modelBuilder.Entity<ReviewRating>(entity =>
            {
                entity.HasKey(e => e.ReviewId)
                    .HasName("PK__Review_R__74BC79CE40675E02");

                entity.ToTable("Review_Rating");

                entity.Property(e => e.CustomerId).HasColumnName("Customer_Id");

                entity.Property(e => e.OrderHistoryId).HasColumnName("OrderHistory_Id");

                entity.Property(e => e.ProviderId).HasColumnName("Provider_Id");

                entity.Property(e => e.Review)
                    .IsRequired()
                    .HasMaxLength(612)
                    .IsUnicode(false);

                entity.Property(e => e.ServiceId).HasColumnName("Service_Id");

                entity.Property(e => e.SubServiceId).HasColumnName("SubService_Id");

                entity.HasOne(d => d.Customer)
                    .WithMany(p => p.ReviewRatings)
                    .HasForeignKey(d => d.CustomerId)
                    .HasConstraintName("Fk_Review_Customer");

                entity.HasOne(d => d.OrderHistory)
                    .WithMany(p => p.ReviewRatings)
                    .HasForeignKey(d => d.OrderHistoryId)
                    .HasConstraintName("Fk_Review_Order");

                entity.HasOne(d => d.Provider)
                    .WithMany(p => p.ReviewRatings)
                    .HasForeignKey(d => d.ProviderId)
                    .HasConstraintName("Fk_Review_Provider");

                entity.HasOne(d => d.Service)
                    .WithMany(p => p.ReviewRatings)
                    .HasForeignKey(d => d.ServiceId)
                    .HasConstraintName("Fk_Review_Service");

                entity.HasOne(d => d.SubService)
                    .WithMany(p => p.ReviewRatings)
                    .HasForeignKey(d => d.SubServiceId)
                    .HasConstraintName("Fk_Review_SubService");
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

            modelBuilder.Entity<State>(entity =>
            {
                entity.ToTable("State");

                entity.Property(e => e.StateName)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);

                entity.HasOne(d => d.Country)
                    .WithMany(p => p.States)
                    .HasForeignKey(d => d.CountryId)
                    .HasConstraintName("Fk_State_Country");
            });

            modelBuilder.Entity<SubService>(entity =>
            {
                entity.ToTable("Sub_Service");

                entity.HasIndex(e => e.SubServiceName, "Unique_SubService")
                    .IsUnique();

                entity.Property(e => e.Details).HasMaxLength(500);

                entity.Property(e => e.Img1)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.Img2)
                    .HasMaxLength(500)
                    .IsUnicode(false);

                entity.Property(e => e.Img3)
                    .HasMaxLength(500)
                    .IsUnicode(false);

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
