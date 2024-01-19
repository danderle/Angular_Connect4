using Microsoft.AspNetCore.SignalR;

namespace SignalrServer;

public class Connect4Hub : Hub
{
    public override async Task OnConnectedAsync()
    {
        Server.AddUser(Context.ConnectionId);
        await Clients.All.SendAsync("ReceiveTotalUsers", Server.TotalUsers);
        await base.OnConnectedAsync();
    }

    public override async Task OnDisconnectedAsync(Exception? exception)
    {
        Server.RemoveUser(Context.ConnectionId);
        await Clients.All.SendAsync("ReceiveTotalUsers", Server.TotalUsers);
        await base.OnDisconnectedAsync(exception);
    }
}
