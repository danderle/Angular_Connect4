using Microsoft.AspNetCore.ResponseCompression;
using SignalrServer;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(options =>
{
    options.AddPolicy("connect4", builder =>
    {
        builder.AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials()
        .SetIsOriginAllowed(origin => new Uri(origin).Host == "localhost");
    });
});
builder.Services.AddSignalR();
builder.Services.AddResponseCompression(options =>
{
    options.MimeTypes = ResponseCompressionDefaults.MimeTypes.Concat(new[] { "application/octet-stream" });
});
var app = builder.Build();
app.UseCors("connect4");
app.MapHub<Connect4Hub>("connect4");

app.Run();
