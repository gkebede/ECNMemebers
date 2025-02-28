
using Microsoft.EntityFrameworkCore;
using Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddDbContext<AppDbContext>(options => options
.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
 builder.Services.AddCors(options =>
            {

                options.AddPolicy("CorsPolicy", policy =>
                {
                    //policy.AllowAnyMethod().AllowAnyHeader().WithOrigins("*");
                    policy.AllowAnyMethod().AllowAnyHeader()
                    .WithOrigins("http://localhost:3000", "https://localhost:3000");
                });

            });
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi

var app = builder.Build();

// Configure the HTTP request pipeline.
 
//app.UseHttpsRedirection();

//app.UseAuthorization();
app.UseCors("CorsPolicy");
app.MapControllers();

using var scope = app.Services.CreateScope();  //the whole injected services are availabel here 

var servises = scope.ServiceProvider;  //from whole injected services pick desire service

try
{   
    var context = servises.GetRequiredService<AppDbContext>(); //! GIVE US THE DESIRE SERVICE 
    //var userManager = servises.GetRequiredService<UserManager<Member>>();
      await context.Database.MigrateAsync();//! this will create the database if it does not exist and apply any pending migrations
      await DbInitalizer.SeedData(context);  //! and then dotnet watch run
}
catch (Exception ex)
{
    
    var logger = servises.GetRequiredService<ILogger<Program>>();//! GIVE US THE DESIRE SERVICE  again 
    logger.LogError(ex, "An error occurd during migration!");
}


app.Run();


 
